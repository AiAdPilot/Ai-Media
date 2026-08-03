import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CampaignRequest } from '../types';

const STORAGE_KEY_CONFIG = 'adpilot_supabase_config';
const STORAGE_KEY_REQUESTS = 'adpilot_campaign_requests_fallback';

export function getStoredSupabaseConfig(): { url: string; anonKey: string } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading stored Supabase config:', e);
  }

  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  return null;
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({ url, anonKey }));
}

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (config && config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

/**
 * Saves a campaign request to the Supabase `campaign_requests` table.
 * Falls back to local storage if Supabase credentials are missing or network is unavailable.
 */
export async function saveCampaignRequestToSupabase(
  request: CampaignRequest
): Promise<{ success: boolean; data: CampaignRequest; isSupabase: boolean; error?: string }> {
  const client = getSupabaseClient();
  const timestamp = new Date().toISOString();
  
  const payload: CampaignRequest = {
    ...request,
    id: request.id || `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: request.created_at || timestamp,
    status: request.status || 'generating',
  };

  if (client) {
    try {
      const { data, error } = await client
        .from('campaign_requests')
        .insert([
          {
            id: payload.id,
            product_name: payload.product_name,
            product_description: payload.product_description,
            product_price: typeof payload.product_price === 'number' ? payload.product_price : parseFloat(payload.product_price.toString().replace(/[^0-9.]/g, '') || '0'),
            landing_page_url: payload.landing_page_url,
            campaign_goal: payload.campaign_goal,
            daily_budget: typeof payload.daily_budget === 'number' ? payload.daily_budget : parseFloat(payload.daily_budget.toString().replace(/[^0-9.]/g, '') || '0'),
            target_country: payload.target_country,
            competitors: payload.competitors || '',
            status: payload.status,
            created_at: payload.created_at,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insertion returned error, saving locally:', error.message);
        saveRequestLocally(payload);
        return { success: true, data: payload, isSupabase: false, error: error.message };
      }

      // Also save copy locally for offline view
      saveRequestLocally(payload);
      return { success: true, data: data as CampaignRequest, isSupabase: true };
    } catch (err: any) {
      console.warn('Network exception inserting into Supabase, saving locally:', err);
      saveRequestLocally(payload);
      return { success: true, data: payload, isSupabase: false, error: err?.message || 'Network exception' };
    }
  } else {
    // Save to local storage fallback
    saveRequestLocally(payload);
    return { success: true, data: payload, isSupabase: false };
  }
}

/**
 * Retrieves all campaign requests from Supabase or local storage fallback.
 */
export async function fetchCampaignRequests(): Promise<{ data: CampaignRequest[]; isSupabase: boolean }> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('campaign_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { data: data as CampaignRequest[], isSupabase: true };
      }
    } catch (err) {
      console.warn('Error fetching campaign requests from Supabase:', err);
    }
  }

  // Fallback to local storage
  return { data: getLocalRequests(), isSupabase: false };
}

function saveRequestLocally(request: CampaignRequest) {
  try {
    const existing = getLocalRequests();
    const updated = [request, ...existing.filter((r) => r.id !== request.id)];
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export function getLocalRequests(): CampaignRequest[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading localStorage:', e);
  }
  return [];
}

import { CampaignRequest } from '../types';
import { getSupabaseClient } from './supabaseClient';
import { validateCampaignRequest } from './formValidation';

const STORAGE_KEY_REQUESTS = 'adpilot_campaign_requests_fallback';

export interface DatabaseOperationResult<T> {
  success: boolean;
  id?: string;
  data: T;
  isSupabase: boolean;
  error?: string;
  validationErrors?: Record<string, string>;
}

/**
 * Generates a unique, production-ready ID for campaign requests.
 */
export function generateCampaignRequestId(): string {
  const time = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `req_${time}_${random}`;
}

/**
 * Saves a campaign request record into the Supabase `campaign_requests` table.
 * Validates fields and handles loading, success, and error outcomes.
 */
export async function saveCampaignRequestToSupabase(
  request: CampaignRequest
): Promise<DatabaseOperationResult<CampaignRequest>> {
  // 1. Validate form fields
  const validation = validateCampaignRequest(request);
  if (!validation.isValid) {
    return {
      success: false,
      data: request,
      isSupabase: false,
      error: 'Form validation failed. Please review the highlighted fields.',
      validationErrors: validation.errors,
    };
  }

  const timestamp = new Date().toISOString();
  const requestId = request.id || generateCampaignRequestId();

  // Parse numeric values safely
  const parsedPrice = typeof request.product_price === 'number'
    ? request.product_price
    : parseFloat(request.product_price.toString().replace(/[^0-9.]/g, '') || '0');

  const parsedBudget = typeof request.daily_budget === 'number'
    ? request.daily_budget
    : parseFloat(request.daily_budget.toString().replace(/[^0-9.]/g, '') || '0');

  const payload: CampaignRequest = {
    ...request,
    id: requestId,
    product_price: parsedPrice,
    daily_budget: parsedBudget,
    created_at: request.created_at || timestamp,
    status: request.status || 'pending',
  };

  const client = getSupabaseClient();

  // If Supabase client is configured, save directly to database table
  if (client) {
    try {
      const { data, error } = await client
        .from('campaign_requests')
        .insert([
          {
            id: payload.id,
            product_name: payload.product_name,
            product_description: payload.product_description,
            product_price: payload.product_price,
            landing_page_url: payload.landing_page_url,
            campaign_goal: payload.campaign_goal,
            daily_budget: payload.daily_budget,
            target_country: payload.target_country,
            competitors: payload.competitors || '',
            status: payload.status,
            created_at: payload.created_at,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insertion error:', error.message);
        // Fallback save to local storage for offline resilience
        saveRequestLocally(payload);
        return {
          success: false,
          id: payload.id,
          data: payload,
          isSupabase: false,
          error: `Supabase Error: ${error.message}`,
        };
      }

      // Also persist local copy
      saveRequestLocally(payload);

      return {
        success: true,
        id: (data as any)?.id || payload.id,
        data: (data as CampaignRequest) || payload,
        isSupabase: true,
      };
    } catch (err: any) {
      console.warn('Network or database exception saving campaign request:', err);
      saveRequestLocally(payload);
      return {
        success: false,
        id: payload.id,
        data: payload,
        isSupabase: false,
        error: err?.message || 'Database connection exception',
      };
    }
  }

  // Local storage fallback mode
  saveRequestLocally(payload);
  return {
    success: true,
    id: payload.id,
    data: payload,
    isSupabase: false,
    error: 'Saved to local storage fallback (Supabase credentials not configured in settings or env).',
  };
}

/**
 * Retrieves all campaign requests from Supabase database or local storage fallback.
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

  return { data: getLocalRequests(), isSupabase: false };
}

/**
 * Retrieves a single campaign request by ID.
 */
export async function fetchCampaignRequestById(id: string): Promise<CampaignRequest | null> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('campaign_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return data as CampaignRequest;
      }
    } catch (err) {
      console.warn(`Error fetching campaign request ${id}:`, err);
    }
  }

  const local = getLocalRequests();
  return local.find((r) => r.id === id) || null;
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

/**
 * Fetches prompt template `campaign_strategist` from Supabase prompt_templates table.
 */
export async function fetchPromptTemplateFromSupabase(name: string = 'campaign_strategist'): Promise<{
  system_prompt?: string;
  user_prompt?: string;
  template?: string;
} | null> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('prompt_templates')
        .select('*')
        .or(`name.eq.${name},id.eq.${name}`)
        .maybeSingle();

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn(`Error fetching prompt template ${name}:`, err);
    }
  }
  return null;
}

/**
 * Saves a generated strategy object into Supabase `campaign_strategies.strategy_json`,
 * linking it directly to the campaign_request record via `campaign_request_id`.
 */
export async function saveCampaignStrategyToSupabase(
  campaignRequestId: string,
  strategy: any
): Promise<{ success: boolean; isSupabase: boolean; error?: string; id?: string }> {
  const client = getSupabaseClient();
  const id = strategy.id || `strat_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  const createdAt = strategy.created_at || new Date().toISOString();
  const strategyJsonStr = typeof strategy === 'string' ? strategy : JSON.stringify(strategy);

  if (client) {
    try {
      // First attempt: insert with stringified JSON payload
      const { error } = await client
        .from('campaign_strategies')
        .insert([
          {
            id,
            campaign_request_id: campaignRequestId,
            strategy_json: strategyJsonStr,
            created_at: createdAt,
          },
        ]);

      if (!error) {
        return { success: true, isSupabase: true, id };
      }

      // Fallback attempt: if column expects JSON object directly
      if (typeof strategy === 'object') {
        const { error: retryError } = await client
          .from('campaign_strategies')
          .insert([
            {
              id,
              campaign_request_id: campaignRequestId,
              strategy_json: strategy,
              created_at: createdAt,
            },
          ]);

        if (!retryError) {
          return { success: true, isSupabase: true, id };
        }
      }

      console.warn('Supabase campaign_strategies insertion error:', error.message);
      return { success: false, isSupabase: false, error: error.message, id };
    } catch (err: any) {
      console.warn('Exception saving strategy to campaign_strategies table:', err);
      return { success: false, isSupabase: false, error: err?.message, id };
    }
  }

  return { success: true, isSupabase: false, id };
}

/**
 * Alias for saveCampaignStrategyToSupabase.
 * Writes generated strategy into campaign_strategies linked to campaign_request record.
 */
export const saveGeneratedStrategy = saveCampaignStrategyToSupabase;

/**
 * Fetches a saved strategy by campaign_request_id from campaign_strategies table.
 */
export async function fetchCampaignStrategyByRequestId(requestId: string): Promise<any | null> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('campaign_strategies')
        .select('*')
        .eq('campaign_request_id', requestId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        if (typeof data.strategy_json === 'string') {
          return JSON.parse(data.strategy_json);
        }
        return data.strategy_json;
      }
    } catch (err) {
      console.warn(`Error fetching strategy for request ${requestId}:`, err);
    }
  }
  return null;
}


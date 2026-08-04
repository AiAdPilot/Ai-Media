import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_CONFIG = 'adpilot_supabase_config';

export interface SupabaseConfigCredentials {
  url: string;
  anonKey: string;
}

/**
 * Retrieves stored Supabase configuration from environment variables or localStorage fallback.
 */
export function getStoredSupabaseConfig(): SupabaseConfigCredentials | null {
  // Check localStorage custom setting first
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading stored Supabase config:', e);
  }

  // Fallback to Vite environment variables
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  return null;
}

/**
 * Persists Supabase URL and Anon key into localStorage.
 */
export function saveSupabaseConfig(url: string, anonKey: string): void {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({ url, anonKey }));
}

let clientInstance: SupabaseClient | null = null;
let lastUsedConfig: SupabaseConfigCredentials | null = null;

/**
 * Returns a singleton or fresh instance of the official @supabase/supabase-js client.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config || !config.url || !config.anonKey) {
    return null;
  }

  // If config changed, recreate client
  if (!clientInstance || lastUsedConfig?.url !== config.url || lastUsedConfig?.anonKey !== config.anonKey) {
    try {
      clientInstance = createClient(config.url, config.anonKey);
      lastUsedConfig = config;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return clientInstance;
}

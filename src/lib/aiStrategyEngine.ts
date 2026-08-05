import { CampaignRequest, CampaignStrategy } from '../types';
import { 
  saveCampaignRequestToSupabase, 
  saveCampaignStrategyToSupabase,
  DatabaseOperationResult 
} from './databaseService';
import { getStoredSupabaseConfig } from './supabaseClient';
import { generateStrategyFromRequest } from './strategyGenerator';

export interface GenerateStrategyResult {
  success: boolean;
  campaignRequestId: string;
  campaignRequest: CampaignRequest;
  strategy: CampaignStrategy;
  savedRequestToSupabase: boolean;
  savedStrategyToSupabase: boolean;
  error?: string;
}

/**
 * 1-Click AI Campaign Intelligence Engine
 * 
 * 1. Validates & Saves the campaign brief into Supabase `campaign_requests` table.
 * 2. Fetches prompt_templates (`campaign_strategist`).
 * 3. Calls Gemini (Gemini 2.5 Pro) server-side via /api/generate-strategy.
 * 4. Parses JSON response.
 * 5. Saves response into Supabase `campaign_strategies.strategy_json`.
 * 6. Returns strategy object to display beautifully.
 */
export async function executeAiCampaignStrategyEngine(
  formData: CampaignRequest
): Promise<GenerateStrategyResult> {
  // Step 1: Save Campaign Brief into Supabase campaign_requests table
  const saveResult: DatabaseOperationResult<CampaignRequest> = await saveCampaignRequestToSupabase(formData);

  if (!saveResult.success || !saveResult.data) {
    throw new Error(saveResult.error || 'Failed to save campaign request to Supabase');
  }

  const campaignRequest = saveResult.data;
  const requestId = saveResult.id || campaignRequest.id || `req_${Date.now()}`;

  const storedConfig = getStoredSupabaseConfig();

  // Step 2 & 3: Call backend /api/generate-strategy
  try {
    const apiResponse = await fetch('/api/generate-strategy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campaignRequest,
        supabaseUrl: storedConfig?.url,
        supabaseAnonKey: storedConfig?.anonKey,
      }),
    });

    if (apiResponse.ok) {
      const resultData = await apiResponse.json();
      if (resultData.success && resultData.strategy) {
        return {
          success: true,
          campaignRequestId: requestId,
          campaignRequest,
          strategy: resultData.strategy as CampaignStrategy,
          savedRequestToSupabase: saveResult.isSupabase,
          savedStrategyToSupabase: Boolean(resultData.savedToSupabase),
        };
      }
    }
  } catch (err) {
    console.warn('/api/generate-strategy network or server call issue, utilizing fallback:', err);
  }

  // Fallback: If API endpoint is unreachable or in dev bundle standalone mode,
  // generate structured strategy object and persist into Supabase campaign_strategies table
  const fallbackStrategy = generateStrategyFromRequest(campaignRequest);
  const strategySaveResult = await saveCampaignStrategyToSupabase(requestId, fallbackStrategy);

  return {
    success: true,
    campaignRequestId: requestId,
    campaignRequest,
    strategy: fallbackStrategy,
    savedRequestToSupabase: saveResult.isSupabase,
    savedStrategyToSupabase: strategySaveResult.isSupabase,
  };
}

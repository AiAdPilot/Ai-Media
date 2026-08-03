export type CampaignGoal = 'Sales' | 'Leads' | 'Traffic' | 'Engagement';

export type NavigationTab = 
  | 'ai_strategist'
  | 'dashboard'
  | 'campaigns'
  | 'products'
  | 'creatives'
  | 'audience'
  | 'analytics'
  | 'knowledge_base'
  | 'settings';

export interface CampaignRequest {
  id?: string;
  created_at?: string;
  product_name: string;
  product_description: string;
  product_price: number | string;
  landing_page_url: string;
  campaign_goal: CampaignGoal;
  daily_budget: number | string;
  target_country: string;
  competitors?: string;
  status?: 'pending' | 'generating' | 'completed' | 'failed';
}

export interface AdCreative {
  id: string;
  format: 'Facebook Feed' | 'Instagram Feed' | 'Instagram Story / Reel';
  headline: string;
  primary_text: string;
  description: string;
  call_to_action: 'Shop Now' | 'Learn More' | 'Sign Up' | 'Get Offer' | 'Contact Us';
  visual_concept: string;
  image_url?: string;
  hook_angle: string;
}

export interface AdSetTargeting {
  id: string;
  name: string;
  funnel_stage: 'TOFU (Prospecting)' | 'MOFU (Consideration)' | 'BOFU (Retargeting)';
  budget_percentage: number;
  daily_budget: number;
  demographics: {
    age_range: string;
    gender: string;
    locations: string[];
  };
  interests: string[];
  behaviors: string[];
  lookalike_source?: string;
}

export interface CampaignStrategy {
  id: string;
  request_id?: string;
  product_name: string;
  created_at: string;
  summary: {
    recommended_structure: string;
    target_roas: string;
    estimated_cpc: string;
    estimated_ctr: string;
    monthly_reach: string;
  };
  budget_allocation: {
    tofu_percent: number;
    mofu_percent: number;
    bofu_percent: number;
    tofu_amount: number;
    mofu_amount: number;
    bofu_amount: number;
  };
  ad_sets: AdSetTargeting[];
  creatives: AdCreative[];
  strategic_recommendations: string[];
}

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

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

export interface InternalAnalysis {
  business_model: string;
  product_core_value: string;
  offer_structure: string;
  pricing_evaluation: string;
  market_sophistication_stage: string;
  customer_awareness_level: string;
  customer_pain_points: string[];
  desired_transformation: string;
  competitor_positioning_gap: string;
  landing_page_quality_verdict: string;
  budget_feasibility_verdict: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface StrategyScores {
  offer_score: number; // 0-100
  campaign_score: number; // 0-100
  confidence_score: number; // 0-100
  offer_grade?: string;
  campaign_grade?: string;
}

export interface AudienceCluster {
  name: string;
  size: string;
  tier: string;
  interests: string[];
  behaviors: string[];
  demographics?: string;
  rationale: string;
}

export interface AudienceStrategySection {
  clusters: AudienceCluster[];
  interest_targeting: string[];
  behaviour_targeting: string[];
  placement_strategy: {
    facebook_feed: string;
    instagram_reels_stories: string;
    advantage_plus_network: string;
    summary: string;
  };
}

export interface CreativeBriefItem {
  type: string;
  format: string;
  hook_script: string;
  visual_brief: string;
  angle_type: string;
}

export interface AngleMessagingItem {
  angle_title: string;
  target_persona: string;
  headline: string;
  primary_text: string;
  call_to_action: string;
  hook_type: string;
}

export interface CopyMessagingStrategy {
  angles: AngleMessagingItem[];
  hooks: string[];
  core_value_proposition?: string;
}

export interface BudgetStage {
  stage: string;
  percentage: number;
  daily_amount: string;
  focus: string;
}

export interface ActionPlanStep {
  day_range: string;
  phase: string;
  tasks: string[];
}

export interface CampaignStrategy {
  id: string;
  request_id?: string;
  campaign_request_id?: string;
  product_name: string;
  created_at: string;

  // Executive Intelligence Engine Report
  executive_summary: string;
  scores: StrategyScores;
  market_opportunity: string;
  recommended_campaign_objective: string;

  internal_analysis: InternalAnalysis;
  swot_analysis: SwotAnalysis;

  audience_strategy: AudienceStrategySection;
  creative_strategy: CreativeBriefItem[];
  messaging_strategy: CopyMessagingStrategy;

  budget_allocation: {
    tofu_percent: number;
    mofu_percent: number;
    bofu_percent: number;
    tofu_amount: number;
    mofu_amount: number;
    bofu_amount: number;
    stages?: BudgetStage[];
  };

  optimization_recommendations: string[];
  scaling_playbook?: string[];
  risks_and_mitigation: Array<{ risk: string; mitigation: string }>;
  action_plan: ActionPlanStep[];

  // Backwards compatibility legacy properties
  summary?: {
    recommended_structure: string;
    target_roas: string;
    estimated_cpc: string;
    estimated_ctr: string;
    monthly_reach: string;
  };
  ad_sets?: AdSetTargeting[];
  creatives?: AdCreative[];
  strategic_recommendations?: string[];
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


import { CampaignRequest, CampaignStrategy } from '../types';

export function generateStrategyFromRequest(request: CampaignRequest): CampaignStrategy {
  const budgetNum = typeof request.daily_budget === 'number' 
    ? request.daily_budget 
    : parseFloat(request.daily_budget.toString().replace(/[^0-9.]/g, '') || '50');

  const priceNum = typeof request.product_price === 'number'
    ? request.product_price
    : parseFloat(request.product_price.toString().replace(/[^0-9.]/g, '') || '49');

  const tofuPct = 60;
  const mofuPct = 25;
  const bofuPct = 15;

  const tofuAmt = (budgetNum * tofuPct) / 100;
  const mofuAmt = (budgetNum * mofuPct) / 100;
  const bofuAmt = (budgetNum * bofuPct) / 100;

  // Calculate realistic KPIs based on budget and goal
  let targetRoas = '3.8x';
  let estimatedCpc = '$0.85';
  let estimatedCtr = '2.4%';
  let estimatedReach = `${Math.round(budgetNum * 380).toLocaleString()} people/mo`;

  if (request.campaign_goal === 'Leads') {
    targetRoas = '4.2x CPL Efficiency';
    estimatedCpc = '$1.12';
    estimatedCtr = '3.1%';
  } else if (request.campaign_goal === 'Traffic') {
    targetRoas = '5.0x Reach Multiplier';
    estimatedCpc = '$0.42';
    estimatedCtr = '1.9%';
  } else if (request.campaign_goal === 'Engagement') {
    targetRoas = '6.5x Social Virality';
    estimatedCpc = '$0.28';
    estimatedCtr = '4.2%';
  }

  const countryName = request.target_country || 'United States';
  const productName = request.product_name || 'Your Product';
  const competitors = request.competitors ? request.competitors.split(',').map((c) => c.trim()) : [];

  return {
    id: `strat_${Date.now()}`,
    request_id: request.id,
    product_name: productName,
    created_at: new Date().toISOString(),
    summary: {
      recommended_structure: 'Consolidated Advantage+ Budget Optimization (CBO) with 3 Funnel Ad Sets',
      target_roas: targetRoas,
      estimated_cpc: estimatedCpc,
      estimated_ctr: estimatedCtr,
      monthly_reach: estimatedReach,
    },
    budget_allocation: {
      tofu_percent: tofuPct,
      mofu_percent: mofuPct,
      bofu_percent: bofuPct,
      tofu_amount: Math.round(tofuAmt),
      mofu_amount: Math.round(mofuAmt),
      bofu_amount: Math.round(bofuAmt),
    },
    ad_sets: [
      {
        id: 'adset_1',
        name: `TOFU — Broad Interest & Competitor Stack (${countryName})`,
        funnel_stage: 'TOFU (Prospecting)',
        budget_percentage: tofuPct,
        daily_budget: Math.round(tofuAmt),
        demographics: {
          age_range: '24–54',
          gender: 'All Genders (Optimized by Advantage+)',
          locations: [countryName],
        },
        interests: [
          `${productName} Interest Cluster`,
          'Online Shopping & Premium SaaS',
          'Digital Marketing & Growth Strategy',
          ...(competitors.length > 0 ? competitors.map((c) => `Competitor: ${c}`) : ['Category Leaders']),
        ],
        behaviors: [
          'Engaged Shoppers (Last 7 Days)',
          'High Household Income Top 25%',
          'Tech Early Adopters',
        ],
      },
      {
        id: 'adset_2',
        name: 'MOFU — High Intent Social Engagers & Lookalikes',
        funnel_stage: 'MOFU (Consideration)',
        budget_percentage: mofuPct,
        daily_budget: Math.round(mofuAmt),
        demographics: {
          age_range: '24–54',
          gender: 'All Genders',
          locations: [countryName],
        },
        interests: [
          '3% Lookalike of Past Purchasers/Leads',
          'Instagram Page Engagers (90 Days)',
          'Facebook Video Viewers 50%+',
        ],
        behaviors: ['Frequent Online Buyers'],
        lookalike_source: 'Custom Purchase Audience (Meta Pixel)',
      },
      {
        id: 'adset_3',
        name: 'BOFU — Dynamic Product Retargeting & Cart Abandoners',
        funnel_stage: 'BOFU (Retargeting)',
        budget_percentage: bofuPct,
        daily_budget: Math.round(bofuAmt),
        demographics: {
          age_range: '18–65+',
          gender: 'All Genders',
          locations: [countryName],
        },
        interests: [
          'Website Visitors (Last 30 Days)',
          'Add To Cart (Last 14 Days)',
          'Initiate Checkout (Last 7 Days)',
        ],
        behaviors: ['Excluded: Past Purchasers (Last 180 Days)'],
      },
    ],
    creatives: [
      {
        id: 'cr_1',
        format: 'Facebook Feed',
        hook_angle: 'Problem-Agitation & Direct Solution',
        headline: `Stop Wasting Meta Ad Spend. Try ${productName} Today.`,
        primary_text: `Struggling to scale your campaigns profitably? ${productName} solves the bottleneck by turning cold traffic into loyal high-LTV customers. Priced at just $${priceNum}, it delivers measurable ROI from day one.`,
        description: `Verified by 1,200+ brands in ${countryName}. 14-day risk-free guarantee.`,
        call_to_action: request.campaign_goal === 'Leads' ? 'Sign Up' : 'Shop Now',
        visual_concept: `Clean high-contrast graphic showing ${productName} interface with performance lift overlay (+142% ROAS). Professional modern aesthetic.`,
      },
      {
        id: 'cr_2',
        format: 'Instagram Feed',
        hook_angle: 'Social Proof & Outcome Showcase',
        headline: `Why High-Growth Teams Are Switching to ${productName}`,
        primary_text: `"The results speak for themselves." See how ${productName} streamlines your growth workflow in seconds. Get started today at $${priceNum}.`,
        description: `Instant setup • No long-term contracts`,
        call_to_action: 'Learn More',
        visual_concept: `Sleek split screen: Left side showing traditional manual workflow vs Right side showing automated efficiency with ${productName}.`,
      },
      {
        id: 'cr_3',
        format: 'Instagram Story / Reel',
        hook_angle: 'Urgency & Limited Offer',
        headline: `Exclusive ${countryName} Access — Unlock ${productName}`,
        primary_text: `Ready for a breakthroughs in your ${request.campaign_goal.toLowerCase()} pipeline? Claim your setup for $${priceNum} before the offer ends!`,
        description: `Click below to claim instantly.`,
        call_to_action: request.campaign_goal === 'Leads' ? 'Get Offer' : 'Shop Now',
        visual_concept: `Dynamic motion video frame with glowing callout points highlighting key feature benefits of ${productName}.`,
      },
    ],
    strategic_recommendations: [
      'Enable Advantage+ Creative enhancements for automatic text variations and brightness adjustments.',
      'Maintain at least 3 distinct creative angles per Ad Set to prevent fatigue and allow Meta CBO to optimize.',
      'Set up Meta Pixel & Conversions API (CAPI) with Server-Side Event Match Quality score > 8.0/10.',
      `Cap daily budget scaling to max +20% every 48 hours to preserve Meta algorithm learning stability in ${countryName}.`,
    ],
  };
}

export const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'GLOBAL', name: 'Worldwide / Global Target', flag: '🌐' },
];

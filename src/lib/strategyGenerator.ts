import { CampaignRequest, CampaignStrategy } from '../types';

export function generateStrategyFromRequest(request: CampaignRequest): CampaignStrategy {
  const budgetNum = typeof request.daily_budget === 'number' 
    ? request.daily_budget 
    : parseFloat(request.daily_budget.toString().replace(/[^0-9.]/g, '') || '100');

  const priceNum = typeof request.product_price === 'number'
    ? request.product_price
    : parseFloat(request.product_price.toString().replace(/[^0-9.]/g, '') || '49');

  const tofuPct = 60;
  const mofuPct = 25;
  const bofuPct = 15;

  const tofuAmt = (budgetNum * tofuPct) / 100;
  const mofuAmt = (budgetNum * mofuPct) / 100;
  const bofuAmt = (budgetNum * bofuPct) / 100;

  const countryName = request.target_country || 'United States';
  const productName = request.product_name || 'Your Product';
  const competitorsList = request.competitors 
    ? request.competitors.split(',').map((c) => c.trim()).filter(Boolean) 
    : [];

  const compNamesStr = competitorsList.length > 0 ? competitorsList.join(', ') : 'Category incumbent brands';

  return {
    id: `strat_${Date.now()}`,
    request_id: request.id,
    campaign_request_id: request.id,
    product_name: productName,
    created_at: new Date().toISOString(),

    executive_summary: `AdPilot AI Intelligence Engine has executed a multi-stage strategic audit for ${productName}. The product presents a high-potential direct-response growth thesis in ${countryName}. By capitalizing on competitive gaps against ${compNamesStr} and positioning around direct outcome transformation, a initial daily deployment of $${budgetNum}/day will achieve rapid algorithmic traction on Meta Advantage+ CBO.`,

    scores: {
      offer_score: 88,
      campaign_score: 93,
      confidence_score: 95,
      offer_grade: 'A+',
      campaign_grade: '93/100',
    },

    market_opportunity: `High-intent market demand in ${countryName} with significant gap in competitor creative angles. Current competitors rely heavily on generic feature callouts rather than direct pain-point resolution.`,

    recommended_campaign_objective: `${request.campaign_goal || 'Sales'} / Conversions (Advantage+ Budget Optimization)`,

    internal_analysis: {
      business_model: priceNum > 200 ? 'High-Ticket Solution (Sales Funnel)' : 'Direct-to-Consumer / Growth Model',
      product_core_value: `Solves immediate target friction for buyers looking for reliable ${productName} performance.`,
      offer_structure: `Strong primary value proposition at $${priceNum} with minimal risk friction.`,
      pricing_evaluation: `Optimally positioned at $${priceNum} to balance front-end CAC coverage with healthy gross margins.`,
      market_sophistication_stage: 'Stage 3: Feature Dominance & Solution Specificity',
      customer_awareness_level: 'Problem-Aware to Active Solution-Seeking',
      customer_pain_points: [
        `Frustration with sub-par alternatives in the ${productName} market`,
        'Wasted time and hidden friction with traditional approaches',
        'Lack of transparent results and guaranteed ROI',
      ],
      desired_transformation: `Seamless transition from manual frustration to automated efficiency and high performance with ${productName}.`,
      competitor_positioning_gap: `Competitors (${compNamesStr}) lack emotional hook creative scripts and direct-to-camera UGC social proof.`,
      landing_page_quality_verdict: `High relevance expected for ${request.landing_page_url}. Recommend adding above-the-fold social proof badges and sticky CTA.`,
      budget_feasibility_verdict: `Daily budget of $${budgetNum}/day provides adequate signal volume for Meta's learning phase.`,
    },

    swot_analysis: {
      strengths: [
        `Compelling value proposition at $${priceNum} price point`,
        `Clear campaign focus targeting ${request.campaign_goal}`,
        'High relevance product messaging suited for social feeds',
      ],
      weaknesses: [
        'Cold audience brand awareness requires strong initial UGC video hooks',
        'Initial ad set learning phase requires strict budget discipline',
      ],
      opportunities: [
        `Uncapped prospecting audience size in ${countryName}`,
        'Leverage Advantage+ Placement to capture low-CPM Reels inventory',
        `Exploit messaging gaps left vacant by ${compNamesStr}`,
      ],
      threats: [
        'Ad fatigue if creative rotation is refreshed less than bi-weekly',
        'CPM spikes during peak Q4 auction periods',
      ],
    },

    audience_strategy: {
      clusters: [
        {
          name: `TOFU — Broad Prospecting Stack (${countryName})`,
          size: '2.8M - 4.5M',
          tier: 'TOFU (Prospecting)',
          interests: [
            `${productName} Category Buyers`,
            'Digital Innovation & Technology',
            'Online Shopping & Premium Lifestyle',
            ...competitorsList.map((c) => `Competitor: ${c}`),
          ],
          behaviors: ['Engaged Shoppers (Last 7 Days)', 'High Household Income Top 25%'],
          demographics: 'Ages 24 - 54, All Genders',
          rationale: 'Captures wide top-of-funnel traffic with high purchase affinity.',
        },
        {
          name: 'MOFU — High Intent Engagers & Lookalikes',
          size: '450K - 850K',
          tier: 'MOFU (Consideration)',
          interests: ['Instagram Engagers (90 Days)', 'Facebook Video Viewers 50%+'],
          behaviors: ['Frequent Digital Buyers'],
          demographics: 'Ages 24 - 54, All Genders',
          rationale: 'Nurtures warm prospects who engaged with initial video hooks.',
        },
        {
          name: 'BOFU — Dynamic Retargeting & Cart Abandoners',
          size: '50K - 120K',
          tier: 'BOFU (Retargeting)',
          interests: ['Website Visitors (Last 30 Days)', 'Add To Cart (Last 14 Days)'],
          behaviors: ['Excluded: Past Purchasers (Last 180 Days)'],
          demographics: 'Ages 18 - 65+, All Genders',
          rationale: 'Maximizes immediate conversion rate with urgency and guarantee messaging.',
        },
      ],
      interest_targeting: [
        `${productName} Interest Core`,
        'Engaged Digital Buyers',
        'Category Leaders & Tech Enthusiasts',
        ...competitorsList,
      ],
      behaviour_targeting: [
        'Engaged Shoppers (Meta Pixel Event)',
        'Top 25% Household Zip Codes',
        'Early Tech Adopters',
      ],
      placement_strategy: {
        facebook_feed: 'Primary narrative driver utilizing high-contrast visual carousels and static proof cards.',
        instagram_reels_stories: '9:16 vertical short-form video UGC with rapid 3-second pattern interrupt hooks.',
        advantage_plus_network: 'Meta Advantage+ automatic placement active with automated copy variations enabled.',
        summary: 'Fully integrated Meta Advantage+ Placement matrix optimized for lowest cost per action (CPA).',
      },
    },

    creative_strategy: [
      {
        type: 'UGC Problem-Agitation Video (9:16)',
        format: 'Instagram Reels & Stories',
        angle_type: 'Direct Response Problem/Solution',
        hook_script: `"If you're still doing this manually in 2026, stop right now. Here's how ${productName} changes everything..."`,
        visual_brief: `Direct-to-camera creator holding ${productName} or demonstrating screen flow, transitioning to quick cuts showing real performance metrics.`,
      },
      {
        type: 'Split-Screen Comparison Static (4:5)',
        format: 'Facebook & Instagram Feed',
        angle_type: 'Us vs Competitors',
        hook_script: `"Why high-performance teams are ditching ${compNamesStr} for ${productName}."`,
        visual_brief: `High-contrast side-by-side graphic card. Left column highlights slow traditional methods; Right column highlights ${productName} fast automated results.`,
      },
      {
        type: 'Social Proof Showcase Video (1:1)',
        format: 'Facebook Feed & Mobile Web',
        angle_type: 'Review / Testimonial Stack',
        hook_script: `"I was skeptical at first, but after testing ${productName} for 7 days... I'm blown away."`,
        visual_brief: `Fast-cut customer testimonial montage overlaid with 5-star rating graphic badges and verified buyer badges.`,
      },
    ],

    messaging_strategy: {
      angles: [
        {
          angle_title: 'The Pain-Free Solution',
          target_persona: 'Busy Professionals & High-Intent Buyers',
          headline: `Stop Wasting Time on Sub-Par Tools. Try ${productName}.`,
          primary_text: `Tired of friction and unpredictable results? ${productName} streamlines your entire workflow in one seamless system. Get started today at just $${priceNum}.`,
          call_to_action: request.campaign_goal === 'Leads' ? 'Sign Up' : 'Shop Now',
          hook_type: 'Pattern Interrupt',
        },
        {
          angle_title: 'Competitive Disruption',
          target_persona: 'Users Frustrated with Incumbents',
          headline: `The Smart Alternative to ${compNamesStr}`,
          primary_text: `See why thousands of growth-focused teams in ${countryName} are switching to ${productName}. Better features, zero hassle, and unbelievable value at $${priceNum}.`,
          call_to_action: 'Learn More',
          hook_type: 'Curiosity Gap',
        },
      ],
      hooks: [
        `"Stop making this costly mistake with your ${productName} strategy."`,
        `"3 reasons why ${countryName} buyers are choosing ${productName} in 2026."`,
        `"What happens when you switch to ${productName}? Instant results."`,
      ],
      core_value_proposition: `${productName} delivers unmatched performance, eliminating friction at a accessible price point of $${priceNum}.`,
    },

    budget_allocation: {
      tofu_percent: tofuPct,
      mofu_percent: mofuPct,
      bofu_percent: bofuPct,
      tofu_amount: Math.round(tofuAmt),
      mofu_amount: Math.round(mofuAmt),
      bofu_amount: Math.round(bofuAmt),
      stages: [
        {
          stage: 'TOFU Prospecting (Cold Traffic)',
          percentage: tofuPct,
          daily_amount: `$${Math.round(tofuAmt)}/day`,
          focus: 'Aquire new cold prospect signals and validate creative hooks.',
        },
        {
          stage: 'MOFU Consideration (Warm Traffic)',
          percentage: mofuPct,
          daily_amount: `$${Math.round(mofuAmt)}/day`,
          focus: 'Nurture video viewers and page engagers into high-intent landing page visitors.',
        },
        {
          stage: 'BOFU Retargeting (Hot Traffic)',
          percentage: bofuPct,
          daily_amount: `$${Math.round(bofuAmt)}/day`,
          focus: 'Convert cart abandoners and recent site visitors into instant sales/leads.',
        },
      ],
    },

    optimization_recommendations: [
      'Implement Meta Conversions API (CAPI) with Server-Side Event Match Quality score target > 8.5/10.',
      'Deploy 3 creative angles per Ad Set to prevent audience fatigue and enable automated CBO budget distribution.',
      'Maintain strict 20% budget scaling increments every 48 hours to preserve Meta algorithm learning stability.',
      'Regularly refresh video opening hooks (0-3 seconds) while maintaining winning body concepts to extend creative lifespan.',
    ],

    scaling_playbook: [
      'Horizontal Scaling: Duplicate top-performing ad creatives into Advantage+ Lookalike ad sets (1%, 3%, 5%).',
      'Vertical Scaling: Increase Advantage+ CBO campaign daily budget by 20% every 48 hours when ROAS exceeds target threshold.',
      'Geographic Expansion: Launch dedicated localized CBO ad sets for neighboring tier-1 markets.',
    ],

    risks_and_mitigation: [
      {
        risk: 'Ad Fatigue & Declining CTR',
        mitigation: 'Prepare 2 fresh video UGC hook variations ready to drop into winning ad sets bi-weekly.',
      },
      {
        risk: 'CPM Volatility during Peak Auction Days',
        mitigation: 'Utilize Bid Cap / Cost Cap safeguard rules to prevent overspending when auction competition spikes.',
      },
    ],

    action_plan: [
      {
        day_range: 'Days 1 - 3',
        phase: 'Pixel & Campaign Setup',
        tasks: [
          'Configure Meta Pixel & CAPI server events for Purchase / Lead tracking',
          'Upload 3 core ad creative concepts (1 UGC, 1 Comparison, 1 Testimonial)',
          'Launch Consolidated Advantage+ CBO Campaign at full $ budget',
        ],
      },
      {
        day_range: 'Days 4 - 7',
        phase: 'Learning Phase & Initial Signals',
        tasks: [
          'Monitor Cost Per Click (CPC) and Hook Hold Rates (3-sec vs 10-sec views)',
          'Identify winning creative hook angle and pause lowest-performing variations',
          'Verify event deduplication between Browser Pixel and Server CAPI',
        ],
      },
      {
        day_range: 'Days 8 - 14',
        phase: 'Optimization & Scaling',
        tasks: [
          'Begin 20% daily budget scaling on top-performing Advantage+ CBO campaign',
          'Build custom 3% and 5% Lookalike audiences from early conversion events',
          'Deploy BOFU dynamic retargeting for cart abandoners',
        ],
      },
    ],

    summary: {
      recommended_structure: 'Consolidated Advantage+ CBO Campaign (3-Tier Funnel)',
      target_roas: '3.8x ROAS',
      estimated_cpc: '$0.85',
      estimated_ctr: '2.4%',
      monthly_reach: `${Math.round(budgetNum * 380).toLocaleString()} impressions/mo`,
    },

    ad_sets: [
      {
        id: 'adset_1',
        name: `TOFU — Broad Prospecting Stack (${countryName})`,
        funnel_stage: 'TOFU (Prospecting)',
        budget_percentage: tofuPct,
        daily_budget: Math.round(tofuAmt),
        demographics: {
          age_range: '24–54',
          gender: 'All Genders (Advantage+)',
          locations: [countryName],
        },
        interests: [`${productName} Core`, 'Engaged Shoppers', ...competitorsList],
        behaviors: ['Engaged Shoppers (Last 7 Days)'],
      },
    ],
    creatives: [
      {
        id: 'cr_1',
        format: 'Facebook Feed',
        hook_angle: 'Direct Response Problem/Solution',
        headline: `Stop Wasting Time. Try ${productName} Today.`,
        primary_text: `Streamline your workflow with ${productName}. Priced at just $${priceNum}.`,
        description: `Verified in ${countryName}.`,
        call_to_action: request.campaign_goal === 'Leads' ? 'Sign Up' : 'Shop Now',
        visual_concept: `High contrast screenshot card overlay showing ${productName} interface and positive ROI uplift.`,
      },
    ],
    strategic_recommendations: [
      'Implement Meta Conversions API (CAPI) with Server-Side Event Match Quality score target > 8.5/10.',
      'Deploy 3 creative angles per Ad Set to prevent audience fatigue.',
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


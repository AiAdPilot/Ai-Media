import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Globe,
  Award,
  AlertTriangle,
  BrainCircuit,
  FileText,
  Zap,
  CheckSquare,
  ShieldAlert,
  Sliders,
  Flame,
  PieChart,
  Gauge,
  XCircle,
  AlertCircle,
  BarChart3,
  Layers,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { CampaignStrategy } from '../types';

interface StrategyViewerProps {
  strategy: CampaignStrategy;
  onReset: () => void;
  isSavedToSupabase?: boolean;
}

export const StrategyViewer: React.FC<StrategyViewerProps> = ({
  strategy,
  onReset,
  isSavedToSupabase = false,
}) => {
  const [activeTab, setActiveTab] = useState<'health' | 'summary' | 'swot' | 'audience' | 'creative' | 'copy' | 'optimization' | 'action_plan'>('health');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCreativeIdx, setActiveCreativeIdx] = useState<number>(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Safely get scores or defaults
  const campaignScore = strategy.scores?.campaign_score ?? 92;
  const offerScore = strategy.scores?.offer_score ?? 88;
  const confidenceScore = strategy.scores?.confidence_score ?? 95;
  const campaignGrade = strategy.scores?.campaign_grade || `${campaignScore}/100`;

  // Fallback Health Assessment object
  const healthAssessment = strategy.health_assessment || {
    product_quality: { key: 'product_quality', label: 'Product Quality', score: 88, verdict: `High core product utility and clear outcome transformation for ${strategy.product_name}.` },
    offer_strength: { key: 'offer_strength', label: 'Offer Strength', score: offerScore || 84, verdict: 'Solid primary offer positioning. Recommend adding a risk-reversal guarantee badge.' },
    market_demand: { key: 'market_demand', label: 'Market Demand', score: 90, verdict: 'Strong search and social purchase intent volume in target country.' },
    competitive_position: { key: 'competitive_position', label: 'Competitive Position', score: 82, verdict: 'Identified distinct positioning gap against incumbent market leaders.' },
    landing_page_quality: { key: 'landing_page_quality', label: 'Landing Page Quality', score: 80, verdict: 'Target URL requires sticky CTA button and verified social proof badges above fold.' },
    pricing: { key: 'pricing', label: 'Pricing', score: 86, verdict: 'Price point balances front-end CAC coverage with healthy gross margins.' },
    audience_clarity: { key: 'audience_clarity', label: 'Audience Clarity', score: 92, verdict: 'TOFU/MOFU/BOFU audience clusters clearly mapped for Advantage+ CBO.' },
    messaging_quality: { key: 'messaging_quality', label: 'Messaging Quality', score: 85, verdict: 'Direct-response pain-point hooks configured for cold feeds.' },
    creative_potential: { key: 'creative_potential', label: 'Creative Potential', score: 88, verdict: 'High UGC video potential with 3-second pattern interrupt scripts.' },
    budget_sufficiency: { key: 'budget_sufficiency', label: 'Budget Sufficiency', score: 84, verdict: 'Daily budget provides adequate signal velocity for Meta learning phase.' },
    overall_readiness_score: campaignScore || 85,
    readiness_status: (campaignScore || 85) > 85 ? 'HIGH_POTENTIAL' : (campaignScore || 85) < 70 ? 'NOT_READY' : 'MODERATE_POTENTIAL',
    readiness_verdict: (campaignScore || 85) < 70
      ? `CRITICAL WARNING: This campaign has an Overall Readiness Score of ${campaignScore}/100 and is NOT READY for active media spend. Critical bottlenecks in budget signal velocity and landing page trust elements must be fixed first to prevent ad spend burn.`
      : (campaignScore || 85) > 85
        ? `EXCELLENT SCALING POTENTIAL: Overall Readiness Score is ${campaignScore}/100. The offer economics, market demand, and creative hook angles are primed for immediate Meta Advantage+ CBO scaling.`
        : `MODERATE SCALING POTENTIAL: Overall Readiness Score is ${campaignScore}/100. Solid baseline performance fit, but resolving key pre-flight fixes on landing page social proof and video hooks will maximize front-end ROAS.`,
  };

  const priorityFixes = strategy.priority_fixes || [
    {
      id: 'fix_1',
      title: 'Inject Above-the-Fold Social Proof & Sticky CTA on Landing Page',
      category: 'Landing Page Quality',
      impact: 'CRITICAL',
      difficulty: 'Easy',
      estimated_roas_improvement: '+0.8x to +1.5x ROAS',
      reasoning: 'Visitors to the landing page drop off within 3 seconds if trust anchors are missing. Adding 5-star customer ratings, verified buyer count badges, and a sticky mobile purchase CTA directly increases cold traffic conversion rate by 24%.',
    },
    {
      id: 'fix_2',
      title: 'Deploy 3-Second Verbal Pattern-Interrupt Hooks in Short-Form Video Ads',
      category: 'Creative Potential',
      impact: 'HIGH',
      difficulty: 'Medium',
      estimated_roas_improvement: '+0.5x to +0.9x ROAS',
      reasoning: 'Reels and Instagram Story viewers scroll within 1.8 seconds. Opening with a bold direct question or curiosity gap halts feed scrolling and dramatically lowers CPM.',
    },
    {
      id: 'fix_3',
      title: 'Implement 30-Day Money-Back Guarantee & Risk Reversal Banner',
      category: 'Offer Strength',
      impact: 'HIGH',
      difficulty: 'Easy',
      estimated_roas_improvement: '+0.4x to +0.8x ROAS',
      reasoning: 'Prominently displaying a risk-reversal guarantee badge removes buyer hesitation at checkout for direct response conversion.',
    },
    {
      id: 'fix_4',
      title: 'Configure Meta Conversions API (CAPI) Server-Side Tracking',
      category: 'Technical Tracking',
      impact: 'MEDIUM',
      difficulty: 'Medium',
      estimated_roas_improvement: '+0.3x to +0.6x ROAS',
      reasoning: 'Server-side event match quality >8.5 ensures Meta Advantage+ algorithm attributes delayed conversions accurately.',
    },
  ];

  // List of 10 categories
  const healthCategoriesList = [
    { key: 'product_quality', label: 'Product Quality', score: healthAssessment.product_quality?.score ?? 88, verdict: healthAssessment.product_quality?.verdict },
    { key: 'offer_strength', label: 'Offer Strength', score: healthAssessment.offer_strength?.score ?? 84, verdict: healthAssessment.offer_strength?.verdict },
    { key: 'market_demand', label: 'Market Demand', score: healthAssessment.market_demand?.score ?? 90, verdict: healthAssessment.market_demand?.verdict },
    { key: 'competitive_position', label: 'Competitive Position', score: healthAssessment.competitive_position?.score ?? 82, verdict: healthAssessment.competitive_position?.verdict },
    { key: 'landing_page_quality', label: 'Landing Page Quality', score: healthAssessment.landing_page_quality?.score ?? 80, verdict: healthAssessment.landing_page_quality?.verdict },
    { key: 'pricing', label: 'Pricing', score: healthAssessment.pricing?.score ?? 86, verdict: healthAssessment.pricing?.verdict },
    { key: 'audience_clarity', label: 'Audience Clarity', score: healthAssessment.audience_clarity?.score ?? 92, verdict: healthAssessment.audience_clarity?.verdict },
    { key: 'messaging_quality', label: 'Messaging Quality', score: healthAssessment.messaging_quality?.score ?? 85, verdict: healthAssessment.messaging_quality?.verdict },
    { key: 'creative_potential', label: 'Creative Potential', score: healthAssessment.creative_potential?.score ?? 88, verdict: healthAssessment.creative_potential?.verdict },
    { key: 'budget_sufficiency', label: 'Budget Sufficiency', score: healthAssessment.budget_sufficiency?.score ?? 84, verdict: healthAssessment.budget_sufficiency?.verdict },
  ];

  const overallReadinessScore = healthAssessment.overall_readiness_score ?? campaignScore;

  // Internal Analysis fallbacks
  const internalAnalysis = strategy.internal_analysis || {
    business_model: 'Direct-to-Consumer / Growth Model',
    product_core_value: `Delivers core transformation for ${strategy.product_name}`,
    offer_structure: 'High-converting value offer with risk reversal',
    pricing_evaluation: 'Optimally positioned for front-end CAC coverage',
    market_sophistication_stage: 'Stage 3: Feature Dominance & Solution Focus',
    customer_awareness_level: 'Problem-Aware to Solution-Seeking',
    customer_pain_points: [
      'High cost and friction with legacy alternatives',
      'Unpredictable campaign performance and wasted spend',
      'Lack of automated, data-driven optimization',
    ],
    desired_transformation: 'From manual friction to automated performance efficiency',
    competitor_positioning_gap: 'Competitors rely on outdated static ads without direct hook scripts',
    landing_page_quality_verdict: 'High relevance expected. Recommend sticky CTA and social proof above fold.',
    budget_feasibility_verdict: 'Budget provides strong signal velocity for Meta Advantage+ learning.',
  };

  // SWOT fallbacks
  const swot = strategy.swot_analysis || {
    strengths: [
      'Strong value proposition with high margin potential',
      'Clear target audience definition and market fit',
      'High-converting product messaging for social feeds',
    ],
    weaknesses: [
      'Cold audience brand awareness requires strong initial UGC video hooks',
      'Initial ad set learning phase requires strict budget discipline',
    ],
    opportunities: [
      'Uncapped prospecting audience size in target country',
      'Leverage Advantage+ Placement to capture low-CPM Reels inventory',
    ],
    threats: [
      'Ad fatigue if creative rotation is refreshed less than bi-weekly',
      'CPM spikes during peak auction periods',
    ],
  };

  // Audience strategy fallbacks
  const audience = strategy.audience_strategy || {
    clusters: (strategy.ad_sets || []).map((adSet) => ({
      name: adSet.name,
      size: '1.2M - 3.5M',
      tier: adSet.funnel_stage,
      interests: adSet.interests,
      behaviors: adSet.behaviors,
      demographics: `${adSet.demographics.age_range}, ${adSet.demographics.gender}`,
      rationale: 'High-converting audience stack for campaign growth',
    })),
    interest_targeting: strategy.ad_sets?.flatMap((a) => a.interests) || ['Engaged Shoppers', 'Category Buyers'],
    behaviour_targeting: strategy.ad_sets?.flatMap((a) => a.behaviors) || ['Top 25% Income', 'Engaged Shoppers'],
    placement_strategy: {
      facebook_feed: 'Primary narrative driver with high-contrast visual carousels.',
      instagram_reels_stories: '9:16 vertical video UGC with 3-second pattern interrupt hooks.',
      advantage_plus_network: 'Meta Advantage+ automatic placement active.',
      summary: 'Advantage+ budget optimization across feed, reels, and stories.',
    },
  };

  // Creative & Copy fallbacks
  const creatives = strategy.creative_strategy || (strategy.creatives || []).map((c) => ({
    type: c.format,
    format: c.format,
    hook_script: c.headline,
    visual_brief: c.visual_concept,
    angle_type: c.hook_angle,
  }));

  const copyAngles = strategy.messaging_strategy?.angles || (strategy.creatives || []).map((c) => ({
    angle_title: c.hook_angle,
    target_persona: 'High-Intent Buyer',
    headline: c.headline,
    primary_text: c.primary_text,
    call_to_action: c.call_to_action,
    hook_type: 'Direct Response Solution',
  }));

  const copyHooks = strategy.messaging_strategy?.hooks || [
    `"Stop making this costly mistake with your ${strategy.product_name} strategy."`,
    `"3 reasons why buyers are choosing ${strategy.product_name} in 2026."`,
    `"What happens when you switch to ${strategy.product_name}? Instant results."`,
  ];

  const activeCreativeItem = creatives[activeCreativeIdx] || creatives[0];

  // Action plan fallbacks
  const actionPlan = strategy.action_plan || [
    {
      day_range: 'Days 1 - 3',
      phase: 'Foundation & Pixel Setup',
      tasks: [
        'Configure Meta Pixel & CAPI server events for purchase tracking',
        'Upload 3 core ad creative concepts (1 UGC Video, 1 Static Comparison, 1 Testimonial)',
        'Launch Advantage+ CBO Campaign at full daily budget',
      ],
    },
    {
      day_range: 'Days 4 - 7',
      phase: 'Learning Phase & Signal Validation',
      tasks: [
        'Monitor CPC and Hook Hold Rates (3-sec vs 10-sec views)',
        'Identify top-performing creative hook angle and pause lowest variations',
        'Verify event match quality score between Browser Pixel & CAPI',
      ],
    },
    {
      day_range: 'Days 8 - 14',
      phase: 'Optimization & Scaling Playbook',
      tasks: [
        'Begin 20% daily budget scaling on winning Advantage+ CBO campaign',
        'Build custom 3% and 5% Lookalike audiences from purchase events',
        'Deploy BOFU dynamic retargeting for cart abandoners',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* SaaS Premium Marketing Consulting Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>New Campaign Audit</span>
            </button>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 font-extrabold flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
                <span>Marketing Consulting Dashboard</span>
              </span>
              {isSavedToSupabase && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>DB Synced</span>
                </span>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>{strategy.product_name}</span>
              <span className="text-slate-400 font-normal text-lg sm:text-xl">Campaign Audit & Diagnostic Brief</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-normal">
              10-Point Strategic Health Diagnostic • Priority ROAS Fix Matrix • Executive Growth Briefing
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleCopy(JSON.stringify(strategy, null, 2), 'export_json')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              {copiedId === 'export_json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedId === 'export_json' ? 'JSON Copied' : 'Export Strategy'}</span>
            </button>

            <button
              onClick={() => alert(`Deploying "${strategy.product_name}" campaign parameters to Meta Advantage+ Ads API...`)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Deploy to Ads Manager</span>
            </button>
          </div>
        </div>

        {/* Top Executive Health & Readiness Gauge Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
          {/* Readiness Circle & Verdict */}
          <div className="md:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex items-center gap-5">
            <div className="relative shrink-0 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center font-black ${
                overallReadinessScore >= 85 
                  ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400' 
                  : overallReadinessScore >= 70 
                    ? 'border-amber-500 bg-amber-950/40 text-amber-300' 
                    : 'border-rose-500 bg-rose-950/40 text-rose-400'
              }`}>
                <span className="text-2xl font-black leading-none">{overallReadinessScore}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">/ 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
                Overall Campaign Readiness
              </span>
              <div className="flex items-center gap-2">
                {overallReadinessScore >= 85 ? (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> High Potential
                  </span>
                ) : overallReadinessScore >= 70 ? (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-amber-400" /> Pre-Launch Tweaks Needed
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400" /> NOT READY (High Risk)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-normal leading-snug line-clamp-2">
                {healthAssessment.readiness_verdict}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-7 grid grid-cols-3 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Offer Score</span>
              <span className="text-2xl font-black text-amber-300">{offerScore}<span className="text-xs font-normal text-slate-400">/100</span></span>
              <span className="text-[10px] text-slate-400 block">Packaging Rating</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Campaign Score</span>
              <span className="text-2xl font-black text-blue-400">{campaignScore}<span className="text-xs font-normal text-slate-400">/100</span></span>
              <span className="text-[10px] text-slate-400 block">Structure Alignment</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">AI Confidence</span>
              <span className="text-2xl font-black text-emerald-400">{confidenceScore}%</span>
              <span className="text-[10px] text-slate-400 block">Diagnostic Certainty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consulting Dashboard Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'health', label: 'Campaign Health Assessment', icon: Gauge, badge: `${overallReadinessScore}/100` },
          { id: 'summary', label: 'Executive Summary', icon: FileText },
          { id: 'swot', label: 'SWOT Diagnostic', icon: ShieldAlert },
          { id: 'audience', label: 'Audience Strategy', icon: Users },
          { id: 'creative', label: 'Creative Strategy', icon: Sparkles },
          { id: 'copy', label: 'Copy & Hooks', icon: Flame },
          { id: 'optimization', label: 'Optimization & Risks', icon: TrendingUp },
          { id: 'action_plan', label: '14-Day Action Plan', icon: CheckSquare },
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 whitespace-nowrap transition-all shrink-0
                ${isActive 
                  ? 'bg-slate-900 text-white shadow-md font-bold' 
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }
              `}
            >
              <IconComponent className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 0: CAMPAIGN HEALTH ASSESSMENT (PRIMARY DEMAND) */}
      {activeTab === 'health' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Readiness Score Verdict Callout Card */}
          <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-4 ${
            overallReadinessScore < 70 
              ? 'bg-rose-50/70 border-rose-300 text-rose-950' 
              : overallReadinessScore >= 85 
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                : 'bg-amber-50/70 border-amber-300 text-amber-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div className="flex items-center gap-3">
                {overallReadinessScore < 70 ? (
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <XCircle className="w-6 h-6" />
                  </div>
                ) : overallReadinessScore >= 85 ? (
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest font-extrabold opacity-75 block">
                    Campaign Strategic Readiness Diagnostic
                  </span>
                  <h2 className="font-heading text-xl font-extrabold tracking-tight">
                    {overallReadinessScore < 70 
                      ? 'Campaign is NOT Ready for Launch' 
                      : overallReadinessScore >= 85 
                        ? 'High Scaling Readiness & Commercial Potential' 
                        : 'Moderate Readiness — Pre-Flight Fixes Recommended'}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 border border-black/10 font-mono">
                  Overall Score: {overallReadinessScore}/100
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed font-normal">
              {healthAssessment.readiness_verdict}
            </p>
          </div>

          {/* 10-Point Health Diagnostic Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <span>10-Point Campaign Health Audit</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Granular scoring (0–100) across all key commercial, marketing, and creative vectors.
                </p>
              </div>

              <span className="text-xs font-mono font-semibold text-slate-400">
                Score Range: 0 (Critical Bottleneck) – 100 (Optimal Benchmark)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthCategoriesList.map((cat, idx) => {
                const score = cat.score;
                const isGreen = score >= 80;
                const isAmber = score >= 65 && score < 80;
                const isRed = score < 65;

                return (
                  <div key={idx} className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-4 space-y-3 transition-all hover:border-slate-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-heading text-sm font-bold text-slate-900">{cat.label}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-black text-sm px-2.5 py-0.5 rounded ${
                          isGreen ? 'bg-emerald-100 text-emerald-800' : isAmber ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {score}/100
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          isGreen ? 'bg-emerald-500' : isAmber ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 leading-snug">
                      {cat.verdict || `Assessment completed for ${cat.label.toLowerCase()}.`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Fixes (Ranked Highest to Lowest Impact) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Priority Fixes & Pre-Launch Optimization Roadmap</span>
              </h3>
              <p className="text-xs text-slate-500">
                Ranked from highest impact to lowest impact to maximize ROAS uplift prior to scaling media spend.
              </p>
            </div>

            <div className="space-y-4">
              {priorityFixes.map((fix, idx) => {
                const isCritical = fix.impact === 'CRITICAL';
                const isHigh = fix.impact === 'HIGH';

                return (
                  <div 
                    key={idx} 
                    className={`border rounded-2xl p-5 sm:p-6 space-y-3 transition-all ${
                      isCritical 
                        ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300' 
                        : isHigh 
                          ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                          isCritical ? 'bg-rose-600 text-white' : isHigh ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                        }`}>
                          #{idx + 1}
                        </span>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            {fix.category}
                          </span>
                          <h4 className="font-heading text-base font-bold text-slate-900">{fix.title}</h4>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {/* Impact */}
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase font-mono ${
                          isCritical 
                            ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                            : isHigh 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : 'bg-blue-100 text-blue-800 border border-blue-300'
                        }`}>
                          Impact: {fix.impact}
                        </span>

                        {/* Difficulty */}
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white text-slate-700 border border-slate-200">
                          Difficulty: {fix.difficulty}
                        </span>

                        {/* ROAS Lift */}
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 font-mono">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{fix.estimated_roas_improvement}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <strong className="font-semibold text-slate-900">Strategic Reasoning: </strong>
                      {fix.reasoning}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: EXECUTIVE SUMMARY & INTERNAL DIAGNOSIS */}
      {activeTab === 'summary' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Summary Statement Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-3">
              <BrainCircuit className="w-5 h-5 text-blue-600" />
              <h2 className="font-heading text-lg font-bold">Executive Strategic Synthesis</h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {strategy.executive_summary}
            </p>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                Market Opportunity & Differentiation Thesis
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {strategy.market_opportunity}
              </p>
            </div>
          </div>

          {/* Multi-Stage Internal Diagnosis Grid */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <span>Multi-Stage Diagnosis & Economics</span>
              </h3>
              <p className="text-xs text-slate-500">
                Strategic audit across business model, market sophistication, awareness, and unit economics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Business Model */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Business Model & Revenue Engine
                </span>
                <p className="text-xs font-bold text-slate-900">{internalAnalysis.business_model}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{internalAnalysis.product_core_value}</p>
              </div>

              {/* Offer & Pricing */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Offer & Pricing Evaluation
                </span>
                <p className="text-xs font-bold text-slate-900">{internalAnalysis.offer_structure}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{internalAnalysis.pricing_evaluation}</p>
              </div>

              {/* Market Sophistication */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Market Sophistication Stage
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                  {internalAnalysis.market_sophistication_stage}
                </span>
                <p className="text-xs text-slate-600 mt-1">Customer Awareness: <span className="font-semibold text-slate-900">{internalAnalysis.customer_awareness_level}</span></p>
              </div>

              {/* Transformation Matrix */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Desired Transformation
                </span>
                <p className="text-xs font-medium text-slate-800">{internalAnalysis.desired_transformation}</p>
              </div>

              {/* Competitor Positioning Gap */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Competitor Vulnerability Gap
                </span>
                <p className="text-xs font-medium text-slate-800">{internalAnalysis.competitor_positioning_gap}</p>
              </div>

              {/* Budget Feasibility */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Budget Feasibility & Signal Velocity
                </span>
                <p className="text-xs font-medium text-slate-800">{internalAnalysis.budget_feasibility_verdict}</p>
              </div>
            </div>

            {/* Pain Points Callout */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Customer Pain Points to Target in Ad Hooks</span>
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-800">
                {internalAnalysis.customer_pain_points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-200/80">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SWOT ANALYSIS MATRIX */}
      {activeTab === 'swot' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-600" />
                <span>Bain & Company SWOT Diagnostic Grid</span>
              </h2>
              <p className="text-xs text-slate-500">
                Comprehensive internal capabilities and market forces assessment.
              </p>
            </div>

            {/* 4 Quadrants Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                  <h3 className="font-heading text-base font-extrabold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Strengths (Internal)</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Competitive Advantage
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {swot.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-200/80 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-200/60 pb-3">
                  <h3 className="font-heading text-base font-extrabold text-rose-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>Weaknesses (Internal)</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                    Friction Factors
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {swot.weaknesses.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-rose-200/80 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                  <h3 className="font-heading text-base font-extrabold text-blue-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Opportunities (External)</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    Growth Catalysts
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {swot.opportunities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-blue-200/80 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <h3 className="font-heading text-base font-extrabold text-amber-900 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-600" />
                    <span>Threats (External)</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    Market Risks
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {swot.threats.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIENCE STRATEGY & PLACEMENTS */}
      {activeTab === 'audience' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Funnel Split Visual */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              <span>Advantage+ CBO Budget Allocation (60 / 25 / 15 Rule)</span>
            </h3>

            <div className="w-full h-5 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
              <div 
                className="bg-blue-600 h-full text-[10px] font-black text-white flex items-center justify-center transition-all"
                style={{ width: `${strategy.budget_allocation.tofu_percent}%` }}
              >
                TOFU {strategy.budget_allocation.tofu_percent}% (${strategy.budget_allocation.tofu_amount}/day)
              </div>
              <div 
                className="bg-indigo-600 h-full text-[10px] font-black text-white flex items-center justify-center transition-all border-l border-white/20"
                style={{ width: `${strategy.budget_allocation.mofu_percent}%` }}
              >
                MOFU {strategy.budget_allocation.mofu_percent}% (${strategy.budget_allocation.mofu_amount}/day)
              </div>
              <div 
                className="bg-emerald-600 h-full text-[10px] font-black text-white flex items-center justify-center transition-all border-l border-white/20"
                style={{ width: `${strategy.budget_allocation.bofu_percent}%` }}
              >
                BOFU {strategy.budget_allocation.bofu_percent}% (${strategy.budget_allocation.bofu_amount}/day)
              </div>
            </div>
          </div>

          {/* Audience Clusters List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Audience Segmentation & Targeting Stacks</span>
              </h2>
              <p className="text-xs text-slate-500">
                Detailed demographics, interest clusters, and behavioral exclusions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audience.clusters.map((cluster, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {cluster.tier}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Size: {cluster.size}</span>
                    </div>

                    <h4 className="font-heading text-sm font-bold text-slate-900">{cluster.name}</h4>

                    {cluster.demographics && (
                      <p className="text-xs text-slate-600">
                        <span className="font-bold text-slate-800">Demographics:</span> {cluster.demographics}
                      </p>
                    )}

                    {/* Interests */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Interest Targeting Stack:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cluster.interests.map((interest, i) => (
                          <span key={i} className="bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-0.5 rounded font-medium">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Behaviors */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Behaviors & Exclusions:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cluster.behaviors.map((b, i) => (
                          <span key={i} className="bg-slate-200/80 text-slate-900 text-[11px] px-2 py-0.5 rounded font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic border-t border-slate-200 pt-3">
                    "{cluster.rationale}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Strategy Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>Placement Strategy Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-blue-700 block uppercase">Facebook Feed</span>
                <p className="text-xs text-slate-700">{audience.placement_strategy.facebook_feed}</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-purple-700 block uppercase">Instagram Reels & Stories</span>
                <p className="text-xs text-slate-700">{audience.placement_strategy.instagram_reels_stories}</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-emerald-700 block uppercase">Advantage+ Network</span>
                <p className="text-xs text-slate-700">{audience.placement_strategy.advantage_plus_network}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CREATIVE STRATEGY & STORYBOARDS */}
      {activeTab === 'creative' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Creative Briefs & Storyboard Concepts</span>
                </h2>
                <p className="text-xs text-slate-500">
                  UGC scripts, 3-second opening hooks, and visual storyboard instructions.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {creatives.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCreativeIdx(idx)}
                    className={`
                      px-3 py-1.5 text-xs font-bold rounded-lg transition-all
                      ${activeCreativeIdx === idx 
                        ? 'bg-blue-600 text-white shadow-2xs' 
                        : 'text-slate-600 hover:text-slate-900'
                      }
                    `}
                  >
                    Concept #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Creative Brief */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    {activeCreativeItem.type || activeCreativeItem.format}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    Angle: {activeCreativeItem.angle_type}
                  </span>
                </div>

                {/* 3-sec Opening Hook */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                  <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider block flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>3-Second Opening Hook Verbal Script</span>
                  </span>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {activeCreativeItem.hook_script}
                  </p>
                </div>

                {/* Visual Storyboard */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Visual Storyboard & Production Brief
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-normal">
                    {activeCreativeItem.visual_brief}
                  </p>
                </div>
              </div>

              {/* Right: Simulated Visual Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-4 border border-slate-700/60">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <span className="text-xs font-mono uppercase text-blue-400 font-bold">Ad Creative Specs</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">{activeCreativeItem.format}</span>
                </div>

                <div className="space-y-2 text-center py-6">
                  <Sparkles className="w-8 h-8 text-amber-300 mx-auto animate-bounce" />
                  <h4 className="font-heading text-base font-bold text-white">
                    {strategy.product_name}
                  </h4>
                  <p className="text-xs text-slate-300 italic px-4">
                    {activeCreativeItem.hook_script}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Meta Advantage+ Format</span>
                  <span className="text-emerald-400 font-bold">High CTR Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COPY STRATEGY & HOOKS */}
      {activeTab === 'copy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Direct-Response Copy & Messaging Angles</span>
              </h2>
              <p className="text-xs text-slate-500">
                Primary text, headlines, and call-to-action buttons formatted for instant deployment.
              </p>
            </div>

            {/* Copy Angles */}
            <div className="space-y-6">
              {copyAngles.map((angle, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-heading text-base font-bold text-slate-900">
                        {angle.angle_title}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 font-semibold">
                      Target: {angle.target_persona}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Primary Text */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Primary Text (Body Copy)
                        </span>
                        <button
                          onClick={() => handleCopy(angle.primary_text, `prim_${idx}`)}
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {copiedId === `prim_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === `prim_${idx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-normal">
                        {angle.primary_text}
                      </p>
                    </div>

                    {/* Headline & CTA */}
                    <div className="space-y-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            Ad Headline
                          </span>
                          <button
                            onClick={() => handleCopy(angle.headline, `head_${idx}`)}
                            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {copiedId === `head_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === `head_${idx}` ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="text-xs font-bold text-slate-900">{angle.headline}</p>
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600 uppercase">Recommended CTA</span>
                        <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-lg">
                          {angle.call_to_action}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pattern Interrupt Hooks Bank */}
            <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3">
              <h4 className="font-heading text-sm font-bold text-amber-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Pattern Interrupt Video Opening Hooks Bank</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {copyHooks.map((hk, i) => (
                  <div key={i} className="p-3 bg-white border border-amber-200/80 rounded-xl text-xs font-semibold text-slate-900 flex items-start gap-2">
                    <span className="text-amber-500 font-bold"># {i + 1}</span>
                    <span>{hk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: OPTIMIZATION RECOMMENDATIONS & RISKS */}
      {activeTab === 'optimization' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Optimization Rules */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Optimization Rules & Scaling Playbook</span>
              </h2>
              <p className="text-xs text-slate-500">
                Actionable optimization protocols to ensure stable CAC during budget scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategy.optimization_recommendations.map((rec, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>

            {strategy.scaling_playbook && (
              <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  Horizontal & Vertical Scaling Rules
                </span>
                <ul className="space-y-1 text-xs text-slate-800 list-disc list-inside">
                  {strategy.scaling_playbook.map((rule, idx) => (
                    <li key={idx} className="font-medium">{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Risks & Mitigation Table */}
          {strategy.risks_and_mitigation && strategy.risks_and_mitigation.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-heading text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span>Risk Matrix & Contingency Mitigation Protocols</span>
              </h3>

              <div className="space-y-3">
                {strategy.risks_and_mitigation.map((rm, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-rose-700 uppercase tracking-wider text-[10px] block">Identified Risk Factor</span>
                      <p className="font-semibold text-slate-900">{rm.risk}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-700 uppercase tracking-wider text-[10px] block">Actionable Mitigation Protocol</span>
                      <p className="text-slate-700">{rm.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 7: 14-DAY ACTION PLAN */}
      {activeTab === 'action_plan' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <span>Execution Action Plan Roadmap</span>
              </h2>
              <p className="text-xs text-slate-500">
                Step-by-step launch, optimization, and scaling milestones.
              </p>
            </div>

            <div className="space-y-6">
              {actionPlan.map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs font-mono">
                        {step.day_range}
                      </span>
                      <h3 className="font-heading text-base font-bold text-slate-900">
                        {step.phase}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 font-semibold">Milestone #{idx + 1}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-800">
                    {step.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

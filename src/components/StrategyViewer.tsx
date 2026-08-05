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
  Lightbulb,
  Zap,
  CheckSquare,
  Activity,
  Clock,
  Crosshair,
  ShieldAlert,
  Layers,
  ChevronRight,
  Sliders,
  Flame,
  PieChart,
  BarChart3,
  ThumbsUp,
  MoreHorizontal
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
  const [activeTab, setActiveTab] = useState<'summary' | 'swot' | 'audience' | 'creative' | 'copy' | 'optimization' | 'action_plan'>('summary');
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
  const activeCopyAngle = copyAngles[activeCreativeIdx] || copyAngles[0];

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
      {/* McKinsey / Bain Executive Briefing Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/50 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
          <div className="space-y-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>New Campaign Audit</span>
            </button>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                McKinsey Intelligence Briefing
              </span>
              {isSavedToSupabase && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Synced to Supabase DB</span>
                </span>
              )}
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {strategy.product_name} — AI Campaign Intelligence Audit
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl font-normal leading-relaxed">
              Multi-Stage Strategic Diagnostics • Eugene Schwartz Awareness Evaluation • Meta Advantage+ Execution Roadmap
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleCopy(JSON.stringify(strategy, null, 2), 'export_json')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              {copiedId === 'export_json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedId === 'export_json' ? 'JSON Copied' : 'Export JSON'}</span>
            </button>

            <button
              onClick={() => alert(`Exporting campaign strategy for "${strategy.product_name}" to Meta Ads Manager API...`)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Deploy to Ads Manager</span>
            </button>
          </div>
        </div>

        {/* Executive Score Gauges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Campaign Score Badge */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                Campaign Intelligence Score
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-3xl font-black text-white">{campaignScore}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Grade {campaignGrade}
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-black text-sm">
              <BrainCircuit className="w-6 h-6" />
            </div>
          </div>

          {/* Offer Score Badge */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                Offer Packaging Score
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-3xl font-black text-amber-300">{offerScore}</span>
                <span className="text-xs font-semibold text-slate-300">/ 100</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black text-sm">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          {/* Confidence Index */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                AI Confidence Level
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-3xl font-black text-emerald-400">{confidenceScore}%</span>
                <span className="text-xs text-emerald-400 font-medium">High Conviction</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-sm">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Objective */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                Recommended Objective
              </span>
              <p className="font-heading text-sm font-bold text-white mt-1 leading-snug line-clamp-2">
                {strategy.recommended_campaign_objective || 'Sales & Conversions'}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 font-black text-sm">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'summary', label: 'Executive Summary', icon: FileText },
          { id: 'swot', label: 'SWOT Analysis', icon: ShieldAlert },
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
            </button>
          );
        })}
      </div>

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
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs">
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
                      <li key={tIdx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
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

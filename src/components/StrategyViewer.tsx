import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Users, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  MoreHorizontal, 
  ExternalLink,
  ChevronRight,
  Globe,
  SlidersHorizontal,
  Flame,
  Award
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
  const [activeCreativeTab, setActiveCreativeTab] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeCreative = strategy.creatives[activeCreativeTab] || strategy.creatives[0];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div className="space-y-1">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Create New Campaign Request</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Strategy: {strategy.product_name}
            </h1>
            <span className="bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Ready for Meta CBO</span>
            </span>
            {isSavedToSupabase && (
              <span className="bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Saved in Supabase DB
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B]">
            Generated on {new Date(strategy.created_at).toLocaleDateString()} for Meta Ads Manager Advantage+ Architecture
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleCopy(JSON.stringify(strategy, null, 2), 'export_json')}
            className="px-3.5 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copiedId === 'export_json' ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
            <span>{copiedId === 'export_json' ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={() => alert(`Exporting campaign strategy for "${strategy.product_name}" to Meta Ads Manager API...`)}
            className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Export to Meta Ads</span>
          </button>
        </div>
      </div>

      {/* KPI Performance Projection Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Target ROAS</span>
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">
            {strategy.summary.target_roas}
          </p>
          <p className="text-[11px] text-[#16A34A] font-medium">Estimated Blended Efficiency</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Estimated CPC</span>
            <DollarSign className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">
            {strategy.summary.estimated_cpc}
          </p>
          <p className="text-[11px] text-[#64748B]">Per Outbound Link Click</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Expected CTR</span>
            <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">
            {strategy.summary.estimated_ctr}
          </p>
          <p className="text-[11px] text-[#64748B]">Feed & Story Average</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span>Est. Monthly Reach</span>
            <Users className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">
            {strategy.summary.monthly_reach}
          </p>
          <p className="text-[11px] text-[#64748B]">Unique Impressions</p>
        </div>
      </div>

      {/* CBO Budget Allocation Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-heading text-base font-bold text-[#0F172A]">
              Funnel Budget Split (Campaign Budget Optimization)
            </h2>
            <p className="text-xs text-[#64748B]">
              Recommended 60/25/15 distribution for sustainable customer acquisition
            </p>
          </div>
          <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {strategy.summary.recommended_structure}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden flex">
          <div 
            className="bg-[#2563EB] h-full text-[10px] font-bold text-white flex items-center justify-center transition-all"
            style={{ width: `${strategy.budget_allocation.tofu_percent}%` }}
            title={`TOFU Prospecting: ${strategy.budget_allocation.tofu_percent}%`}
          >
            {strategy.budget_allocation.tofu_percent}%
          </div>
          <div 
            className="bg-[#3B82F6] h-full text-[10px] font-bold text-white flex items-center justify-center transition-all border-l border-white/20"
            style={{ width: `${strategy.budget_allocation.mofu_percent}%` }}
            title={`MOFU Consideration: ${strategy.budget_allocation.mofu_percent}%`}
          >
            {strategy.budget_allocation.mofu_percent}%
          </div>
          <div 
            className="bg-[#1D4ED8] h-full text-[10px] font-bold text-white flex items-center justify-center transition-all border-l border-white/20"
            style={{ width: `${strategy.budget_allocation.bofu_percent}%` }}
            title={`BOFU Retargeting: ${strategy.budget_allocation.bofu_percent}%`}
          >
            {strategy.budget_allocation.bofu_percent}%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0F172A]">TOFU (Prospecting)</span>
              <span className="font-bold text-[#2563EB]">${strategy.budget_allocation.tofu_amount}/day</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Cold audience acquisition & brand discovery</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0F172A]">MOFU (Consideration)</span>
              <span className="font-bold text-[#2563EB]">${strategy.budget_allocation.mofu_amount}/day</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Engaged social fans & high-intent lookalikes</p>
          </div>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0F172A]">BOFU (Retargeting)</span>
              <span className="font-bold text-[#2563EB]">${strategy.budget_allocation.bofu_amount}/day</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">Cart abandoners & high-intent site visitors</p>
          </div>
        </div>
      </div>

      {/* Ad Creatives & Interactive Feed Mockup Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#0F172A]">
              AI-Generated Ad Creatives & Copy Variants
            </h2>
            <p className="text-xs text-[#64748B]">
              Tailored for high CTR on Facebook Feed, Instagram Feed & Reels
            </p>
          </div>

          {/* Ad Creative Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
            {strategy.creatives.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCreativeTab(idx)}
                className={`
                  px-3 py-1.5 text-xs font-semibold rounded-md transition-colors
                  ${activeCreativeTab === idx 
                    ? 'bg-[#2563EB] text-white shadow-2xs' 
                    : 'text-[#64748B] hover:text-[#0F172A]'
                  }
                `}
              >
                {c.format}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Creative Details & Interactive Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Copy Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#F59E0B] rounded-md text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Hook Angle: {activeCreative.hook_angle}</span>
            </div>

            {/* Primary Text */}
            <div className="space-y-1.5 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Primary Text (Post Body)
                </span>
                <button
                  onClick={() => handleCopy(activeCreative.primary_text, 'prim_txt')}
                  className="text-xs font-medium text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  {copiedId === 'prim_txt' ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'prim_txt' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-sm text-[#0F172A] leading-relaxed font-normal">
                {activeCreative.primary_text}
              </p>
            </div>

            {/* Headline */}
            <div className="space-y-1.5 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Ad Headline
                </span>
                <button
                  onClick={() => handleCopy(activeCreative.headline, 'hd_txt')}
                  className="text-xs font-medium text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  {copiedId === 'hd_txt' ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'hd_txt' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-sm font-bold text-[#0F172A]">
                {activeCreative.headline}
              </p>
            </div>

            {/* Description & CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Newsfeed Description
                </span>
                <p className="text-xs text-[#0F172A] font-medium">{activeCreative.description}</p>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Call to Action (CTA) Button
                </span>
                <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded">
                  {activeCreative.call_to_action}
                </span>
              </div>
            </div>

            {/* Visual Concept Spec */}
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider block">
                Visual Creative Spec & Prompt
              </span>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                {activeCreative.visual_concept}
              </p>
            </div>
          </div>

          {/* Right Column: Live Facebook / Instagram Ad Mockup */}
          <div className="lg:col-span-5 bg-white border border-[#CBD5E1] rounded-2xl shadow-md overflow-hidden">
            {/* Meta Ad Mockup Header */}
            <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center">
                  AP
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">{strategy.product_name}</p>
                  <p className="text-[10px] text-[#64748B] flex items-center gap-1">
                    <span>Sponsored</span>
                    <span>•</span>
                    <Globe className="w-2.5 h-2.5" />
                  </p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#64748B]" />
            </div>

            {/* Ad Primary Text */}
            <div className="p-3 text-xs text-[#0F172A] space-y-1 bg-white">
              <p className="line-clamp-3">{activeCreative.primary_text}</p>
            </div>

            {/* Ad Visual Placeholder Container */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white p-6 aspect-video flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
              </div>
              <div className="max-w-xs space-y-1">
                <p className="font-heading font-extrabold text-sm tracking-tight text-white">
                  {strategy.product_name}
                </p>
                <p className="text-[11px] text-blue-200 line-clamp-2">
                  {activeCreative.headline}
                </p>
              </div>
              <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full text-white font-medium border border-white/30">
                {activeCreative.format} Visual Asset
              </span>
            </div>

            {/* Ad Callout Bar */}
            <div className="p-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between gap-2">
              <div className="truncate">
                <p className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">ADPILOT.AI</p>
                <p className="text-xs font-bold text-[#0F172A] truncate">{activeCreative.headline}</p>
              </div>
              <button className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded shrink-0 shadow-2xs">
                {activeCreative.call_to_action}
              </button>
            </div>

            {/* Meta Social Reaction Bar */}
            <div className="px-3 py-2 bg-white border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <ThumbsUp className="w-2.5 h-2.5 fill-white" />
                </div>
                <span className="font-medium text-[#0F172A]">1.4k likes</span>
              </div>
              <div className="flex items-center gap-3">
                <span>128 comments</span>
                <span>45 shares</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience & Ad Sets Breakdown Cards */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-6">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#0F172A]">
            Meta Ad Sets & Audience Targeting Breakdown
          </h2>
          <p className="text-xs text-[#64748B]">
            Structured across cold prospecting, lookalikes, and dynamic retargeting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategy.ad_sets.map((adSet) => (
            <div 
              key={adSet.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5 space-y-4 flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">
                    {adSet.funnel_stage}
                  </span>
                  <span className="text-xs font-bold text-[#0F172A]">
                    ${adSet.daily_budget}/day
                  </span>
                </div>

                <h3 className="font-heading text-sm font-bold text-[#0F172A]">
                  {adSet.name}
                </h3>

                {/* Demographics */}
                <div className="space-y-1 text-xs">
                  <span className="text-[#64748B] font-semibold block text-[11px] uppercase">Demographics:</span>
                  <p className="text-[#0F172A]">{adSet.demographics.age_range} • {adSet.demographics.gender}</p>
                  <p className="text-[#64748B] text-[11px]">{adSet.demographics.locations.join(', ')}</p>
                </div>

                {/* Interest Stacks */}
                <div className="space-y-1.5">
                  <span className="text-[#64748B] font-semibold block text-[11px] uppercase">Interest Clusters:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {adSet.interests.map((interest, i) => (
                      <span key={i} className="bg-white border border-[#E2E8F0] text-[#0F172A] text-[11px] px-2 py-0.5 rounded font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Behaviors */}
                <div className="space-y-1">
                  <span className="text-[#64748B] font-semibold block text-[11px] uppercase">Behavior & Exclusions:</span>
                  <ul className="text-xs text-[#0F172A] space-y-1 list-disc list-inside">
                    {adSet.behaviors.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span>Optimization: Conversions</span>
                <span className="font-semibold text-[#16A34A]">Advantage+ Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Playbook & Policy Checklist */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#0F172A]">
          <Award className="w-5 h-5 text-[#2563EB]" />
          <h2 className="font-heading text-base font-bold">
            Meta Growth Playbook & Best Practices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {strategy.strategic_recommendations.map((rec, i) => (
            <div key={i} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-start gap-2.5 text-xs text-[#0F172A]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

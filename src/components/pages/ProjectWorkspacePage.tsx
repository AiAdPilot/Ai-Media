import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  Target, 
  PenTool, 
  Palette, 
  Send, 
  BarChart3, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sliders, 
  Gauge, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Flame, 
  Play, 
  Share2, 
  Layers, 
  RefreshCw,
  Globe,
  DollarSign
} from 'lucide-react';
import { ProjectWorkspaceTab, CampaignRequest, CampaignStrategy } from '../../types';
import { generateStrategyFromRequest } from '../../lib/strategyGenerator';

interface ProjectWorkspacePageProps {
  project: CampaignRequest;
  onBackToProjects: () => void;
  onUpdateProject?: (updated: CampaignRequest) => void;
}

export const ProjectWorkspacePage: React.FC<ProjectWorkspacePageProps> = ({
  project,
  onBackToProjects,
  onUpdateProject,
}) => {
  const [activeTab, setActiveTab] = useState<ProjectWorkspaceTab>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Local editable brief state
  const [briefForm, setBriefForm] = useState<CampaignRequest>(project);

  // Generate or derive strategy
  const strategy: CampaignStrategy = generateStrategyFromRequest(briefForm);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProject) {
      onUpdateProject(briefForm);
    }
    alert('Campaign Brief updated! AI strategy recalculated.');
  };

  const handlePublishMeta = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 1200);
  };

  const workspaceTabs: { id: ProjectWorkspaceTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'campaign_brief', label: 'Campaign Brief', icon: FileText },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'ad_copy', label: 'Ad Copy', icon: PenTool },
    { id: 'creative_studio', label: 'Creative Studio', icon: Palette },
    { id: 'publishing', label: 'Publishing', icon: Send },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Workspace Top Header Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-2">
            <button
              onClick={onBackToProjects}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                {briefForm.campaign_goal}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Score: {strategy.scores?.campaign_score || 88}/100
              </span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {briefForm.product_name}
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl font-normal leading-relaxed">
              {briefForm.product_description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleCopy(JSON.stringify(strategy, null, 2), 'export_workspace')}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              {copiedId === 'export_workspace' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copiedId === 'export_workspace' ? 'Copied' : 'Export Brief'}</span>
            </button>

            <button
              onClick={() => setActiveTab('publishing')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish to Meta</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Line */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-100">
          {workspaceTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all shrink-0
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-2xs font-bold' 
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                  }
                `}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Executive Summary Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                <span>Strategic Campaign Readiness Audit</span>
              </h2>
              <span className="font-stats text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Readiness Score: 88/100
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {strategy.executive_summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Target ROAS</span>
                <span className="font-stats text-xl font-bold text-slate-900">3.8x ROAS</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Est. Cost Per Acquisition</span>
                <span className="font-stats text-xl font-bold text-slate-900">$24.50 CPA</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Daily Budget Velocity</span>
                <span className="font-stats text-xl font-bold text-slate-900">${briefForm.daily_budget}/day</span>
              </div>
            </div>
          </div>

          {/* Priority Fixes List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Priority Pre-Launch Recommendations</span>
            </h3>

            <div className="space-y-3">
              {(strategy.priority_fixes || []).map((fix, idx) => (
                <div key={idx} className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-slate-900">{fix.title}</h4>
                    </div>
                    <span className="font-stats text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {fix.estimated_roas_improvement}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fix.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGN BRIEF */}
      {activeTab === 'campaign_brief' && (
        <form onSubmit={handleBriefSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Campaign Brief Parameters</h2>
            <p className="text-xs text-slate-500">Edit product specifications to update campaign messaging and strategy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Product / Service Name</label>
              <input
                type="text"
                value={briefForm.product_name}
                onChange={(e) => setBriefForm({ ...briefForm, product_name: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-body"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Landing Page URL</label>
              <input
                type="url"
                value={briefForm.landing_page_url}
                onChange={(e) => setBriefForm({ ...briefForm, landing_page_url: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-body"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Product Core Value Proposition</label>
              <textarea
                rows={3}
                value={briefForm.product_description}
                onChange={(e) => setBriefForm({ ...briefForm, product_description: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-body"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Price Point ($ USD)</label>
              <input
                type="text"
                value={briefForm.product_price}
                onChange={(e) => setBriefForm({ ...briefForm, product_price: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Daily Ad Budget ($ USD)</label>
              <input
                type="text"
                value={briefForm.daily_budget}
                onChange={(e) => setBriefForm({ ...briefForm, daily_budget: e.target.value })}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update Brief & Recalculate AI Strategy</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: STRATEGY */}
      {activeTab === 'strategy' && (
        <div className="space-y-8 animate-fadeIn">
          {/* SWOT Matrix */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>SWOT Strategic Matrix</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
                <h3 className="font-heading text-sm font-bold text-emerald-900">Strengths</h3>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {strategy.swot_analysis.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-3">
                <h3 className="font-heading text-sm font-bold text-rose-900">Weaknesses</h3>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {strategy.swot_analysis.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-3">
                <h3 className="font-heading text-sm font-bold text-blue-900">Opportunities</h3>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {strategy.swot_analysis.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3">
                <h3 className="font-heading text-sm font-bold text-amber-900">Threats</h3>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {strategy.swot_analysis.threats.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AD COPY */}
      {activeTab === 'ad_copy' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900">Direct Response Ad Copy Angles</h2>
                <p className="text-xs text-slate-500">High-converting primary text and headline options for Meta feeds.</p>
              </div>
            </div>

            <div className="space-y-6">
              {(strategy.messaging_strategy?.angles || []).map((angle, idx) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <span className="text-xs font-bold font-mono text-slate-900 uppercase">
                      Angle #{idx + 1}: {angle.angle_title}
                    </span>
                    <button
                      onClick={() => handleCopy(`${angle.headline}\n\n${angle.primary_text}`, `copy_${idx}`)}
                      className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
                    >
                      {copiedId === `copy_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedId === `copy_${idx}` ? 'Copied' : 'Copy All Text'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Headline</span>
                      <p className="font-heading text-sm font-bold text-slate-900">{angle.headline}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Primary Text</span>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{angle.primary_text}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Call To Action</span>
                      <span className="inline-block px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold mt-1">
                        {angle.call_to_action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CREATIVE STUDIO */}
      {activeTab === 'creative_studio' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading text-lg font-bold text-slate-900">Creative Visual Concepts & UGC Video Briefs</h2>
              <p className="text-xs text-slate-500">Short-form video hook scripts and visual concept layouts for Meta Reels and Feed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(strategy.creative_strategy || []).map((creative, idx) => (
                <div key={idx} className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-700">
                      {creative.format || creative.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Angle: {creative.angle_type}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">3-Sec Pattern Interrupt Hook</span>
                    <p className="font-heading text-sm font-bold text-slate-900">{creative.hook_script}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Visual Concept Brief</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{creative.visual_brief}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PUBLISHING */}
      {activeTab === 'publishing' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Meta Ads Manager Publishing Setup</h2>
            <p className="text-xs text-slate-500">Review parameters and push campaign structure to Meta Advantage+ Ads API.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Target Objective</span>
              <span className="font-bold text-sm text-slate-900">{briefForm.campaign_goal} (Conversion)</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">CBO Daily Budget</span>
              <span className="font-stats font-bold text-sm text-slate-900">${briefForm.daily_budget}/day</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Server CAPI Tracking</span>
              <span className="font-stats font-bold text-sm text-emerald-600">Active (EMQ 8.8)</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-white">Deploy to Meta Advantage+ Ads API</h3>
                  <p className="text-xs text-slate-400">Account: act_82940291 (Acme Growth Labs)</p>
                </div>
              </div>

              {isPublished && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Published to Meta
                </span>
              )}
            </div>

            <button
              onClick={handlePublishMeta}
              disabled={isPublishing || isPublished}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heading text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <span>Pushing Campaign to Meta API...</span>
              ) : isPublished ? (
                <span>Campaign Active in Meta Ads Manager</span>
              ) : (
                <>
                  <span>Publish Campaign Now</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TAB 7: PERFORMANCE */}
      {activeTab === 'performance' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Performance Metrics Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Spend</span>
              <span className="font-stats text-2xl font-bold text-slate-900">$1,250.00</span>
              <span className="text-[11px] text-slate-400 font-mono block">Meta CBO Active</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Impressions</span>
              <span className="font-stats text-2xl font-bold text-slate-900">48,290</span>
              <span className="text-[11px] text-emerald-600 font-mono block">CPM: $25.88</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Click-Through Rate</span>
              <span className="font-stats text-2xl font-bold text-slate-900">2.84%</span>
              <span className="text-[11px] text-emerald-600 font-mono block">+0.64% vs category</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Current ROAS</span>
              <span className="font-stats text-2xl font-bold text-emerald-600">3.92x</span>
              <span className="text-[11px] text-slate-400 font-mono block">Target: 3.50x</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900">Scaling & Optimization Playbook</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {(strategy.scaling_playbook || [
                'Increase CBO budget by 20% every 48 hours while ROAS > 3.2x',
                'Refresh video UGC hooks bi-weekly to prevent ad fatigue',
                'Scale Lookalike 3% and 5% audiences as pixel events exceed 100 conversions'
              ]).map((step, i) => (
                <li key={i} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

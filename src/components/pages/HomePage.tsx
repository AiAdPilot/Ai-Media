import React from 'react';
import { 
  Plus, 
  FolderKanban, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Gauge, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CampaignRequest } from '../../types';

interface HomePageProps {
  onNewProject: () => void;
  onSelectProject: (req: CampaignRequest) => void;
  onNavigateToAI: () => void;
  onNavigateToProjects: () => void;
  recentRequests: CampaignRequest[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNewProject,
  onSelectProject,
  onNavigateToAI,
  onNavigateToProjects,
  recentRequests,
}) => {
  // Sample fallback requests if empty
  const defaultProjects: CampaignRequest[] = recentRequests.length > 0 ? recentRequests : [
    {
      id: 'proj_1',
      product_name: 'Aura Wireless Noise-Canceling Earbuds',
      product_description: 'Premium audiophile wireless earbuds with active noise cancellation and 36h battery.',
      product_price: 199,
      landing_page_url: 'https://aurasound.com/pro',
      campaign_goal: 'Sales',
      daily_budget: 250,
      target_country: 'United States',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'proj_2',
      product_name: 'SaaS Metrics Hub Pro',
      product_description: 'Real-time financial analytics and churn reduction engine for B2B SaaS teams.',
      product_price: 299,
      landing_page_url: 'https://saasmetricshub.io',
      campaign_goal: 'Leads',
      daily_budget: 150,
      target_country: 'United States',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: 'proj_3',
      product_name: 'LuxeGlow Botanical Serum',
      product_description: 'Organic age-defying botanical face serum with cold-pressed hyaluronic acid.',
      product_price: 85,
      landing_page_url: 'https://luxeglowbeauty.com',
      campaign_goal: 'Sales',
      daily_budget: 100,
      target_country: 'United Kingdom',
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Acme Growth Labs
            </span>
            <span className="text-xs text-slate-400 font-mono">• Meta Advantage+ Active</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AdPilot Campaign Intelligence Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Automated strategy diagnostic engine, direct-response copy studio, and creative hooks for high-performance Meta advertising.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToAI}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Copilot Chat</span>
          </button>
          <button
            onClick={onNewProject}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Campaign Project</span>
          </button>
        </div>
      </div>

      {/* High-Signal Metrics Grid (IBM Plex Mono typography for statistics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Projects
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-stats text-2xl font-bold text-slate-900 tracking-tight">
              {defaultProjects.length}
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +2 this week
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Meta CBO structure ready</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Target Portfolio ROAS
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-stats text-2xl font-bold text-slate-900 tracking-tight">
              3.85x
            </span>
            <span className="text-[11px] font-mono font-medium text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +0.45x vs baseline
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Model accuracy threshold: 94%</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Avg Readiness Score
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-stats text-2xl font-bold text-slate-900 tracking-tight">
              88/100
            </span>
            <span className="text-[11px] font-mono font-medium text-indigo-600">
              High Potential
            </span>
          </div>
          <p className="text-[11px] text-slate-400">10-point audit completed</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Daily Managed Spend
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-stats text-2xl font-bold text-slate-900 tracking-tight">
              $500<span className="text-xs font-normal text-slate-400">/day</span>
            </span>
            <span className="text-[11px] font-mono font-medium text-blue-600">
              Advantage+
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Learning phase optimal</p>
        </div>
      </div>

      {/* Main Content Area: Recent Projects & AI Quick Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Projects Table/Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg font-bold text-slate-900">
                Recent Campaign Projects
              </h2>
              <p className="text-xs text-slate-500">
                Select a project to open its dedicated Project Workspace.
              </p>
            </div>

            <button
              onClick={onNavigateToProjects}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] divide-y divide-slate-100">
            {defaultProjects.map((req) => (
              <div
                key={req.id || req.product_name}
                onClick={() => onSelectProject(req)}
                className="p-5 hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {req.product_name}
                    </span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {req.campaign_goal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                    {req.product_description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-0.5">
                    <span>Target: {req.target_country}</span>
                    <span>•</span>
                    <span>Budget: ${req.daily_budget}/day</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 block font-mono">
                      88/100 Readiness
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      Advantage+ Ready
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-500 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Assistant Bar & Workspace Status */}
        <div className="space-y-6">
          {/* AI Quick Strategy Assistant Card */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white">AI Strategy Copilot</h3>
                <p className="text-[11px] text-slate-400">Ask any Meta campaign question</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              "How can I reduce cold traffic CPMs for high-ticket eCommerce products in the United States?"
            </p>

            <button
              onClick={onNavigateToAI}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-heading text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Launch AI Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* System & API Status */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              System Connections
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Meta Marketing API v21.0</span>
                <span className="flex items-center gap-1 text-emerald-600 font-mono font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Server-Side CAPI Tracking</span>
                <span className="flex items-center gap-1 text-emerald-600 font-mono font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> EMQ 8.8/10
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Gemini 2.5 Strategy Engine</span>
                <span className="flex items-center gap-1 text-emerald-600 font-mono font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

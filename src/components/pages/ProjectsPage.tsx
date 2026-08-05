import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FolderKanban, 
  ExternalLink, 
  ArrowRight, 
  Gauge, 
  DollarSign, 
  Globe, 
  Clock, 
  Sparkles,
  Layers,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { CampaignRequest } from '../../types';

interface ProjectsPageProps {
  requests: CampaignRequest[];
  onSelectProject: (req: CampaignRequest) => void;
  onNewProjectClick: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  requests,
  onSelectProject,
  onNewProjectClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<string>('all');

  // Fallback demo requests if empty
  const allProjects: CampaignRequest[] = requests.length > 0 ? requests : [
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
    {
      id: 'proj_4',
      product_name: 'ZenFit Ergonomic Active Desk',
      product_description: 'Motorized standing desk with walnut finish and built-in cable management.',
      product_price: 650,
      landing_page_url: 'https://zenfitdesk.co',
      campaign_goal: 'Sales',
      daily_budget: 300,
      target_country: 'Germany',
      created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    },
  ];

  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch = p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.product_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGoal = selectedGoalFilter === 'all' || p.campaign_goal.toLowerCase() === selectedGoalFilter.toLowerCase();
    return matchesSearch && matchesGoal;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Campaign Projects
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Manage your AI campaign briefs, audience strategies, and Meta Advantage+ ad sets.
          </p>
        </div>

        <button
          onClick={onNewProjectClick}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter projects by name or keyword..."
            className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-all font-body"
          />
        </div>

        {/* Goal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Sales', 'Leads', 'Traffic', 'Engagement'].map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoalFilter(goal)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap capitalize ${
                selectedGoalFilter === goal
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {goal === 'all' ? 'All Goals' : goal}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id || project.product_name}
            onClick={() => onSelectProject(project)}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
          >
            {/* Top Row: Title & Goal Badge */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {project.campaign_goal}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  88/100 Readiness
                </span>
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {project.product_name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal leading-relaxed">
                  {project.product_description}
                </p>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-body">Daily Budget</span>
                  <span className="font-bold text-slate-900">${project.daily_budget}/day</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-body">Target Market</span>
                  <span className="font-bold text-slate-900">{project.target_country}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Updated 2h ago
                </span>

                <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

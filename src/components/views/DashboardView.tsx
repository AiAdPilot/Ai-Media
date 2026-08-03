import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Megaphone, 
  Plus, 
  CheckCircle2, 
  BarChart2, 
  Activity,
  Layers
} from 'lucide-react';
import { CampaignRequest } from '../../types';

interface DashboardViewProps {
  onNewStrategyClick: () => void;
  recentRequests: CampaignRequest[];
  onSelectRequest: (req: CampaignRequest) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNewStrategyClick,
  recentRequests,
  onSelectRequest,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-[12px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AdPilot AI v2.4 Active</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
            Scale Meta Ads with Precision Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Generate Facebook & Instagram campaign strategies, Advantage+ interest clusters, and converting ad copies in seconds.
          </p>
        </div>

        <button
          onClick={onNewStrategyClick}
          className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New AI Strategy</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-medium">Total Ad Spend (30d)</span>
            <DollarSign className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">$14,280.00</p>
          <p className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-medium">Average ROAS</span>
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">3.84x</p>
          <p className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+0.42x Advantage+ optimization</span>
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-medium">Generated Strategies</span>
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">
            {recentRequests.length > 0 ? recentRequests.length : 12}
          </p>
          <p className="text-[11px] text-[#64748B]">Saved in database</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-medium">Meta API Health</span>
            <Activity className="w-4 h-4 text-[#16A34A]" />
          </div>
          <p className="font-heading text-2xl font-extrabold text-[#16A34A]">Optimal</p>
          <p className="text-[11px] text-[#64748B]">Match score: 9.2/10</p>
        </div>
      </div>

      {/* Performance Chart Simulation & Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: ROAS Performance Overview */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-base font-bold text-[#0F172A]">
                Blended ROAS & Ad Spend Trend
              </h2>
              <p className="text-xs text-[#64748B]">Facebook Feed vs Instagram Reels performance</p>
            </div>
            <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded">
              Last 30 Days
            </span>
          </div>

          {/* Bar Chart Mockup */}
          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-[#E2E8F0]">
            {[
              { day: 'Mon', height: '60%', roas: '3.2x' },
              { day: 'Tue', height: '75%', roas: '3.6x' },
              { day: 'Wed', height: '90%', roas: '4.1x' },
              { day: 'Thu', height: '65%', roas: '3.4x' },
              { day: 'Fri', height: '85%', roas: '3.9x' },
              { day: 'Sat', height: '95%', roas: '4.3x' },
              { day: 'Sun', height: '70%', roas: '3.5x' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <span className="text-[10px] font-bold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.roas}
                </span>
                <div 
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] rounded-t transition-all duration-300"
                  style={{ height: bar.height }}
                />
                <span className="text-[11px] text-[#64748B] font-medium">{bar.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                Facebook Feed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span>
                Instagram Reels
              </span>
            </div>
            <span className="font-semibold text-[#0F172A]">Average CPA: $24.12</span>
          </div>
        </div>

        {/* Right Column: Recent Saved Strategies */}
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-[#0F172A]">
              Recent Strategies
            </h2>
            <button 
              onClick={onNewStrategyClick}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              + Create
            </button>
          </div>

          <div className="space-y-3">
            {recentRequests.length > 0 ? (
              recentRequests.slice(0, 4).map((req, idx) => (
                <div
                  key={req.id || idx}
                  onClick={() => onSelectRequest(req)}
                  className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-blue-300 rounded-lg cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F172A] truncate max-w-[160px]">
                      {req.product_name}
                    </span>
                    <span className="text-[10px] font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                      {req.campaign_goal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>${req.daily_budget}/day</span>
                    <span>{req.target_country}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-[#64748B] space-y-2 border border-dashed border-[#E2E8F0] rounded-lg">
                <Megaphone className="w-6 h-6 text-[#64748B] mx-auto opacity-50" />
                <p>No campaign strategies created yet.</p>
                <button
                  onClick={onNewStrategyClick}
                  className="text-xs text-[#2563EB] font-semibold underline"
                >
                  Generate your first strategy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

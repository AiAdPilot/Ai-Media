import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Plus, 
  ExternalLink, 
  Database, 
  CheckCircle2, 
  Calendar, 
  DollarSign,
  Globe,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';
import { CampaignRequest } from '../../types';

interface CampaignsViewProps {
  requests: CampaignRequest[];
  onSelectRequest: (req: CampaignRequest) => void;
  onNewCampaignClick: () => void;
  isSupabaseConnected: boolean;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  requests,
  onSelectRequest,
  onNewCampaignClick,
  isSupabaseConnected,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<string>('ALL');

  const filtered = requests.filter((req) => {
    const matchesSearch = 
      req.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.product_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.target_country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGoal = selectedGoalFilter === 'ALL' || req.campaign_goal === selectedGoalFilter;

    return matchesSearch && matchesGoal;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
              Campaign Requests & Strategies
            </h1>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
              isSupabaseConnected 
                ? 'bg-emerald-50 text-[#16A34A] border-emerald-200' 
                : 'bg-amber-50 text-[#F59E0B] border-amber-200'
            }`}>
              {isSupabaseConnected ? 'Supabase DB Table: campaign_requests' : 'Local Persistence'}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your AI campaign requests, saved target audiences, and generated ad copy strategies.
          </p>
        </div>

        <button
          onClick={onNewCampaignClick}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Strategy Request</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, country..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2 text-xs text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#64748B]" />
          <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0] text-xs">
            {['ALL', 'Sales', 'Leads', 'Traffic', 'Engagement'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoalFilter(goal)}
                className={`
                  px-2.5 py-1 font-semibold rounded transition-colors
                  ${selectedGoalFilter === goal 
                    ? 'bg-[#2563EB] text-white shadow-2xs' 
                    : 'text-[#64748B] hover:text-[#0F172A]'
                  }
                `}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Request Table / Grid */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] shadow-xs overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Goal</th>
                  <th className="py-3.5 px-4">Daily Budget</th>
                  <th className="py-3.5 px-4">Target Country</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {filtered.map((req, i) => (
                  <tr key={req.id || i} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-blue-50 text-[#2563EB] font-bold text-xs flex items-center justify-center shrink-0">
                          {req.product_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#0F172A]">{req.product_name}</p>
                          <p className="text-[10px] text-[#64748B] truncate max-w-[200px]">
                            {req.landing_page_url}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 bg-blue-50 border border-blue-100 text-[#2563EB] text-[11px] font-semibold rounded">
                        {req.campaign_goal}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#0F172A]">
                      ${req.daily_budget}/day
                    </td>

                    <td className="py-3.5 px-4 text-[#0F172A] font-medium">
                      {req.target_country}
                    </td>

                    <td className="py-3.5 px-4 text-[#0F172A]">
                      ${req.product_price}
                    </td>

                    <td className="py-3.5 px-4 text-[#64748B] text-[11px]">
                      {req.created_at ? new Date(req.created_at).toLocaleDateString() : 'Just now'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectRequest(req)}
                        className="px-3 py-1.5 bg-white border border-[#E2E8F0] hover:bg-blue-50 hover:border-blue-200 text-[#2563EB] font-semibold rounded text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Strategy</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Megaphone className="w-8 h-8 text-[#64748B] mx-auto opacity-40" />
            <h3 className="font-heading text-sm font-bold text-[#0F172A]">No Campaign Requests Found</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Start by creating an AI Campaign Strategy request for your product or brand.
            </p>
            <button
              onClick={onNewCampaignClick}
              className="px-4 py-2 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              Generate Strategy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

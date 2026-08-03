import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ArrowUpRight, Globe, Layers } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
          Meta Ads Analytics & Channel Breakdown
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Deep performance attribution for Facebook vs Instagram placements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#64748B]">Facebook Feed Placement</span>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">$8,450 Spend</p>
          <div className="flex items-center justify-between text-xs pt-2 text-[#0F172A]">
            <span>ROAS: <strong className="text-[#16A34A]">4.12x</strong></span>
            <span>CTR: <strong>2.8%</strong></span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#64748B]">Instagram Feed Placement</span>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">$4,220 Spend</p>
          <div className="flex items-center justify-between text-xs pt-2 text-[#0F172A]">
            <span>ROAS: <strong className="text-[#16A34A]">3.65x</strong></span>
            <span>CTR: <strong>2.3%</strong></span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-[#64748B]">Instagram Reels / Stories</span>
          <p className="font-heading text-2xl font-extrabold text-[#0F172A]">$1,610 Spend</p>
          <div className="flex items-center justify-between text-xs pt-2 text-[#0F172A]">
            <span>ROAS: <strong className="text-[#16A34A]">3.20x</strong></span>
            <span>CTR: <strong>3.4%</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Zap, Lightbulb } from 'lucide-react';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white border-l border-[#E2E8F0] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-100 text-[#2563EB] rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-[#0F172A]">AI Growth Copilot</h2>
                <p className="text-xs text-[#64748B]">Real-time Meta Ads intelligence & policy audit</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Tip Card */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#2563EB] font-semibold text-xs">
                <Zap className="w-4 h-4" />
                <span>Strategy Tip for 2026</span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                Meta's Advantage+ algorithm now prioritizes creative diversification over tight interest narrowing. Having 3–5 distinct visual angles yields 34% lower CPL.
              </p>
            </div>

            {/* Benchmark Standards */}
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Industry Benchmarks
              </h3>
              <div className="space-y-2.5">
                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#0F172A]">Average SaaS CTR</p>
                    <p className="text-[11px] text-[#64748B]">Facebook & Instagram Feed</p>
                  </div>
                  <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-2 py-1 rounded">2.14%</span>
                </div>

                <div className="p-3 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#0F172A]">Target Return on Ad Spend</p>
                    <p className="text-[11px] text-[#64748B]">Blended Meta CAC Efficiency</p>
                  </div>
                  <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-1 rounded">3.50x</span>
                </div>
              </div>
            </div>

            {/* Compliance & Policy Safeguard */}
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Meta Ad Policy Guardrails
              </h3>
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#0F172A]">
                    <strong>Personal Attributes:</strong> Avoid "Are you..." statements that single out sensitive traits.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
                  <p className="text-xs text-[#0F172A]">
                    <strong>Claims & Guarantees:</strong> Use "designed to help" instead of absolute outcome guarantees.
                  </p>
                </div>
              </div>
            </div>

            {/* Prompt Helper */}
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
                Prompt Quality Meter
              </h3>
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0F172A]">Description Detail Score</span>
                  <span className="font-bold text-[#16A34A]">High Quality</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#16A34A] h-full w-[88%]" />
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Adding specific price points and target country improves audience targeting accuracy by 45%.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
            <button
              onClick={onClose}
              className="w-full py-2 bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs rounded-lg hover:bg-slate-50 transition-colors"
            >
              Close Intelligence Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

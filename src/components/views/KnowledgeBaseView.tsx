import React from 'react';
import { BookOpen, ShieldCheck, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  const articles = [
    {
      title: 'Meta Advantage+ Budget Optimization (CBO) Best Practices 2026',
      tag: 'CBO Strategy',
      readTime: '4 min read',
      summary: 'Learn how machine learning distributes daily spend across cold TOFU, lookalike MOFU, and retargeting BOFU ad sets for maximum profit margin.',
    },
    {
      title: 'Meta Advertising Policy: Avoiding Personal Attribute Violations',
      tag: 'Policy Safeguards',
      readTime: '6 min read',
      summary: 'Essential rules on phrasing headline hooks, body copy compliance, and landing page disclosure standards to prevent account suspension.',
    },
    {
      title: 'Conversions API (CAPI) & Server Match Quality Optimization',
      tag: 'Tracking & Pixel',
      readTime: '5 min read',
      summary: 'How to achieve Server-Side Match Quality scores above 8.5/10 to restore lost attribution signal post-iOS privacy updates.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
          Meta Advertising Knowledge Base & Policy Playbooks
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Master Meta ad compliance, CBO scaling principles, and creative testing frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art, i) => (
          <div key={i} className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-3 flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {art.tag}
                </span>
                <span className="text-[#64748B]">{art.readTime}</span>
              </div>
              <h2 className="font-heading text-sm font-bold text-[#0F172A] leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {art.summary}
              </p>
            </div>

            <button className="text-xs font-semibold text-[#2563EB] hover:underline text-left pt-2">
              Read Guide →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

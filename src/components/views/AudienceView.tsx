import React from 'react';
import { Users, Target, Compass, Search, ChevronRight, CheckCircle2 } from 'lucide-react';

export const AudienceView: React.FC = () => {
  const clusters = [
    {
      title: 'B2B Growth & Performance Marketers',
      size: '4.2M – 5.1M People',
      country: 'United States',
      interests: ['Growth Hacking', 'Facebook Ads Manager', 'Digital Marketing', 'Conversion Rate Optimization', 'SaaS Leaders'],
      matchScore: '96%',
    },
    {
      title: 'eCommerce Founders & Shopify Sellers',
      size: '2.8M – 3.4M People',
      country: 'United States & Canada',
      interests: ['Shopify', 'eCommerce Strategy', 'Direct-to-Consumer', 'Online Shopping', 'Klaviyo'],
      matchScore: '92%',
    },
    {
      title: 'High Household Income Tech Adopters',
      size: '6.5M – 7.8M People',
      country: 'Global Tier 1',
      interests: ['Consumer Tech', 'Premium Subscriptions', 'Gadgets', 'Early Adopters'],
      matchScore: '89%',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
          Audience Intelligence & Interest Research
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Explore high-converting Meta interest stacks and lookalike source audiences.
        </p>
      </div>

      <div className="space-y-4">
        {clusters.map((c, idx) => (
          <div key={idx} className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-300 transition-colors">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-base font-bold text-[#0F172A]">{c.title}</h2>
                <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {c.matchScore} Match
                </span>
              </div>
              <p className="text-xs text-[#64748B]">{c.country} • Audience size: {c.size}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.interests.map((int, i) => (
                  <span key={i} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-xs px-2.5 py-1 rounded font-medium">
                    {int}
                  </span>
                ))}
              </div>
            </div>

            <button className="px-4 py-2 bg-white border border-[#E2E8F0] hover:bg-blue-50 text-[#2563EB] font-semibold text-xs rounded-lg transition-colors shrink-0">
              Use Audience Stack
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

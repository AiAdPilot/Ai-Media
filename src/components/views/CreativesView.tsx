import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Image, Play, ThumbsUp, MessageSquare } from 'lucide-react';

export const CreativesView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const adCopyTemplates = [
    {
      id: 'copy_1',
      format: 'Facebook Feed',
      angle: 'Problem-Agitation Angle',
      headline: 'Stop Wasting Meta Ad Budget on Cold Audiences.',
      text: 'Most marketers struggle with declining Meta ROAS. AdPilot AI synthesizes Advantage+ audience lookalikes and high-CTR copy variants so you convert cold traffic faster.',
      cta: 'Learn More',
    },
    {
      id: 'copy_2',
      format: 'Instagram Story / Reel',
      angle: 'Social Proof Showcase',
      headline: '1,200+ Growth Teams Switched to AdPilot AI.',
      text: 'Want scalable Facebook & Instagram ad copy without spending 20 hours drafting? Claim your risk-free campaign audit today.',
      cta: 'Get Offer',
    },
    {
      id: 'copy_3',
      format: 'Instagram Feed',
      angle: 'Comparison Angle',
      headline: 'Manual Setup vs. AI-Powered Advantage+ CBO',
      text: 'Why manually test 50 audience combinations when machine learning can cluster high-intent buyers in 3 minutes?',
      cta: 'Shop Now',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
          Ad Creatives & Copy Engine
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Pre-approved Meta ad copy frameworks and visual specs designed for maximum CTR.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adCopyTemplates.map((item) => (
          <div key={item.id} className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded border border-blue-100">
                  {item.format}
                </span>
                <span className="text-[10px] font-semibold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded">
                  Advantage+ Ready
                </span>
              </div>

              <span className="text-xs text-[#64748B] font-semibold block">{item.angle}</span>
              <h2 className="font-heading text-sm font-bold text-[#0F172A]">{item.headline}</h2>
              <p className="text-xs text-[#0F172A] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                {item.text}
              </p>
            </div>

            <button
              onClick={() => handleCopy(`${item.headline}\n\n${item.text}`, item.id)}
              className="w-full py-2 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] text-[#0F172A] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 mt-4"
            >
              {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
              <span>{copiedId === item.id ? 'Copied' : 'Copy Ad Copy'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

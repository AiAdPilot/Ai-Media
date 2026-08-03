import React from 'react';
import { ShoppingBag, Plus, Sparkles, ExternalLink, Tag, DollarSign } from 'lucide-react';

interface ProductsViewProps {
  onQuickGenerate: (productName: string, description: string, price: string, url: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ onQuickGenerate }) => {
  const products = [
    {
      id: 'prod_1',
      name: 'AdPilot AI Pro',
      category: 'B2B SaaS / Growth Tech',
      price: '149.00',
      url: 'https://adpilot.ai/pro',
      description: 'AI advertising automation platform for Facebook & Instagram that generates campaign strategies, ad copy, and interest clusters.',
    },
    {
      id: 'prod_2',
      name: 'Lumina Sleep Mask',
      category: 'Consumer Health / eCommerce',
      price: '79.00',
      url: 'https://luminasleep.com/mask',
      description: 'Silk weighted blackout sleep mask with built-in flat Bluetooth 5.3 audio drivers and natural lavender aroma pods.',
    },
    {
      id: 'prod_3',
      name: 'Aura Focus Hydration Powder',
      category: 'Supplements / Wellness',
      price: '45.00',
      url: 'https://aurafocus.co/hydrate',
      description: 'Electrolyte & Nootropic powder drink mix formulated with Alpha-GPC, L-Theanine, and organic coconut water for clean mental clarity.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
            Product Catalog
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage product assets and launch Meta advertising strategies with 1-click presets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded border border-blue-100">
                  {p.category}
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  ${p.price}
                </span>
              </div>

              <h2 className="font-heading text-base font-bold text-[#0F172A]">
                {p.name}
              </h2>

              <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                {p.description}
              </p>

              <p className="text-[11px] text-[#2563EB] truncate font-medium">
                {p.url}
              </p>
            </div>

            <button
              onClick={() => onQuickGenerate(p.name, p.description, p.price, p.url)}
              className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Strategy</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

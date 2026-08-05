import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  Check, 
  Trash2, 
  FileText, 
  Sparkles, 
  Layers, 
  Palette,
  FolderPlus
} from 'lucide-react';

export const BrandAssetsPage: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState('Professional & Direct Response');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const brandColors = [
    { name: 'Primary Slate', hex: '#0F172A', role: 'Headings & Main Buttons' },
    { name: 'Indigo Accent', hex: '#4F46E5', role: 'CTAs & Active States' },
    { name: 'Emerald Conversion', hex: '#059669', role: 'Badges & High-ROAS Signals' },
    { name: 'Subtle Canvas', hex: '#F8FAFC', role: 'Card Backgrounds & Surfaces' },
  ];

  const brandAssets = [
    { id: '1', name: 'Acme_Logo_Primary_Dark.svg', type: 'Vector Logo', size: '24 KB', dimensions: '1200x400' },
    { id: '2', name: 'Acme_Logo_Icon_Mark.png', type: 'App Icon', size: '112 KB', dimensions: '512x512' },
    { id: '3', name: 'Aura_Earbuds_Studio_Hero.jpg', type: 'Product Shot', size: '1.4 MB', dimensions: '2400x1600' },
    { id: '4', name: 'LuxeGlow_Serum_SerumBottle.png', type: 'Transparent PNG', size: '820 KB', dimensions: '1080x1080' },
  ];

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Brand Assets & Identity Studio
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Manage logos, brand guidelines, tone of voice, and visual assets used by the AI generator.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0">
          <Upload className="w-4 h-4" />
          <span>Upload Brand Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Assets Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-200/80 hover:border-slate-400 bg-white rounded-2xl p-8 text-center space-y-3 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-slate-100 flex items-center justify-center mx-auto transition-colors">
              <Upload className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Click or drag brand logos & product photos here
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                PNG, SVG, JPG or WebP up to 25MB each
              </p>
            </div>
          </div>

          {/* Uploaded Assets List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="font-heading text-base font-bold text-slate-900">
              Active Asset Library
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {brandAssets.map((asset) => (
                <div key={asset.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                      {asset.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{asset.size}</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xs font-bold text-slate-900 truncate">{asset.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{asset.dimensions} px</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tone of Voice & Color Palette */}
        <div className="space-y-6">
          {/* Tone of Voice Rules */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="font-heading text-base font-bold text-slate-900">
                AI Tone of Voice
              </h2>
            </div>

            <div className="space-y-2">
              {[
                'Professional & Direct Response',
                'Casual & Conversational',
                'High-Energy & Urgent',
                'Luxury & Minimalist'
              ].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    selectedTone === tone
                      ? 'bg-slate-900 text-white font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <span>{tone}</span>
                  {selectedTone === tone && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-600" />
              <h2 className="font-heading text-base font-bold text-slate-900">
                Brand Palette
              </h2>
            </div>

            <div className="space-y-2.5">
              {brandColors.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => copyColor(color.hex)}
                  className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-lg border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{color.name}</p>
                      <p className="text-[10px] text-slate-400">{color.role}</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                    {copiedColor === color.hex ? 'Copied' : color.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

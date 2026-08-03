import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  Layers,
  Code2,
  Sliders
} from 'lucide-react';
import { getStoredSupabaseConfig, saveSupabaseConfig, getSupabaseClient } from '../../lib/supabase';

interface SettingsViewProps {
  onConfigUpdated: () => void;
  isSupabaseConnected: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onConfigUpdated,
  isSupabaseConnected,
}) => {
  const currentConfig = getStoredSupabaseConfig() || { url: '', anonKey: '' };

  const [supabaseUrl, setSupabaseUrl] = useState(currentConfig.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(currentConfig.anonKey);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlSchemaScript = `-- Supabase Table Schema for AdPilot AI campaign_requests
create table if not exists campaign_requests (
  id text primary key,
  product_name text not null,
  product_description text not null,
  product_price numeric not null,
  landing_page_url text not null,
  campaign_goal text not null,
  daily_budget numeric not null,
  target_country text not null,
  competitors text,
  status text default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security) or allow public inserts if needed:
alter table campaign_requests enable row level security;
create policy "Allow anonymous insert and select" on campaign_requests for all using (true) with check (true);
`;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseUrl.trim(), supabaseAnonKey.trim());
    setSaveSuccess(true);
    onConfigUpdated();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchemaScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      <div className="border-b border-[#E2E8F0] pb-6">
        <h1 className="font-heading text-2xl font-bold text-[#0F172A]">
          Platform & Database Settings
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Configure Supabase database connection and Meta Ads Manager API integrations.
        </p>
      </div>

      {/* Supabase Connection Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-[#16A34A] rounded-lg border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-[#0F172A]">
                Supabase Database Integration
              </h2>
              <p className="text-xs text-[#64748B]">
                Saves all campaign requests to the <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[11px]">campaign_requests</code> table.
              </p>
            </div>
          </div>

          <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
            isSupabaseConnected 
              ? 'bg-emerald-50 text-[#16A34A] border-emerald-200' 
              : 'bg-amber-50 text-[#F59E0B] border-amber-200'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSupabaseConnected ? 'Connected to Supabase' : 'Local Fallback Mode'}</span>
          </span>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0F172A]">
              Supabase Project URL (VITE_SUPABASE_URL)
            </label>
            <input
              type="text"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#0F172A]">
              Supabase Anon Key (VITE_SUPABASE_ANON_KEY)
            </label>
            <input
              type="password"
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#64748B]">
              Note: The app automatically falls back to local storage if credentials are not specified.
            </span>

            <button
              type="submit"
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Verify Connection</span>
            </button>
          </div>

          {saveSuccess && (
            <p className="text-xs font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Supabase credentials saved successfully! Testing connection...</span>
            </p>
          )}
        </form>

        {/* Supabase Table Creation Script Box */}
        <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#0F172A]">
                Supabase Table SQL Script (<code className="text-xs">campaign_requests</code>)
              </span>
            </div>
            <button
              onClick={handleCopySql}
              className="text-xs text-[#2563EB] hover:underline font-semibold flex items-center gap-1"
            >
              {copiedSql ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSql ? 'Copied SQL' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <pre className="p-3 bg-[#0F172A] text-slate-200 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed">
            {sqlSchemaScript}
          </pre>
        </div>
      </div>

      {/* Meta Ads Account Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-6 shadow-xs space-y-4">
        <h2 className="font-heading text-base font-bold text-[#0F172A]">
          Meta Ad Account Connection
        </h2>
        <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              Meta
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Acme Business Manager (act_82940291)</p>
              <p className="text-[11px] text-[#16A34A] font-medium">Status: Active & Authorized</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-50 text-[#16A34A] font-bold px-3 py-1 rounded-full border border-emerald-200">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

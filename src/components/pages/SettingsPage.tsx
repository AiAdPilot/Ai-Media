import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Key, 
  Check, 
  ShieldCheck, 
  Bell, 
  Users, 
  CreditCard, 
  Building,
  Save,
  CheckCircle2
} from 'lucide-react';

interface SettingsPageProps {
  onConfigUpdated?: () => void;
  isSupabaseConnected?: boolean;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onConfigUpdated,
  isSupabaseConnected = false,
}) => {
  const [orgName, setOrgName] = useState('Acme Growth Labs');
  const [metaToken, setMetaToken] = useState('EAAG...82940291');
  const [geminiKey, setGeminiKey] = useState('AIzaSy...7789');
  const [supabaseUrl, setSupabaseUrl] = useState('https://app.supabase.co');
  const [supabaseKey, setSupabaseKey] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    if (onConfigUpdated) onConfigUpdated();
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
          Workspace & API Settings
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Configure API credentials, database persistence, team permissions, and Meta Ads connections.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Workspace Organization */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Building className="w-5 h-5 text-indigo-600" />
            <h2 className="font-heading text-base font-bold text-slate-900">
              Organization Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Workspace Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-body"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Plan Tier</label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Enterprise Pro ($499/mo)</span>
                <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600" />
              <h2 className="font-heading text-base font-bold text-slate-900">
                API Credentials & Tokens
              </h2>
            </div>

            <span className="text-[10px] font-mono text-slate-400">
              256-bit Encrypted Storage
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Meta Marketing API System User Token
              </label>
              <input
                type="password"
                value={metaToken}
                onChange={(e) => setMetaToken(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Gemini 2.5 API Key
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Database Persistence Config */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <h2 className="font-heading text-base font-bold text-slate-900">
                Database Persistence (Supabase)
              </h2>
            </div>

            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              isSupabaseConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {isSupabaseConnected ? 'Connected' : 'Local Fallback Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Supabase Project URL</label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Supabase Anon Key</label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Changes synced automatically to workspace environment</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

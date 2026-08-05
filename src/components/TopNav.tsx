import React from 'react';
import { Search, Bell, Sparkles, Menu, Database, CheckCircle2, ShieldAlert, Command } from 'lucide-react';
import { NavigationTab } from '../types';

interface TopNavProps {
  activeTab: NavigationTab;
  onOpenMobileSidebar: () => void;
  onOpenDrawer: () => void;
  onNavigate: (tab: NavigationTab) => void;
  isSupabaseConnected?: boolean;
  selectedProjectName?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onOpenDrawer,
  onNavigate,
  isSupabaseConnected = false,
  selectedProjectName,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Overview';
      case 'projects':
        return 'Campaign Projects';
      case 'project_workspace':
        return selectedProjectName ? `Project Workspace / ${selectedProjectName}` : 'Project Workspace';
      case 'brand_assets':
        return 'Brand Assets & Guidelines';
      case 'ai_assistant':
        return 'AI Copilot & Strategist';
      case 'settings':
        return 'Workspace Settings';
      case 'login':
        return 'Account Sign In';
      case 'register':
        return 'Create Account';
      default:
        return 'AdPilot AI';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left Section: Mobile Menu & Breadcrumb Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">AdPilot /</span>
          <h1 className="font-heading text-sm font-extrabold text-slate-900 tracking-tight">
            {getTabTitle()}
          </h1>

          {/* Database pill */}
          <button
            onClick={() => onNavigate('settings')}
            className={`
              hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border transition-colors ml-2
              ${isSupabaseConnected 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }
            `}
            title={isSupabaseConnected ? 'Connected to Supabase DB' : 'Running in local state mode'}
          >
            <Database className="w-3 h-3 shrink-0" />
            <span>{isSupabaseConnected ? 'Database Connected' : 'Local State'}</span>
          </button>
        </div>
      </div>

      {/* Right Section: Search & Quick Copilot Button */}
      <div className="flex items-center gap-3">
        {/* Search Input Mock */}
        <div className="relative hidden md:flex items-center w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-8 pr-8 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-all font-body"
          />
          <div className="absolute right-2.5 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>

        {/* AI Copilot Drawer Toggle */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* Notifications */}
        <button 
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </button>

        {/* Quick User Avatar */}
        <div className="pl-1 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-xs shadow-2xs">
            KE
          </div>
        </div>
      </div>
    </header>
  );
};

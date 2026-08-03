import React from 'react';
import { Search, Bell, Sparkles, Menu, Database, CheckCircle2, ShieldAlert } from 'lucide-react';
import { NavigationTab } from '../types';

interface TopNavProps {
  activeTab: NavigationTab;
  onOpenMobileSidebar: () => void;
  onOpenDrawer: () => void;
  onNavigate: (tab: NavigationTab) => void;
  isSupabaseConnected: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onOpenDrawer,
  onNavigate,
  isSupabaseConnected,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'ai_strategist':
        return 'AI Campaign Strategist';
      case 'dashboard':
        return 'Performance Overview';
      case 'campaigns':
        return 'Campaign Requests & Management';
      case 'products':
        return 'Product Catalog';
      case 'creatives':
        return 'Ad Creatives & Copy Engine';
      case 'audience':
        return 'Audience Intelligence';
      case 'analytics':
        return 'Meta Ads Analytics';
      case 'knowledge_base':
        return 'Meta Ad Policy & Playbooks';
      case 'settings':
        return 'Platform & Database Settings';
      default:
        return 'AdPilot AI';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Mobile menu toggle & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h1 className="font-heading text-lg font-bold text-[#0F172A]">
            {getTabTitle()}
          </h1>

          {/* Database status pill */}
          <button
            onClick={() => onNavigate('settings')}
            className={`
              hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors
              ${isSupabaseConnected 
                ? 'bg-emerald-50 text-[#16A34A] border-emerald-200 hover:bg-emerald-100' 
                : 'bg-amber-50 text-[#F59E0B] border-amber-200 hover:bg-amber-100'
              }
            `}
            title={isSupabaseConnected ? 'Connected to Supabase campaign_requests table' : 'Running in local storage mode (Click to configure Supabase)'}
          >
            <Database className="w-3 h-3 shrink-0" />
            <span>{isSupabaseConnected ? 'Supabase Active' : 'Local Persistence'}</span>
            {isSupabaseConnected ? (
              <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
            ) : (
              <ShieldAlert className="w-3 h-3 text-[#F59E0B]" />
            )}
          </button>
        </div>
      </div>

      {/* Right section: Search bar & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns, ads..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
          />
        </div>

        {/* AI Assistant Quick Drawer Toggle */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2563EB] hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notifications */}
        <button 
          className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="pl-2 border-l border-[#E2E8F0] flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs">
            AP
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-[#0F172A] leading-tight">Alex Rivera</p>
            <p className="text-[10px] text-[#64748B]">Growth Director</p>
          </div>
        </div>
      </div>
    </header>
  );
};

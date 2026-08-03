import React from 'react';
import { 
  Sparkles, 
  LayoutDashboard, 
  Megaphone, 
  ShoppingBag, 
  Palette, 
  Users, 
  BarChart3, 
  BookOpen, 
  Settings,
  ChevronRight,
  Layers
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'ai_strategist', label: 'AI Strategist', icon: Sparkles, badge: 'New' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'creatives', label: 'Creatives', icon: Palette },
    { id: 'audience', label: 'Audience Research', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'knowledge_base', label: 'Knowledge Base', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E2E8F0] flex flex-col transition-transform duration-200 ease-in-out
        lg:translate-x-0 ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:static'}
      `}>
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-[#0F172A] tracking-tight block leading-tight">
                AdPilot<span className="text-[#2563EB]">.ai</span>
              </span>
              <span className="text-[10px] font-medium text-[#64748B] tracking-wider uppercase">
                Meta Ads OS
              </span>
            </div>
          </div>
        </div>

        {/* Workspace selector badge */}
        <div className="p-3 mx-3 my-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-semibold shrink-0">
              M
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[#0F172A] truncate">Main Meta Business</p>
              <p className="text-[10px] text-[#64748B] truncate">ID: act_82940291</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
          <div className="px-3 pb-1 text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">
            Platform Menu
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                  ${isActive 
                    ? 'bg-[#2563EB] text-white shadow-xs font-semibold' 
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 stroke-[2] ${isActive ? 'text-white' : 'text-[#64748B] group-hover:text-[#0F172A]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`
                    text-[10px] px-1.5 py-0.5 rounded font-semibold tracking-wide uppercase
                    ${isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563EB] border border-blue-100'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info / Meta Ads status */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
              </span>
              <span className="text-xs font-medium text-[#0F172A]">Meta API Connected</span>
            </div>
            <span className="text-[10px] text-[#64748B]">v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
};

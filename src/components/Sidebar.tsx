import React from 'react';
import { 
  Home, 
  FolderKanban, 
  Sparkles, 
  Image as ImageIcon, 
  Settings, 
  ChevronDown,
  Layers,
  LogOut,
  User,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  currentUserEmail?: string;
  projectName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile,
  currentUserEmail = 'kemiezeji@gmail.com',
  projectName,
}) => {
  // Minimal left sidebar with ONLY Home, Projects, Brand Assets, AI Assistant and Settings
  const menuItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'brand_assets', label: 'Brand Assets', icon: ImageIcon },
    { id: 'ai_assistant', label: 'AI Assistant', icon: Sparkles, badge: 'Pro' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-200 ease-in-out select-none
        lg:translate-x-0 ${isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:static'}
      `}>
        {/* Top Header & Org Switcher */}
        <div>
          {/* Logo Brand */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <button 
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <Layers className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-heading text-base font-extrabold text-slate-900 tracking-tight block leading-none">
                  AdPilot <span className="text-slate-400 font-normal">AI</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 tracking-wide uppercase mt-0.5 block">
                  Enterprise
                </span>
              </div>
            </button>
          </div>

          {/* Minimal Team/Workspace Switcher */}
          <div className="p-3 mx-3 mt-4 mb-2 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-2xs">
                A
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 truncate">Acme Growth Labs</p>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  {projectName ? `Project: ${projectName}` : 'Meta Pro Suite'}
                </p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          </div>

          {/* Main Nav Items */}
          <nav className="px-3 pt-2 space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              Main Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (activeTab === 'project_workspace' && item.id === 'projects');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 group
                    ${isActive 
                      ? 'bg-slate-900 text-white shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 stroke-[1.8] ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`} />
                    <span className="font-body text-xs">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`
                      text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold uppercase tracking-wider
                      ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer & User Profile / Auth links */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* Quick Auth Navigation pills */}
          <div className="grid grid-cols-2 gap-1.5 px-1">
            <button
              onClick={() => onTabChange('login')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                activeTab === 'login' 
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => onTabChange('register')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                activeTab === 'register' 
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Register
            </button>
          </div>

          {/* User Account Card */}
          <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                <User className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 truncate">Kemi Ezeji</p>
                <p className="text-[10px] text-slate-500 truncate">{currentUserEmail}</p>
              </div>
            </div>

            <button
              onClick={() => onTabChange('login')}
              title="Sign Out / Switch Account"
              className="p-1.5 rounded-lg hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

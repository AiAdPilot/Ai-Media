/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { RightDrawer } from './components/RightDrawer';
import { CampaignForm } from './components/CampaignForm';
import { LoadingExperience } from './components/LoadingExperience';
import { StrategyViewer } from './components/StrategyViewer';

// Secondary views
import { DashboardView } from './components/views/DashboardView';
import { CampaignsView } from './components/views/CampaignsView';
import { ProductsView } from './components/views/ProductsView';
import { CreativesView } from './components/views/CreativesView';
import { AudienceView } from './components/views/AudienceView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { KnowledgeBaseView } from './components/views/KnowledgeBaseView';
import { SettingsView } from './components/views/SettingsView';

import { NavigationTab, CampaignRequest, CampaignStrategy } from './types';
import { 
  saveCampaignRequestToSupabase, 
  fetchCampaignRequests, 
  getSupabaseClient 
} from './lib/supabase';
import { generateStrategyFromRequest } from './lib/strategyGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('ai_strategist');
  const [appState, setAppState] = useState<'form' | 'loading' | 'strategy'>('form');

  // Drawer / Mobile Sidebar states
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  // Active request and strategy
  const [currentRequest, setCurrentRequest] = useState<CampaignRequest | null>(null);
  const [currentStrategy, setCurrentStrategy] = useState<CampaignStrategy | null>(null);

  // Saved requests collection
  const [savedRequests, setSavedRequests] = useState<CampaignRequest[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isSavedInSupabaseThisSession, setIsSavedInSupabaseThisSession] = useState<boolean>(false);

  // Initial load: Fetch saved campaign requests from Supabase or local storage
  const loadRequests = async () => {
    const res = await fetchCampaignRequests();
    setSavedRequests(res.data);
    setIsSupabaseConnected(res.isSupabase);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Form Submission Handler
  const handleFormSubmit = async (formData: CampaignRequest) => {
    setCurrentRequest(formData);
    
    // 1. Generate Strategy object
    const strategy = generateStrategyFromRequest(formData);
    setCurrentStrategy(strategy);

    // 2. Save campaign request to Supabase campaign_requests table
    const saveResult = await saveCampaignRequestToSupabase(formData);
    setIsSavedInSupabaseThisSession(saveResult.isSupabase);

    // Refresh list of campaign requests
    loadRequests();

    // 3. Switch to loading experience
    setAppState('loading');
  };

  // Loading finished handler
  const handleLoadingComplete = () => {
    setAppState('strategy');
  };

  // Reset strategy view to start fresh
  const handleResetStrategy = () => {
    setAppState('form');
    setCurrentRequest(null);
    setCurrentStrategy(null);
  };

  // Select existing request from Campaigns table or Dashboard
  const handleSelectRequest = (req: CampaignRequest) => {
    setCurrentRequest(req);
    const strategy = generateStrategyFromRequest(req);
    setCurrentStrategy(strategy);
    setActiveTab('ai_strategist');
    setAppState('strategy');
  };

  // Quick generate preset from Products catalog
  const handleQuickProductGenerate = (
    productName: string,
    description: string,
    price: string,
    url: string
  ) => {
    setActiveTab('ai_strategist');
    setAppState('form');
    // Pre-fill request
    const quickReq: CampaignRequest = {
      product_name: productName,
      product_description: description,
      product_price: price,
      landing_page_url: url,
      campaign_goal: 'Sales',
      daily_budget: '100',
      target_country: 'United States',
    };
    handleFormSubmit(quickReq);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] flex font-body antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          // If switching back to AI Strategist, keep state intact or reset if desired
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]">
        {/* Top Header Navigation */}
        <TopNav
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenDrawer={() => setIsRightDrawerOpen(true)}
          onNavigate={(tab) => setActiveTab(tab)}
          isSupabaseConnected={isSupabaseConnected}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]/30">
          {activeTab === 'ai_strategist' && (
            <>
              {appState === 'form' && (
                <CampaignForm onSubmit={handleFormSubmit} />
              )}

              {appState === 'loading' && (
                <LoadingExperience
                  productName={currentRequest?.product_name || 'Your Product'}
                  onComplete={handleLoadingComplete}
                />
              )}

              {appState === 'strategy' && currentStrategy && (
                <StrategyViewer
                  strategy={currentStrategy}
                  onReset={handleResetStrategy}
                  isSavedToSupabase={isSavedInSupabaseThisSession}
                />
              )}
            </>
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              onNewStrategyClick={() => {
                setActiveTab('ai_strategist');
                setAppState('form');
              }}
              recentRequests={savedRequests}
              onSelectRequest={handleSelectRequest}
            />
          )}

          {activeTab === 'campaigns' && (
            <CampaignsView
              requests={savedRequests}
              onSelectRequest={handleSelectRequest}
              onNewCampaignClick={() => {
                setActiveTab('ai_strategist');
                setAppState('form');
              }}
              isSupabaseConnected={isSupabaseConnected}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView onQuickGenerate={handleQuickProductGenerate} />
          )}

          {activeTab === 'creatives' && <CreativesView />}

          {activeTab === 'audience' && <AudienceView />}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'knowledge_base' && <KnowledgeBaseView />}

          {activeTab === 'settings' && (
            <SettingsView
              onConfigUpdated={loadRequests}
              isSupabaseConnected={isSupabaseConnected}
            />
          )}
        </main>
      </div>

      {/* Right Drawer AI Copilot */}
      <RightDrawer
        isOpen={isRightDrawerOpen}
        onClose={() => setIsRightDrawerOpen(false)}
      />
    </div>
  );
}

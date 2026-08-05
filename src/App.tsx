import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { RightDrawer } from './components/RightDrawer';

// Pages
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { HomePage } from './components/pages/HomePage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ProjectWorkspacePage } from './components/pages/ProjectWorkspacePage';
import { BrandAssetsPage } from './components/pages/BrandAssetsPage';
import { AIAssistantPage } from './components/pages/AIAssistantPage';
import { SettingsPage } from './components/pages/SettingsPage';

import { NavigationTab, CampaignRequest } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  // Default initial active project
  const [selectedProject, setSelectedProject] = useState<CampaignRequest>({
    id: 'proj_1',
    product_name: 'Aura Wireless Noise-Canceling Earbuds',
    product_description: 'Premium audiophile wireless earbuds with active noise cancellation, 36h battery life, and custom sound profiles.',
    product_price: 199,
    landing_page_url: 'https://aurasound.com/pro',
    campaign_goal: 'Sales',
    daily_budget: 250,
    target_country: 'United States',
    competitors: 'Bose, Sony, Apple AirPods Pro',
  });

  const [allProjects, setAllProjects] = useState<CampaignRequest[]>([
    {
      id: 'proj_1',
      product_name: 'Aura Wireless Noise-Canceling Earbuds',
      product_description: 'Premium audiophile wireless earbuds with active noise cancellation, 36h battery life, and custom sound profiles.',
      product_price: 199,
      landing_page_url: 'https://aurasound.com/pro',
      campaign_goal: 'Sales',
      daily_budget: 250,
      target_country: 'United States',
      competitors: 'Bose, Sony, Apple AirPods Pro',
    },
    {
      id: 'proj_2',
      product_name: 'SaaS Metrics Hub Pro',
      product_description: 'Real-time financial analytics and churn reduction engine for B2B SaaS teams.',
      product_price: 299,
      landing_page_url: 'https://saasmetricshub.io',
      campaign_goal: 'Leads',
      daily_budget: 150,
      target_country: 'United States',
    },
    {
      id: 'proj_3',
      product_name: 'LuxeGlow Botanical Serum',
      product_description: 'Organic age-defying botanical face serum with cold-pressed hyaluronic acid.',
      product_price: 85,
      landing_page_url: 'https://luxeglowbeauty.com',
      campaign_goal: 'Sales',
      daily_budget: 100,
      target_country: 'United Kingdom',
    },
  ]);

  const handleSelectProject = (project: CampaignRequest) => {
    setSelectedProject(project);
    setActiveTab('project_workspace');
  };

  const handleCreateNewProject = () => {
    const newProject: CampaignRequest = {
      id: `proj_${Date.now()}`,
      product_name: 'New Meta Ads Project',
      product_description: 'AI campaign brief for new product launch.',
      product_price: 99,
      landing_page_url: 'https://example.com',
      campaign_goal: 'Sales',
      daily_budget: 100,
      target_country: 'United States',
    };
    setAllProjects((prev) => [newProject, ...prev]);
    setSelectedProject(newProject);
    setActiveTab('project_workspace');
  };

  const handleUpdateProject = (updated: CampaignRequest) => {
    setSelectedProject(updated);
    setAllProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const isPublicPage = activeTab === 'home' || activeTab === 'login' || activeTab === 'register';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex font-body antialiased selection:bg-slate-900 selection:text-white">
      {/* Show Sidebar ONLY in Protected Area (not on public homepage/auth) */}
      {!isPublicPage && (
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          projectName={selectedProject?.product_name}
        />
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Show Workspace TopNav ONLY in Protected Area */}
        {!isPublicPage && (
          <TopNav
            activeTab={activeTab}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onOpenDrawer={() => setIsRightDrawerOpen(true)}
            onNavigate={(tab) => setActiveTab(tab)}
            selectedProjectName={selectedProject?.product_name}
          />
        )}

        {/* Dynamic Page Views */}
        <main className={`flex-1 overflow-y-auto ${isPublicPage ? 'bg-white' : 'bg-slate-50/40'}`}>
          {activeTab === 'home' && (
            <HomePage
              onNewProject={handleCreateNewProject}
              onSelectProject={handleSelectProject}
              onNavigateToAI={() => setActiveTab('ai_assistant')}
              onNavigateToProjects={() => setActiveTab('projects')}
              onNavigateToRegister={() => setActiveTab('register')}
              onNavigateToLogin={() => setActiveTab('login')}
              recentRequests={allProjects}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsPage
              requests={allProjects}
              onSelectProject={handleSelectProject}
              onNewProjectClick={handleCreateNewProject}
            />
          )}

          {activeTab === 'project_workspace' && selectedProject && (
            <ProjectWorkspacePage
              project={selectedProject}
              onBackToProjects={() => setActiveTab('projects')}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === 'brand_assets' && <BrandAssetsPage />}

          {activeTab === 'ai_assistant' && <AIAssistantPage />}

          {activeTab === 'settings' && <SettingsPage />}

          {activeTab === 'login' && (
            <LoginPage
              onLoginSuccess={() => setActiveTab('projects')}
              onNavigateToRegister={() => setActiveTab('register')}
            />
          )}

          {activeTab === 'register' && (
            <RegisterPage
              onRegisterSuccess={() => setActiveTab('projects')}
              onNavigateToLogin={() => setActiveTab('login')}
            />
          )}
        </main>
      </div>

      {/* Right AI Assistant Copilot Drawer (active in protected area) */}
      {!isPublicPage && (
        <RightDrawer
          isOpen={isRightDrawerOpen}
          onClose={() => setIsRightDrawerOpen(false)}
        />
      )}
    </div>
  );
}

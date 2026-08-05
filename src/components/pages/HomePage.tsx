import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  ShieldCheck, 
  Brain, 
  Check, 
  Plus,
  ArrowUpRight,
  Lock,
  BarChart3,
  Sliders,
  Share2,
  Database,
  Cpu,
  Globe2,
  Video,
  FileText,
  LineChart,
  Bot,
  X,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { CampaignRequest } from '../../types';

interface HomePageProps {
  onNewProject: () => void;
  onSelectProject: (req: CampaignRequest) => void;
  onNavigateToAI: () => void;
  onNavigateToProjects: () => void;
  onNavigateToRegister?: () => void;
  onNavigateToLogin?: () => void;
  recentRequests: CampaignRequest[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNewProject,
  onSelectProject,
  onNavigateToAI,
  onNavigateToProjects,
  onNavigateToRegister,
  onNavigateToLogin,
  recentRequests,
}) => {
  // Platform Overview interactive callout state
  const [activeCallout, setActiveCallout] = useState<'intelligence' | 'multi' | 'strategy' | 'publishing' | 'performance'>('intelligence');

  // Interactive Live Strategy Preview in Hero/Overview
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'brief' | 'copy' | 'hooks' | 'cbo'>('brief');

  const defaultProjects: CampaignRequest[] = recentRequests.length > 0 ? recentRequests.slice(0, 3) : [
    {
      id: 'proj_1',
      product_name: 'Aura Wireless Earbuds',
      product_description: 'Premium audiophile earbuds with active noise cancellation and 36h battery life.',
      product_price: 199,
      landing_page_url: 'https://aurasound.com/pro',
      campaign_goal: 'Sales',
      daily_budget: 250,
      target_country: 'United States',
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
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-body selection:bg-blue-100 selection:text-blue-700 antialiased">
      
      {/* 1. STICKY MINIMAL NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/85 backdrop-blur-md border-b border-slate-200/60 h-16 px-4 sm:px-8 transition-all">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-base font-bold text-slate-900 tracking-tight">
                AdPilot <span className="text-blue-600">AI</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-200/60 text-slate-700 hidden sm:inline-block">
                v2.5 OS
              </span>
            </div>
          </div>

          {/* Minimal Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <a href="#overview" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
            <a href="#capabilities" className="hover:text-slate-900 transition-colors">Capabilities</a>
            <a href="#comparison" className="hover:text-slate-900 transition-colors">Comparison</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
          </nav>

          {/* Auth CTA Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToLogin || onNavigateToProjects}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100/70"
            >
              Sign In
            </button>

            <button
              onClick={onNavigateToRegister || onNavigateToProjects}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER WITH GENEROUS SPACING */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 py-16 sm:py-20">

        {/* 2. HERO SECTION */}
        <section className="relative space-y-12">
          {/* Subtle Ambient Radial Mesh Grid Background */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[420px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/20 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

          {/* Hero Headlines */}
          <div className="text-center space-y-6 max-w-3xl mx-auto pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-slate-900">
                Predictive Ad Operating System
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">Advantage+ CBO Engine</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Predictive Campaign Intelligence for Modern Ad Teams
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Unify AI brief generation, direct-response copy studio, visual hook strategy, and Advantage+ CBO architecture into one calm, precision workspace.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onNavigateToRegister || onNavigateToProjects}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNavigateToProjects}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-heading text-xs font-semibold rounded-xl shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Explore Workspace</span>
              </button>
            </div>
          </div>

          {/* Hero AI Workspace Mockup Preview Frame */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4 max-w-5xl mx-auto transition-all duration-300">
            {/* Mockup Window Controls & Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">adpilot-workspace-v2.5.ai</span>
              </div>

              {/* Workspace Feature Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl text-xs font-medium">
                {(['brief', 'copy', 'hooks', 'cbo'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveWorkspaceTab(tab)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      activeWorkspaceTab === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab === 'brief' && '01 Strategic Brief'}
                    {tab === 'copy' && '02 Copy Matrix'}
                    {tab === 'hooks' && '03 Visual Hooks'}
                    {tab === 'cbo' && '04 Advantage+ CBO'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive Content Box inside Mockup */}
            <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-xl p-5 sm:p-6 space-y-5">
              {activeWorkspaceTab === 'brief' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xs font-bold text-slate-900">
                          Product: Aura Noise-Canceling Earbuds
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded border border-emerald-200">
                          92/100 Readiness Score
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal">
                        Meta Advantage+ CBO cold traffic campaign strategy brief.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Target: United States</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estimated CPA</span>
                      <p className="font-stats text-lg font-bold text-slate-900">$18.50</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Target ROAS</span>
                      <p className="font-stats text-lg font-bold text-emerald-600">3.80x</p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Daily Test Budget</span>
                      <p className="font-stats text-lg font-bold text-blue-600">$250.00</p>
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'copy' && (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Direct-Response Meta Primary Text Variant
                  </span>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/70 space-y-2">
                    <p className="text-xs text-slate-800 leading-relaxed">
                      "Tired of background noise ruining your focus? Aura Wireless Earbuds combine studio-grade active noise cancellation with 36-hour battery life. Designed for creators, remote teams, and audiophiles."
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-blue-600">
                      <span>Framework: PAS (Problem-Agitate-Solve)</span>
                      <span>•</span>
                      <span>CTR Projection: 3.4%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'hooks' && (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    5-Second Pattern-Interrupt Visual Hook Concept
                  </span>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/70 space-y-2">
                    <p className="text-xs text-slate-900 font-medium italic">
                      "🔊 [VISUAL: Split screen comparison of noisy coffee shop vs instant silent studio acoustics when putting in earbuds]"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-600">
                      <span>Format: IG Reels / TikTok UGC</span>
                      <span>•</span>
                      <span>Stop-Rate Projection: 48%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'cbo' && (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Meta Advantage+ Campaign Budget Allocation
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="font-bold text-slate-900 block">Cold Prospecting CBO</span>
                      <span className="font-mono text-slate-500 text-[11px]">70% Budget ($175/day)</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="font-bold text-slate-900 block">Social Proof Retargeting</span>
                      <span className="font-mono text-slate-500 text-[11px]">20% Budget ($50/day)</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200/70 space-y-1">
                      <span className="font-bold text-slate-900 block">High-Intent Offer Close</span>
                      <span className="font-mono text-slate-500 text-[11px]">10% Budget ($25/day)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. TRUSTED BY */}
        <section className="text-center space-y-6 pt-4">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Trusted by performance teams & growth agencies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-heading text-base font-bold tracking-tight text-slate-800">NORDIC DTC</span>
            <span className="font-heading text-base font-bold tracking-tight text-slate-800">EQUINOX MEDIA</span>
            <span className="font-heading text-base font-bold tracking-tight text-slate-800">COHORT GROWTH</span>
            <span className="font-heading text-base font-bold tracking-tight text-slate-800">PULSE ADS</span>
            <span className="font-heading text-base font-bold tracking-tight text-slate-800">AURA LABS</span>
          </div>
        </section>

        {/* 4. PLATFORM OVERVIEW */}
        <section id="overview" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Unified Platform Architecture
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Workspace for Your Entire Ad Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Click any capability below to inspect how AdPilot coordinates intelligence across channels.
            </p>
          </div>

          {/* Interactive Overview Controls */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-200/60 p-1.5 rounded-2xl">
            {[
              { id: 'intelligence', label: 'Campaign Intelligence', icon: Brain },
              { id: 'multi', label: 'Multi-Platform Ads', icon: Globe2 },
              { id: 'strategy', label: 'AI Strategy Studio', icon: Cpu },
              { id: 'publishing', label: 'Instant Sync', icon: Share2 },
              { id: 'performance', label: 'Performance Analytics', icon: LineChart },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCallout(item.id as any)}
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    activeCallout === item.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Callout Panel */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
            {activeCallout === 'intelligence' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-slate-900">01. Predictive Offer & Campaign Intelligence</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Automatically extracts key product value propositions, analyzes landing page friction points, and calculates pre-launch conversion readiness scores before running cold traffic.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">10-Point Meta Audit</span>
                    <span className="text-[11px] text-slate-500">Evaluates offer clarity and CBO readiness.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Competitor Hook Mapping</span>
                    <span className="text-[11px] text-slate-500">Identifies visual gaps in market messaging.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Landing Page Sync</span>
                    <span className="text-[11px] text-slate-500">Aligns ad copy with post-click experience.</span>
                  </div>
                </div>
              </div>
            )}

            {activeCallout === 'multi' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-slate-900">02. Multi-Platform Advertising Engine</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Cross-channel campaign architecture supporting Meta Advantage+ CBO, Google Demand Gen & Search, and TikTok Spark Ads from a single source of truth.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Meta Advantage+ CBO</span>
                    <span className="text-[11px] text-slate-500">Automated budget re-allocation between ad sets.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Google Ads Strategy</span>
                    <span className="text-[11px] text-slate-500">High-intent keyword grouping and RSA copy.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">TikTok Short-Form</span>
                    <span className="text-[11px] text-slate-500">Fast pattern-interrupt scripts and UGC angles.</span>
                  </div>
                </div>
              </div>
            )}

            {activeCallout === 'strategy' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-slate-900">03. AI Strategy & Copy Studio</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Generates PAS, AIDA, and Social Proof copy frameworks powered by Gemini 2.5 tailored specifically to direct-response performance advertisers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Primary Text Variations</span>
                    <span className="text-[11px] text-slate-500">Short, medium, and long-form ad body copy.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Headline Matrix</span>
                    <span className="text-[11px] text-slate-500">High-CTR headlines tailored for Meta placements.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Visual Hook Storyboard</span>
                    <span className="text-[11px] text-slate-500">5-second scene-by-scene UGC video direction.</span>
                  </div>
                </div>
              </div>
            )}

            {activeCallout === 'publishing' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-slate-900">04. Automated Publishing & Sync</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Push verified campaign structures, ad sets, and primary copy straight into Meta Marketing API without manual CSV imports or copy-pasting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Meta CAPI Integration</span>
                    <span className="text-[11px] text-slate-500">Direct server-to-server token synchronization.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Draft Exporting</span>
                    <span className="text-[11px] text-slate-500">Review in AdPilot before pushing live to Meta.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Asset Management</span>
                    <span className="text-[11px] text-slate-500">Unified brand asset hub for copy and images.</span>
                  </div>
                </div>
              </div>
            )}

            {activeCallout === 'performance' && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-heading text-lg font-bold text-slate-900">05. Real-Time Performance Analytics</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  Track blended ROAS, CPA trends, daily spend velocity, and strategy readiness across all active workspace campaign briefs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Blended ROAS Tracker</span>
                    <span className="text-[11px] text-slate-500">Accurate attribution across channels.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">CPA Guardrails</span>
                    <span className="text-[11px] text-slate-500">Alerts when cost per acquisition spikes.</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="font-bold block text-slate-900">Historical Benchmarks</span>
                    <span className="text-[11px] text-slate-500">Compare current launch against past wins.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section id="how-it-works" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Simplified Workflow
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Product URL to Live Meta Campaign in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Eliminate manual copy drafting, unstructured ad set building, and guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:-translate-y-0.5 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                01. Discover
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900">Ingest Product Brief</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Provide your product link, price, target market, and campaign goal. AdPilot ingests landing page details automatically.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:-translate-y-0.5 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                02. Strategize
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900">Generate AI Brief</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive a 10-point Meta readiness score, audience persona breakdown, and competitor counter-angle strategy matrix.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:-translate-y-0.5 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 inline-block">
                03. Launch
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900">Build Ad Copy & CBO</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate direct-response primary text, high-CTR headlines, 5-second video hooks, and CBO budget allocations.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:-translate-y-0.5 transition-all duration-300">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                04. Optimize
              </span>
              <h3 className="font-heading text-base font-bold text-slate-900">Sync & Scale</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Export directly to Meta Marketing API or copy verified campaign structures directly into Ads Manager.
              </p>
            </div>
          </div>
        </section>

        {/* 6. CORE CAPABILITIES */}
        <section id="capabilities" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Enterprise Feature Suite
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Core Capabilities Engineered for Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Purpose-built tools for performance marketers, DTC founders, and media buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Campaign Intelligence', desc: '10-point audit scores and offer readiness evaluations.', icon: Brain },
              { title: 'Meta Advantage+ Ads', desc: 'Standardized CBO structure specs and ad set allocation.', icon: Layers },
              { title: 'Google Ads Engine', desc: 'Search and Demand Gen RSA headline & description matrix.', icon: Globe2 },
              { title: 'TikTok & Reels Studio', desc: 'Short-form video script templates and pattern interrupts.', icon: Video },
              { title: 'Creative Storyboarder', desc: '5-second visual hook direction for UGC creators.', icon: FileText },
              { title: 'Pre-Launch Campaign Audit', desc: 'Identifies conversion friction prior to spending.', icon: Target },
              { title: 'AI Copy Generator', desc: 'PAS, AIDA, and Social Proof direct-response frameworks.', icon: Bot },
              { title: 'Performance Reporting', desc: 'Blended ROAS and CPA tracking across workspaces.', icon: LineChart },
            ].map((cap, i) => {
              const IconComp = cap.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:border-slate-300 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-900">
                    <IconComp className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-slate-900">{cap.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. WHY ADPILOT AI (COMPARISON) */}
        <section id="comparison" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              The AdPilot Advantage
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Manual Ad Setup vs. AdPilot AI Operating System
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Compare the friction of traditional ad management against an AI-driven workflow.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              {/* Manual Ad Operations Column */}
              <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Legacy Method</span>
                  <h3 className="font-heading text-base font-bold text-slate-900">Manual Ad Operations</h3>
                </div>

                <ul className="space-y-4 text-xs text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5" />
                    </div>
                    <span>4 to 8 hours spent drafting copy variants and spreadsheets manually.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5" />
                    </div>
                    <span>Unstructured CBO campaigns without verified audience budget allocation.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5" />
                    </div>
                    <span>Uncertain pre-launch conversion readiness leading to wasted Meta ad spend.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5" />
                    </div>
                    <span>Disjointed copy, UGC video hooks, and landing page messaging.</span>
                  </li>
                </ul>
              </div>

              {/* AdPilot AI Engine Column */}
              <div className="p-6 sm:p-8 space-y-6 bg-white">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-blue-600 uppercase tracking-wider font-semibold">AdPilot AI OS</span>
                  <h3 className="font-heading text-base font-bold text-slate-900">Predictive Campaign Intelligence</h3>
                </div>

                <ul className="space-y-4 text-xs text-slate-700">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Instant AI brief generation, copy matrices, and UGC scripts in under 2 minutes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Meta Advantage+ CBO specs with 3-tier ad set budget distribution.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>10-point diagnostic readiness audit before spending a single dollar.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Direct Meta CAPI synchronization and clean workspace asset storage.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section id="testimonials" className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Client Feedback
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Top Performance Teams
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Here is how growth leaders describe their experience with AdPilot AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "AdPilot cut our campaign launch timeline from 3 days to 15 minutes. The Advantage+ CBO structure specs alone increased our first-week ROAS by 40%."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-xs text-slate-900 block">Marcus Vance</span>
                <span className="text-[11px] text-slate-500 font-mono">Head of Growth, Nordic DTC</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The direct-response copy matrix and 5-second video hooks give our UGC creators exact scene directions. It's like having an elite media buyer on demand."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-xs text-slate-900 block">Elena Rostova</span>
                <span className="text-[11px] text-slate-500 font-mono">VP Marketing, Equinox Media</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "We manage over $2M in monthly Meta spend across 15 clients. AdPilot allows our team to maintain pristine quality and strategy across every account."
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-xs text-slate-900 block">David Chen</span>
                <span className="text-[11px] text-slate-500 font-mono">Founder, Cohort Growth Labs</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 block">
              AdPilot Enterprise Workspace
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ready to Launch Your Next Meta Campaign?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Create your AI campaign brief in under 2 minutes and experience predictive campaign intelligence.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={onNavigateToRegister || onNavigateToProjects}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs font-bold rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Get Started with AdPilot AI</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-8 mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
            {/* Brand column */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="font-heading font-bold text-sm text-slate-900">AdPilot AI</span>
              </div>
              <p className="text-slate-500 max-w-sm text-xs leading-relaxed">
                Predictive campaign intelligence operating system for Meta Advantage+, Google Ads, and TikTok performance advertising.
              </p>
            </div>

            {/* Links Column 1 */}
            <div className="space-y-2.5">
              <span className="font-semibold text-slate-900 block font-mono uppercase text-[11px] tracking-wider">Product</span>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#overview" className="hover:text-slate-900 transition-colors">Campaign Intelligence</a></li>
                <li><a href="#capabilities" className="hover:text-slate-900 transition-colors">Direct-Response Copy</a></li>
                <li><a href="#capabilities" className="hover:text-slate-900 transition-colors">Advantage+ CBO</a></li>
                <li><a href="#capabilities" className="hover:text-slate-900 transition-colors">UGC Storyboards</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="space-y-2.5">
              <span className="font-semibold text-slate-900 block font-mono uppercase text-[11px] tracking-wider">Resources</span>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a></li>
                <li><a href="#comparison" className="hover:text-slate-900 transition-colors">Why AdPilot</a></li>
                <li><a href="#testimonials" className="hover:text-slate-900 transition-colors">Case Studies</a></li>
                <li><button onClick={onNavigateToProjects} className="hover:text-slate-900 transition-colors">Protected Workspace</button></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div className="space-y-2.5">
              <span className="font-semibold text-slate-900 block font-mono uppercase text-[11px] tracking-wider">Company</span>
              <ul className="space-y-2 text-slate-500">
                <li><button onClick={onNavigateToRegister} className="hover:text-slate-900 transition-colors">Register</button></li>
                <li><button onClick={onNavigateToLogin} className="hover:text-slate-900 transition-colors">Sign In</button></li>
                <li><span className="text-slate-400">Enterprise Security</span></li>
                <li><span className="text-slate-400">Privacy Policy</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span>© 2026 AdPilot AI Systems Inc. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span>Security 256-bit</span>
              <span>•</span>
              <span>Meta CAPI Sync Active</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

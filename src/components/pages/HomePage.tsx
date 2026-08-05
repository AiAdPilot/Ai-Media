import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FolderKanban, 
  Layers, 
  Zap, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  ShieldCheck, 
  Brain, 
  Copy, 
  Check, 
  Plus,
  ArrowUpRight,
  Lock,
  ChevronRight,
  Shield,
  BarChart3,
  UserCheck
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
  // Live interactive teaser state for the homepage preview
  const [productNameInput, setProductNameInput] = useState('Aura Noise-Canceling Earbuds');
  const [goalInput, setGoalInput] = useState<'Sales' | 'Leads' | 'ROAS'>('Sales');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<{
    hook: string;
    headline: string;
    cpaEstimate: string;
    readinessScore: number;
  } | null>({
    hook: '🔊 "Silence the chaos. Studio-grade acoustic clarity with 36-hour battery life."',
    headline: 'Engineered for Audiophiles — Try 30 Days Risk-Free',
    cpaEstimate: '$18.50',
    readinessScore: 92,
  });

  const [copiedText, setCopiedText] = useState(false);

  const handleRunLiveTeaser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPreview({
        hook: `🎯 "Stop scrolling: ${productNameInput} is changing how top DTC brands scale cold traffic on Meta."`,
        headline: `Transform Your Results with ${productNameInput}`,
        cpaEstimate: goalInput === 'Sales' ? '$24.00' : '$12.80',
        readinessScore: Math.floor(Math.random() * 8) + 90,
      });
    }, 750);
  };

  const handleCopyHook = () => {
    if (generatedPreview?.hook) {
      navigator.clipboard.writeText(generatedPreview.hook);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

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
    <div className="min-h-screen bg-white font-body selection:bg-slate-900 selection:text-white text-slate-900">
      {/* SaaS Top Header - Logo & Get Started ONLY */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70 h-16 px-4 sm:px-8 flex items-center justify-between select-none">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-2xs">
            <Layers className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-extrabold text-slate-900 tracking-tight">
              AdPilot <span className="text-indigo-600 font-semibold">AI</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline-block">
              Enterprise v2.5
            </span>
          </div>
        </div>

        {/* Right Section: Get Started Button ONLY (opens Register / Sign In) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToLogin || onNavigateToProjects}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
          >
            Sign In
          </button>

          <button
            onClick={onNavigateToRegister || onNavigateToProjects}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main SaaS Homepage Body Container */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <section id="overview" className="text-center space-y-6 pt-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-900 font-bold">
              Meta Advantage+ Intelligence
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-normal">Predictive Strategy Engine</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Predictive Campaign Intelligence for High-Performance Meta Ads
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Unify AI brief generation, direct-response copy studio, visual hook strategy, and Advantage+ CBO architecture into one clean, enterprise growth engine.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onNavigateToRegister || onNavigateToProjects}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <span>Register for Free Access</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onNavigateToProjects}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-heading text-xs font-semibold rounded-2xl shadow-2xs transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Enter Protected Workspace</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enterprise 256-bit Encryption</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Direct Meta CAPI Sync</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant AI Briefs</span>
            </div>
          </div>
        </section>

        {/* IBM Plex Mono Statistics Banner */}
        <section className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
            <div className="space-y-1.5 pt-2 sm:pt-0">
              <p className="font-stats text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                $52M+
              </p>
              <p className="text-xs font-medium text-slate-500">Meta Spend Managed</p>
            </div>

            <div className="space-y-1.5 pt-2 sm:pt-0">
              <p className="font-stats text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight">
                3.85x
              </p>
              <p className="text-xs font-medium text-slate-500">Average Portfolio ROAS</p>
            </div>

            <div className="space-y-1.5 pt-2 sm:pt-0">
              <p className="font-stats text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                94%
              </p>
              <p className="text-xs font-medium text-slate-500">Strategy Model Accuracy</p>
            </div>

            <div className="space-y-1.5 pt-2 sm:pt-0">
              <p className="font-stats text-2xl sm:text-3xl font-bold text-indigo-600 tracking-tight">
                80%
              </p>
              <p className="text-xs font-medium text-slate-500">Faster Campaign Launch</p>
            </div>
          </div>
        </section>

        {/* Live Interactive Intelligence Studio Teaser Card */}
        <section id="teaser" className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  Live Campaign Intelligence Studio
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Test how AdPilot analyzes your offer and generates direct-response copy & hooks in real-time.
              </p>
            </div>

            <span className="self-start md:self-auto text-[11px] font-mono text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Gemini 2.5 Strategy Engine Active
            </span>
          </div>

          <form onSubmit={handleRunLiveTeaser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Product / Service Name</label>
              <input
                type="text"
                value={productNameInput}
                onChange={(e) => setProductNameInput(e.target.value)}
                placeholder="e.g., Aura Wireless Noise-Canceling Earbuds"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-body focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Campaign Goal</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {(['Sales', 'Leads', 'ROAS'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoalInput(g)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      goalInput === g ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 pt-1 flex justify-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    <span>Analyzing Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Generate Strategy Teaser</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {generatedPreview && (
            <div className="mt-6 bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span className="font-heading text-xs font-bold text-slate-900">
                    AI Strategic Assessment & Video Hook Concept
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 font-bold">
                    {generatedPreview.readinessScore}/100 Readiness Score
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Est. CPA: {generatedPreview.cpaEstimate}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                      High-Converting 5-Second Video Hook Script
                    </span>
                    <button
                      onClick={handleCopyHook}
                      className="text-[10px] font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 font-medium italic">
                    {generatedPreview.hook}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200/70 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Primary Ad Headline Concept
                  </span>
                  <p className="text-xs text-slate-900 font-bold font-heading">
                    {generatedPreview.headline}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-mono">
                  Save this brief into your protected campaign workspace
                </span>
                <button
                  onClick={onNavigateToRegister || onNewProject}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Register & Save Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Core Enterprise Capabilities (4 Clean Pillars) */}
        <section id="pillars" className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              Built for High-Growth Meta Advertisers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              A cohesive suite of predictive tools designed to eliminate guess-work and scale ROAS systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 hover:border-slate-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold font-mono text-sm">
                01
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Strategic Diagnostic Briefs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated auditing of offer readiness, landing page conversion friction, and competitor hook positioning before spending a single dollar on Meta.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>10-Point Meta Readiness Audit Score</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Competitor Strategy Matrix & Hook Counter-Angle</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 hover:border-slate-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold font-mono text-sm">
                02
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Direct-Response Copy Studio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates primary ad copy variants tailored specifically for cold prospecting, social proof reinforcement, and high-intent remarketing.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PAS & AIDA Copy Framework Generator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dynamic Meta Primary Text & Headline Matrix</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 hover:border-slate-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold font-mono text-sm">
                03
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Visual Hook & UGC Storyboarder
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                5-second pattern interrupt visual hooks, UGC script templates, and short-form video concepts engineered for TikTok and Instagram Reels.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High-CTR Visual Hook Scripts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reels & Stories Pattern-Interrupt Formats</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4 hover:border-slate-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold font-mono text-sm">
                04
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Advantage+ CBO Architecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized Meta Campaign Budget Optimization (CBO) structure specs, ready to export directly into Meta Ads Manager.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3-Tier Ad Set Structure (Prospecting & Remarketing)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Budget Allocation & Daily Spend Calculators</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Protected Area Access Showcase */}
        <section id="workspace" className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/70 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <h2 className="font-heading text-base font-bold text-slate-900">
                  Protected Campaign Projects Workspace
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Authenticated area for client campaign briefs, asset libraries, and Meta ad configurations.
              </p>
            </div>

            <button
              onClick={onNavigateToProjects}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Access Protected Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {defaultProjects.map((req) => (
              <div
                key={req.id || req.product_name}
                onClick={() => onSelectProject(req)}
                className="p-4 bg-white border border-slate-200/70 rounded-xl hover:border-indigo-300 transition-all cursor-pointer group space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[180px]">
                    {req.product_name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                    {req.campaign_goal}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 font-normal">
                  {req.product_description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Budget: ${req.daily_budget}/day</span>
                  <span className="text-indigo-600 font-bold group-hover:underline flex items-center gap-0.5">
                    Open <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-lg">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-indigo-400 block">
              AdPilot Enterprise Workspace
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Launch Your High-ROAS Campaign Strategy?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Register in under 30 seconds to start creating AI briefs, direct-response copy matrices, and Advantage+ setup.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateToRegister || onNavigateToProjects}
              className="w-full sm:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-heading text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register Account</span>
            </button>
            <button
              onClick={onNavigateToProjects}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-heading text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Workspace</span>
            </button>
          </div>
        </section>
      </div>

      {/* Modern Clean SaaS Landing Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-50 py-8 px-4 sm:px-8 mt-16 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              <Layers className="w-3 h-3" />
            </div>
            <span className="font-heading font-bold text-slate-900">AdPilot AI Platform</span>
            <span>© 2026 AdPilot Systems Inc.</span>
          </div>

          <div>
            <button
              onClick={onNavigateToRegister || onNavigateToProjects}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-heading text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

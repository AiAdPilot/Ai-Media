import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe, 
  ChevronDown, 
  AlertCircle,
  Wand2,
  Building2,
  ShoppingBag,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Database,
  ArrowRight
} from 'lucide-react';
import { CampaignGoal, CampaignRequest } from '../types';
import { COUNTRY_OPTIONS } from '../lib/strategyGenerator';
import { validateCampaignRequest } from '../lib/formValidation';
import { saveCampaignRequestToSupabase, DatabaseOperationResult } from '../lib/databaseService';

interface CampaignFormProps {
  onSubmit?: (formData: CampaignRequest, saveResult?: DatabaseOperationResult<CampaignRequest>) => void;
  isSubmitting?: boolean;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isSubmitting: externalSubmitting = false }) => {
  // Form input state
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>('Sales');
  const [dailyBudget, setDailyBudget] = useState('100');
  const [targetCountry, setTargetCountry] = useState('United States');
  const [competitors, setCompetitors] = useState('');

  // UI & Submission state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const isSubmitting = externalSubmitting || internalSubmitting;

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Success state with generated database request ID
  const [savedSuccessResult, setSavedSuccessResult] = useState<{
    id: string;
    request: CampaignRequest;
    isSupabase: boolean;
    warningMessage?: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState(false);

  // Country filtering
  const filteredCountries = COUNTRY_OPTIONS.filter((c) =>
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  const selectedCountryObj = COUNTRY_OPTIONS.find((c) => c.name === targetCountry) || COUNTRY_OPTIONS[0];

  const handleValidation = (): boolean => {
    const rawPayload: Partial<CampaignRequest> = {
      product_name: productName,
      product_description: productDescription,
      product_price: productPrice,
      landing_page_url: landingPageUrl,
      campaign_goal: campaignGoal,
      daily_budget: dailyBudget,
      target_country: targetCountry,
      competitors: competitors,
    };

    const result = validateCampaignRequest(rawPayload);
    setValidationErrors(result.errors);

    if (!result.isValid) {
      // Focus on first failing field
      const firstKey = Object.keys(result.errors)[0];
      if (firstKey) {
        const el = document.getElementById(`field-${firstKey}`);
        if (el) el.focus();
      }
    }

    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setSavedSuccessResult(null);

    // 1. Validate required fields
    if (!handleValidation()) {
      return;
    }

    const payload: CampaignRequest = {
      product_name: productName.trim(),
      product_description: productDescription.trim(),
      product_price: productPrice.trim(),
      landing_page_url: landingPageUrl.trim(),
      campaign_goal: campaignGoal,
      daily_budget: dailyBudget.trim(),
      target_country: targetCountry,
      competitors: competitors.trim(),
    };

    setInternalSubmitting(true);

    try {
      // 2. Save campaign request into Supabase `campaign_requests` table
      const saveResult = await saveCampaignRequestToSupabase(payload);

      if (saveResult.success && saveResult.id) {
        // Show success notification & newly created campaign request ID
        setSavedSuccessResult({
          id: saveResult.id,
          request: saveResult.data,
          isSupabase: saveResult.isSupabase,
          warningMessage: saveResult.error,
        });

        // Trigger parent handler if provided
        if (onSubmit) {
          onSubmit(saveResult.data, saveResult);
        }
      } else {
        // Handle database insertion error
        setSubmissionError(saveResult.error || 'Failed to save campaign request to Supabase.');
      }
    } catch (err: any) {
      setSubmissionError(err?.message || 'Unexpected exception occurred while saving request.');
    } finally {
      setInternalSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (savedSuccessResult?.id) {
      navigator.clipboard.writeText(savedSuccessResult.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Preset quick fill
  const loadPreset = (type: 'saas' | 'ecom') => {
    setValidationErrors({});
    setSubmissionError(null);
    setSavedSuccessResult(null);

    if (type === 'saas') {
      setProductName('AdPilot AI Pro');
      setProductDescription('AI-powered advertising automation platform for Facebook & Instagram that builds campaign strategies, ad copy, and interest targeting in minutes.');
      setProductPrice('149.00');
      setLandingPageUrl('https://adpilot.ai/pricing');
      setCampaignGoal('Sales');
      setDailyBudget('150');
      setTargetCountry('United States');
      setCompetitors('MadGiK, Smartly.io, Revealbot, Hootsuite');
    } else {
      setProductName('Lumina Sleep Mask');
      setProductDescription('Silk weighted blackout sleep mask with integrated Bluetooth 5.3 flat audio drivers and natural lavender aroma inserts for deep restorative sleep.');
      setProductPrice('79.00');
      setLandingPageUrl('https://luminasleep.com/products/mask');
      setCampaignGoal('Sales');
      setDailyBudget('100');
      setTargetCountry('United States');
      setCompetitors('Manta Sleep, Oura Ring, Therabody');
    }
  };

  const handleResetForm = () => {
    setSavedSuccessResult(null);
    setSubmissionError(null);
    setValidationErrors({});
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setLandingPageUrl('');
    setCampaignGoal('Sales');
    setDailyBudget('100');
    setTargetCountry('United States');
    setCompetitors('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Title Header */}
      <div className="mb-8 space-y-2 text-left">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-[#2563EB]">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Database Connected</span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Fill Demo:</span>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => loadPreset('saas')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md text-xs font-medium text-[#0F172A] transition-colors disabled:opacity-50"
            >
              <Building2 className="w-3 h-3 text-[#2563EB]" />
              <span>B2B SaaS</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => loadPreset('ecom')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md text-xs font-medium text-[#0F172A] transition-colors disabled:opacity-50"
            >
              <ShoppingBag className="w-3 h-3 text-[#16A34A]" />
              <span>eCommerce</span>
            </button>
          </div>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          AI Campaign Strategist
        </h1>
        <p className="text-sm text-[#64748B] font-normal leading-relaxed max-w-2xl">
          Enter your product details below. Clicking <strong>Generate AI Strategy</strong> validates all required fields and saves the campaign request into the Supabase <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-xs">campaign_requests</code> table.
        </p>
      </div>

      {/* SUCCESS STATE CARD (with created campaign_request ID) */}
      {savedSuccessResult && (
        <div className="mb-6 bg-emerald-50/90 border border-emerald-300 rounded-[12px] p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-[#16A34A] rounded-lg shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading text-lg font-bold text-[#0F172A]">
                    Campaign Request Created Successfully!
                  </h3>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    savedSuccessResult.isSupabase 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {savedSuccessResult.isSupabase ? 'Saved to Supabase Table' : 'Local Fallback Storage'}
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-1">
                  Record written to <code className="font-mono bg-white text-slate-900 px-1.5 py-0.5 rounded border border-emerald-200">campaign_requests</code>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs text-[#64748B] hover:text-[#0F172A] font-medium underline shrink-0"
            >
              New Request
            </button>
          </div>

          {/* Highlighted Campaign Request ID Box */}
          <div className="bg-white border border-emerald-200 rounded-lg p-4 flex items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] block">
                Created campaign_request ID
              </span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-bold font-mono text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {savedSuccessResult.id}
                </code>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md text-xs font-semibold text-[#0F172A] transition-colors"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span className="text-[#16A34A]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Warning notice if fallback was used */}
          {savedSuccessResult.warningMessage && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2.5 rounded-md flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{savedSuccessResult.warningMessage}</span>
            </p>
          )}

          {/* Summary table of saved record */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="bg-white/80 p-2.5 rounded border border-emerald-200/80">
              <span className="text-[#64748B] block text-[11px]">Product</span>
              <span className="font-semibold text-[#0F172A] truncate block">{savedSuccessResult.request.product_name}</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-emerald-200/80">
              <span className="text-[#64748B] block text-[11px]">Goal</span>
              <span className="font-semibold text-[#0F172A]">{savedSuccessResult.request.campaign_goal}</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-emerald-200/80">
              <span className="text-[#64748B] block text-[11px]">Daily Budget</span>
              <span className="font-semibold text-[#0F172A]">${savedSuccessResult.request.daily_budget}/day</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded border border-emerald-200/80">
              <span className="text-[#64748B] block text-[11px]">Target Country</span>
              <span className="font-semibold text-[#0F172A]">{savedSuccessResult.request.target_country}</span>
            </div>
          </div>
        </div>
      )}

      {/* ERROR STATE ALERT BANNER */}
      {submissionError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-[12px] p-4 flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#DC2626]">Supabase Saving Failed</h4>
              <p className="text-xs text-red-700 mt-0.5">{submissionError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmissionError(null)}
            className="text-xs text-red-600 hover:text-red-900 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Campaign Form Card */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-xs p-6 sm:p-8 space-y-6"
      >
        {/* Row 1: Product Name & Landing Page URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-1.5">
            <label htmlFor="field-product_name" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="field-product_name"
              type="text"
              disabled={isSubmitting}
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                if (validationErrors.product_name) {
                  setValidationErrors((prev) => ({ ...prev, product_name: '' }));
                }
              }}
              placeholder="e.g. AdPilot AI Pro or Lumina Sleep Mask"
              className={`
                w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:bg-slate-50
                ${validationErrors.product_name 
                  ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                  : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                }
              `}
            />
            {validationErrors.product_name && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationErrors.product_name}</span>
              </p>
            )}
          </div>

          {/* Landing Page URL */}
          <div className="space-y-1.5">
            <label htmlFor="field-landing_page_url" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Landing Page URL <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="field-landing_page_url"
                type="text"
                disabled={isSubmitting}
                value={landingPageUrl}
                onChange={(e) => {
                  setLandingPageUrl(e.target.value);
                  if (validationErrors.landing_page_url) {
                    setValidationErrors((prev) => ({ ...prev, landing_page_url: '' }));
                  }
                }}
                placeholder="https://yourwebsite.com/product"
                className={`
                  w-full bg-white border rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:bg-slate-50
                  ${validationErrors.landing_page_url 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
            </div>
            {validationErrors.landing_page_url && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationErrors.landing_page_url}</span>
              </p>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="field-product_description" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Description <span className="text-[#DC2626]">*</span>
            </label>
            <span className="text-[11px] text-[#64748B]">
              Be specific about benefits, features, & key value propositions.
            </span>
          </div>
          <textarea
            id="field-product_description"
            rows={4}
            disabled={isSubmitting}
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
              if (validationErrors.product_description) {
                setValidationErrors((prev) => ({ ...prev, product_description: '' }));
              }
            }}
            placeholder="Explain what your product does, what problems it solves, who your ideal buyers are, and what makes it unique compared to alternatives..."
            className={`
              w-full bg-white border rounded-lg p-3.5 text-sm text-[#0F172A] placeholder-[#64748B]
              transition-colors focus:outline-none focus:ring-1 resize-y min-h-[110px] disabled:opacity-60 disabled:bg-slate-50
              ${validationErrors.product_description 
                ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
              }
            `}
          />
          {validationErrors.product_description && (
            <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validationErrors.product_description}</span>
            </p>
          )}
        </div>

        {/* Row 2: Product Price, Campaign Goal, Daily Budget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Price */}
          <div className="space-y-1.5">
            <label htmlFor="field-product_price" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Price <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <span className="text-sm font-semibold text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 select-none">
                $
              </span>
              <input
                id="field-product_price"
                type="text"
                disabled={isSubmitting}
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                  if (validationErrors.product_price) {
                    setValidationErrors((prev) => ({ ...prev, product_price: '' }));
                  }
                }}
                placeholder="99.00"
                className={`
                  w-full bg-white border rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:bg-slate-50
                  ${validationErrors.product_price 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
            </div>
            {validationErrors.product_price && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationErrors.product_price}</span>
              </p>
            )}
          </div>

          {/* Campaign Goal */}
          <div className="space-y-1.5">
            <label htmlFor="field-campaign_goal" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Campaign Goal <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <select
                id="field-campaign_goal"
                disabled={isSubmitting}
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value as CampaignGoal)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] appearance-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors cursor-pointer pr-10 disabled:opacity-60 disabled:bg-slate-50"
              >
                <option value="Sales">Sales (Purchases / Conversions)</option>
                <option value="Leads">Leads (Forms / Signups)</option>
                <option value="Traffic">Traffic (Website Clicks)</option>
                <option value="Engagement">Engagement (Social Reach)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Daily Budget */}
          <div className="space-y-1.5">
            <label htmlFor="field-daily_budget" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Daily Budget <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <span className="text-sm font-semibold text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 select-none">
                $
              </span>
              <input
                id="field-daily_budget"
                type="text"
                disabled={isSubmitting}
                value={dailyBudget}
                onChange={(e) => {
                  setDailyBudget(e.target.value);
                  if (validationErrors.daily_budget) {
                    setValidationErrors((prev) => ({ ...prev, daily_budget: '' }));
                  }
                }}
                placeholder="100.00"
                className={`
                  w-full bg-white border rounded-lg pl-8 pr-12 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1 disabled:opacity-60 disabled:bg-slate-50
                  ${validationErrors.daily_budget 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
              <span className="text-xs text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 font-medium">
                /day
              </span>
            </div>
            {validationErrors.daily_budget && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{validationErrors.daily_budget}</span>
              </p>
            )}
          </div>
        </div>

        {/* Target Country */}
        <div className="space-y-1.5 relative">
          <label className="block text-xs font-semibold text-[#0F172A] tracking-wide">
            Target Country <span className="text-[#DC2626]">*</span>
          </label>

          <div className="relative">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] flex items-center justify-between hover:border-slate-300 transition-colors disabled:opacity-60 disabled:bg-slate-50"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{selectedCountryObj.flag}</span>
                <span className="font-medium text-[#0F172A]">{selectedCountryObj.name}</span>
                <span className="text-xs text-[#64748B]">({selectedCountryObj.code})</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Country Dropdown */}
            {isCountryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 overflow-hidden max-h-60 flex flex-col">
                <div className="p-2 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <input
                    type="text"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full bg-white border border-[#E2E8F0] rounded px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto flex-1 p-1 space-y-0.5">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setTargetCountry(c.name);
                        setIsCountryDropdownOpen(false);
                        setCountrySearchQuery('');
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-xs rounded hover:bg-[#F8FAFC] transition-colors text-left
                        ${targetCountry === c.name ? 'bg-blue-50 text-[#2563EB] font-semibold' : 'text-[#0F172A]'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      {targetCountry === c.name && <Check className="w-3.5 h-3.5 text-[#2563EB]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Competitors (Optional) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="field-competitors" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Competitors (Optional)
            </label>
            <span className="text-[11px] text-[#64748B]">Separate with commas</span>
          </div>
          <textarea
            id="field-competitors"
            rows={2}
            disabled={isSubmitting}
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            placeholder="e.g. Competitor Brand A, Brand B, Major Market Player..."
            className="w-full bg-white border border-[#E2E8F0] rounded-lg p-3 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-y min-h-[70px] disabled:opacity-60 disabled:bg-slate-50"
          />
        </div>

        {/* Submission Action & Loading State Indicator */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-[#64748B] flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-[#2563EB]" />
            <span>Validates fields and inserts record into Supabase <code className="text-slate-700">campaign_requests</code></span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full sm:w-auto px-7 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99]
              text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-150
              flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white fill-white/20" />
                <span>Generate AI Strategy</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

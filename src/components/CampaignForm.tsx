import React, { useState } from 'react';
import { 
  Sparkles, 
  DollarSign, 
  Globe, 
  Target, 
  TrendingUp, 
  Search, 
  Check, 
  ChevronDown, 
  AlertCircle,
  Wand2,
  Building2,
  ShoppingBag
} from 'lucide-react';
import { CampaignGoal, CampaignRequest } from '../types';
import { COUNTRY_OPTIONS } from '../lib/strategyGenerator';

interface CampaignFormProps {
  onSubmit: (formData: CampaignRequest) => void;
  isSubmitting?: boolean;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, isSubmitting = false }) => {
  // Form state
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [campaignGoal, setCampaignGoal] = useState<CampaignGoal>('Sales');
  const [dailyBudget, setDailyBudget] = useState('100');
  const [targetCountry, setTargetCountry] = useState('United States');
  const [competitors, setCompetitors] = useState('');

  // Dropdown & Search state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Country filtering
  const filteredCountries = COUNTRY_OPTIONS.filter((c) =>
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  const selectedCountryObj = COUNTRY_OPTIONS.find((c) => c.name === targetCountry) || COUNTRY_OPTIONS[0];

  const handleValidation = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!productDescription.trim()) {
      newErrors.productDescription = 'Product description is required';
    } else if (productDescription.trim().length < 15) {
      newErrors.productDescription = 'Please provide a bit more detail (at least 15 characters)';
    }

    if (!productPrice.trim()) {
      newErrors.productPrice = 'Price is required';
    }

    if (!landingPageUrl.trim()) {
      newErrors.landingPageUrl = 'Landing page URL is required';
    } else if (!landingPageUrl.startsWith('http://') && !landingPageUrl.startsWith('https://')) {
      newErrors.landingPageUrl = 'URL must start with http:// or https://';
    }

    if (!dailyBudget.trim()) {
      newErrors.dailyBudget = 'Daily budget is required';
    } else {
      const budgetVal = parseFloat(dailyBudget.replace(/[^0-9.]/g, ''));
      if (isNaN(budgetVal) || budgetVal < 5) {
        newErrors.dailyBudget = 'Minimum recommended budget is $5/day';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!handleValidation()) {
      // Scroll to first error smoothly
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(`field-${firstErrorKey}`);
        if (el) el.focus();
      }
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

    onSubmit(payload);
  };

  // Demo Presets for quick evaluation
  const loadPreset = (type: 'saas' | 'ecom') => {
    setErrors({});
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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Title & Subtitle */}
      <div className="mb-8 space-y-2 text-left">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-semibold text-[#2563EB]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Facebook & Instagram Strategy Engine</span>
          </div>

          {/* Preset Fill Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Fill Demo:</span>
            <button
              type="button"
              onClick={() => loadPreset('saas')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md text-xs font-medium text-[#0F172A] transition-colors"
            >
              <Building2 className="w-3 h-3 text-[#2563EB]" />
              <span>B2B SaaS</span>
            </button>
            <button
              type="button"
              onClick={() => loadPreset('ecom')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] rounded-md text-xs font-medium text-[#0F172A] transition-colors"
            >
              <ShoppingBag className="w-3 h-3 text-[#16A34A]" />
              <span>eCommerce</span>
            </button>
          </div>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          AI Campaign Strategist
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] font-normal leading-relaxed max-w-2xl">
          Describe your product and let AI build a complete Facebook & Instagram advertising strategy in minutes.
        </p>
      </div>

      {/* Main Campaign Form Card */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-xs p-6 sm:p-8 space-y-6"
      >
        {/* Row 1: Product Name & Landing Page URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-1.5">
            <label htmlFor="field-productName" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="field-productName"
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                if (errors.productName) setErrors((prev) => ({ ...prev, productName: '' }));
              }}
              placeholder="e.g. AdPilot AI Pro or Lumina Sleep Mask"
              className={`
                w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                transition-colors focus:outline-none focus:ring-1
                ${errors.productName 
                  ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                  : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                }
              `}
            />
            {errors.productName && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.productName}</span>
              </p>
            )}
          </div>

          {/* Landing Page URL */}
          <div className="space-y-1.5">
            <label htmlFor="field-landingPageUrl" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Landing Page URL <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="field-landingPageUrl"
                type="text"
                value={landingPageUrl}
                onChange={(e) => {
                  setLandingPageUrl(e.target.value);
                  if (errors.landingPageUrl) setErrors((prev) => ({ ...prev, landingPageUrl: '' }));
                }}
                placeholder="https://yourwebsite.com/product"
                className={`
                  w-full bg-white border rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1
                  ${errors.landingPageUrl 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
            </div>
            {errors.landingPageUrl && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.landingPageUrl}</span>
              </p>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="field-productDescription" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Description <span className="text-[#DC2626]">*</span>
            </label>
            <span className="text-[11px] text-[#64748B]">
              Be specific about benefits, features, & key value propositions.
            </span>
          </div>
          <textarea
            id="field-productDescription"
            rows={4}
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
              if (errors.productDescription) setErrors((prev) => ({ ...prev, productDescription: '' }));
            }}
            placeholder="Explain what your product does, what problems it solves, who your ideal buyers are, and what makes it unique compared to alternatives..."
            className={`
              w-full bg-white border rounded-lg p-3.5 text-sm text-[#0F172A] placeholder-[#64748B]
              transition-colors focus:outline-none focus:ring-1 resize-y min-h-[110px]
              ${errors.productDescription 
                ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
              }
            `}
          />
          {errors.productDescription && (
            <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.productDescription}</span>
            </p>
          )}
        </div>

        {/* Row 2: Product Price, Campaign Goal, Daily Budget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Price */}
          <div className="space-y-1.5">
            <label htmlFor="field-productPrice" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Product Price <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <span className="text-sm font-semibold text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 select-none">
                $
              </span>
              <input
                id="field-productPrice"
                type="text"
                value={productPrice}
                onChange={(e) => {
                  setProductPrice(e.target.value);
                  if (errors.productPrice) setErrors((prev) => ({ ...prev, productPrice: '' }));
                }}
                placeholder="99.00"
                className={`
                  w-full bg-white border rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1
                  ${errors.productPrice 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
            </div>
            {errors.productPrice && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.productPrice}</span>
              </p>
            )}
          </div>

          {/* Campaign Goal */}
          <div className="space-y-1.5">
            <label htmlFor="field-campaignGoal" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Campaign Goal <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <select
                id="field-campaignGoal"
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value as CampaignGoal)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] appearance-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors cursor-pointer pr-10"
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
            <label htmlFor="field-dailyBudget" className="block text-xs font-semibold text-[#0F172A] tracking-wide">
              Daily Budget <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <span className="text-sm font-semibold text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 select-none">
                $
              </span>
              <input
                id="field-dailyBudget"
                type="text"
                value={dailyBudget}
                onChange={(e) => {
                  setDailyBudget(e.target.value);
                  if (errors.dailyBudget) setErrors((prev) => ({ ...prev, dailyBudget: '' }));
                }}
                placeholder="100.00"
                className={`
                  w-full bg-white border rounded-lg pl-8 pr-12 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
                  transition-colors focus:outline-none focus:ring-1
                  ${errors.dailyBudget 
                    ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]' 
                    : 'border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]'
                  }
                `}
              />
              <span className="text-xs text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 font-medium">
                /day
              </span>
            </div>
            {errors.dailyBudget && (
              <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.dailyBudget}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Target Country & Searchable Dropdown */}
        <div className="space-y-1.5 relative">
          <label className="block text-xs font-semibold text-[#0F172A] tracking-wide">
            Target Country <span className="text-[#DC2626]">*</span>
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{selectedCountryObj.flag}</span>
                <span className="font-medium text-[#0F172A]">{selectedCountryObj.name}</span>
                <span className="text-xs text-[#64748B]">({selectedCountryObj.code})</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Searchable Dropdown Modal/List */}
            {isCountryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 overflow-hidden max-h-60 flex flex-col">
                <div className="p-2 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={countrySearchQuery}
                      onChange={(e) => setCountrySearchQuery(e.target.value)}
                      placeholder="Search country..."
                      className="w-full bg-white border border-[#E2E8F0] rounded pl-8 pr-2 py-1 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-1 space-y-0.5">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c) => (
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
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-[#64748B]">No countries found</div>
                  )}
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
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            placeholder="e.g. Competitor Brand A, Brand B, Major Market Player..."
            className="w-full bg-white border border-[#E2E8F0] rounded-lg p-3 text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors resize-y min-h-[70px]"
          />
        </div>

        {/* Form Submit Button */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-[#64748B] flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-[#2563EB]" />
            <span>Generates CBO budget structure, ad sets, interest clusters & copy variants</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full sm:w-auto px-7 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99]
              text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-150
              flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Sparkles className="w-4 h-4 text-white fill-white/20" />
            <span>Generate AI Strategy</span>
          </button>
        </div>
      </form>
    </div>
  );
};

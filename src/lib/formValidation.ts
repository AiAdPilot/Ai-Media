import { CampaignRequest } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateCampaignRequest(data: Partial<CampaignRequest>): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Product Name
  if (!data.product_name || !data.product_name.trim()) {
    errors.product_name = 'Product name is required';
  }

  // 2. Product Description
  if (!data.product_description || !data.product_description.trim()) {
    errors.product_description = 'Product description is required';
  } else if (data.product_description.trim().length < 15) {
    errors.product_description = 'Please provide more detail (at least 15 characters)';
  }

  // 3. Product Price
  if (data.product_price === undefined || data.product_price === null || data.product_price === '') {
    errors.product_price = 'Price is required';
  } else {
    const numericPrice = typeof data.product_price === 'number' 
      ? data.product_price 
      : parseFloat(data.product_price.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice) || numericPrice < 0) {
      errors.product_price = 'Price must be a valid positive number';
    }
  }

  // 4. Landing Page URL
  if (!data.landing_page_url || !data.landing_page_url.trim()) {
    errors.landing_page_url = 'Landing page URL is required';
  } else {
    const trimmedUrl = data.landing_page_url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      errors.landing_page_url = 'URL must start with http:// or https://';
    }
  }

  // 5. Campaign Goal
  const validGoals = ['Sales', 'Leads', 'Traffic', 'Engagement'];
  if (!data.campaign_goal || !validGoals.includes(data.campaign_goal)) {
    errors.campaign_goal = 'Please select a valid campaign goal';
  }

  // 6. Daily Budget
  if (data.daily_budget === undefined || data.daily_budget === null || data.daily_budget === '') {
    errors.daily_budget = 'Daily budget is required';
  } else {
    const numericBudget = typeof data.daily_budget === 'number'
      ? data.daily_budget
      : parseFloat(data.daily_budget.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(numericBudget) || numericBudget < 5) {
      errors.daily_budget = 'Minimum recommended budget is $5/day';
    }
  }

  // 7. Target Country
  if (!data.target_country || !data.target_country.trim()) {
    errors.target_country = 'Target country is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

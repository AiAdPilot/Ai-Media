import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get Supabase server client
function getSupabaseClient(customUrl?: string, customKey?: string) {
  const url = customUrl || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = customKey || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Default campaign_strategist prompt template fallback with multi-stage reasoning
const DEFAULT_CAMPAIGN_STRATEGIST_PROMPT = {
  system_prompt: `You are AdPilot AI, an elite Tier-1 Management Consulting & Performance Growth Intelligence Engine (McKinsey/Bain caliber).

You execute a rigorous multi-stage strategic reasoning evaluation on every campaign brief:

STAGE 1: INTERNAL DISCOVERY & DIAGNOSIS
- Business Model & Revenue Engine
- Product Value Proposition & Moat
- Offer Packaging & Friction Points
- Pricing Structure & Unit Economics
- Market Sophistication Stage (Eugene Schwartz 5 Stages)
- Customer Awareness Level (Unaware -> Problem Aware -> Solution Aware -> Product Aware)
- Core Pain Points & Desired Emotional Transformation
- Competitor Positioning & Differentiation Gap
- Landing Page Quality & Conversion Friction
- Budget Feasibility & Scaling Viability

STAGE 2: EXECUTIVE SYNTHESIS & TACTICAL DEPLOYMENT
Synthesize your findings into a high-precision, executive-ready Campaign Intelligence Strategy report.

You MUST output strictly valid JSON conforming exactly to the JSON schema requested, with no surrounding markdown formatting or introductory text.`,

  user_prompt: `Perform a multi-stage campaign intelligence analysis on the following product brief:

Product Brief:
- Product Name: {{product_name}}
- Description: {{product_description}}
- Price: \${{product_price}}
- Landing Page URL: {{landing_page_url}}
- Campaign Goal: {{campaign_goal}}
- Daily Budget: \${{daily_budget}}/day
- Target Country: {{target_country}}
- Competitors: {{competitors}}

Return a structured executive briefing in pure JSON matching this exact structure:
{
  "executive_summary": "High-level Bain/McKinsey style strategic synthesis of the campaign opportunity and growth thesis.",
  "scores": {
    "offer_score": 88,
    "campaign_score": 92,
    "confidence_score": 95,
    "offer_grade": "A+",
    "campaign_grade": "92/100"
  },
  "market_opportunity": "Detailed market breakdown, TAM/SAM sizing notes, and competitive positioning gap.",
  "recommended_campaign_objective": "Sales / Conversions (Advantage+ Budget Optimization)",
  "internal_analysis": {
    "business_model": "D2C E-Commerce / B2B SaaS",
    "product_core_value": "Primary outcome delivered",
    "offer_structure": "Risk-reversal offer analysis",
    "pricing_evaluation": "Margin & price elasticity assessment",
    "market_sophistication_stage": "Stage 3: Feature Dominance & Solution Focus",
    "customer_awareness_level": "Problem-Aware to Solution-Seeking",
    "customer_pain_points": ["Pain point 1", "Pain point 2", "Pain point 3"],
    "desired_transformation": "Before vs After transformation statement",
    "competitor_positioning_gap": "Key vulnerability in competitor messaging",
    "landing_page_quality_verdict": "UX and conversion friction evaluation",
    "budget_feasibility_verdict": "Feasibility assessment for test and scaling budgets"
  },
  "swot_analysis": {
    "strengths": ["Strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
    "threats": ["Threat 1", "Threat 2"]
  },
  "audience_strategy": {
    "clusters": [
      {
        "name": "TOFU Broad Prospecting",
        "size": "2.4M - 3.8M",
        "tier": "TOFU (Prospecting)",
        "interests": ["Interest 1", "Interest 2"],
        "behaviors": ["Behavior 1"],
        "demographics": "Ages 25-54, All Genders",
        "rationale": "Why this cluster converts"
      }
    ],
    "interest_targeting": ["Interest A", "Interest B", "Interest C", "Interest D"],
    "behaviour_targeting": ["Engaged Shoppers", "High Income Top 25%", "Tech Early Adopters"],
    "placement_strategy": {
      "facebook_feed": "Primary narrative driver with static/carousel format",
      "instagram_reels_stories": "Vertical 9:16 hook-heavy video UGC content",
      "advantage_plus_network": "Automatic placement with strict CPA guardrails",
      "summary": "Multi-placement Advantage+ deployment"
    }
  },
  "creative_strategy": [
    {
      "type": "UGC Problem/Solution Video",
      "format": "Vertical Video (9:16)",
      "hook_script": "3-second opening hook verbal script",
      "visual_brief": "Visual storyboard instructions for creator",
      "angle_type": "Direct Response Pain-Point"
    }
  ],
  "messaging_strategy": {
    "angles": [
      {
        "angle_title": "Angle Title",
        "target_persona": "Persona",
        "headline": "Ad Headline",
        "primary_text": "Ad Body Copy",
        "call_to_action": "Shop Now",
        "hook_type": "Pattern Interrupt"
      }
    ],
    "hooks": [
      "Hook Option 1",
      "Hook Option 2",
      "Hook Option 3"
    ],
    "core_value_proposition": "Core value proposition string"
  },
  "budget_allocation": {
    "tofu_percent": 60,
    "mofu_percent": 25,
    "bofu_percent": 15,
    "tofu_amount": 60,
    "mofu_amount": 25,
    "bofu_amount": 15,
    "stages": [
      {
        "stage": "TOFU Cold Prospecting",
        "percentage": 60,
        "daily_amount": "$60/day",
        "focus": "Cold Traffic Scale"
      }
    ]
  },
  "optimization_recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3",
    "Recommendation 4"
  ],
  "scaling_playbook": [
    "Horizontal scaling method",
    "Vertical budget scaling rules (+20% every 48 hours)"
  ],
  "risks_and_mitigation": [
    {
      "risk": "Risk factor 1",
      "mitigation": "Mitigation tactic 1"
    }
  ],
  "action_plan": [
    {
      "day_range": "Days 1 - 3",
      "phase": "Pixel & Campaign Foundation",
      "tasks": ["Task 1", "Task 2"]
    },
    {
      "day_range": "Days 4 - 7",
      "phase": "Creative Batch Launch",
      "tasks": ["Task 3", "Task 4"]
    },
    {
      "day_range": "Days 8 - 14",
      "phase": "Optimization & CBO Scaling",
      "tasks": ["Task 5", "Task 6"]
    }
  ]
}`
};

// API Endpoint: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AdPilot AI Intelligence Engine' });
});

// API Endpoint: Generate Strategy using Gemini 2.5 Pro and Supabase
app.post('/api/generate-strategy', async (req, res) => {
  try {
    const { campaignRequest, supabaseUrl, supabaseAnonKey } = req.body;

    if (!campaignRequest || !campaignRequest.product_name) {
      return res.status(400).json({ success: false, error: 'Campaign brief data is required' });
    }

    const supabase = getSupabaseClient(supabaseUrl, supabaseAnonKey);

    // 1. Fetch prompt template `campaign_strategist` from prompt_templates table
    let systemPrompt = DEFAULT_CAMPAIGN_STRATEGIST_PROMPT.system_prompt;
    let userPromptTemplate = DEFAULT_CAMPAIGN_STRATEGIST_PROMPT.user_prompt;

    if (supabase) {
      try {
        const { data: templateData } = await supabase
          .from('prompt_templates')
          .select('*')
          .or('name.eq.campaign_strategist,id.eq.campaign_strategist')
          .maybeSingle();

        if (templateData) {
          if (templateData.system_prompt) systemPrompt = templateData.system_prompt;
          if (templateData.user_prompt) userPromptTemplate = templateData.user_prompt;
          else if (templateData.template) userPromptTemplate = templateData.template;
        }
      } catch (err) {
        console.warn('Could not query prompt_templates from Supabase, using default template:', err);
      }
    }

    // 2. Combine system prompt, user prompt, and campaign brief into final prompt
    let formattedUserPrompt = userPromptTemplate
      .replace(/{{product_name}}/g, campaignRequest.product_name || '')
      .replace(/{{product_description}}/g, campaignRequest.product_description || '')
      .replace(/{{product_price}}/g, String(campaignRequest.product_price || ''))
      .replace(/{{landing_page_url}}/g, campaignRequest.landing_page_url || '')
      .replace(/{{campaign_goal}}/g, campaignRequest.campaign_goal || 'Sales')
      .replace(/{{daily_budget}}/g, String(campaignRequest.daily_budget || '100'))
      .replace(/{{target_country}}/g, campaignRequest.target_country || 'United States')
      .replace(/{{competitors}}/g, campaignRequest.competitors || 'None specified');

    const combinedPrompt = `${systemPrompt}\n\n${formattedUserPrompt}\n\nFull Raw Campaign Brief Object:\n${JSON.stringify(campaignRequest, null, 2)}`;

    // 3. Call Gemini using @google/genai SDK
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable missing');
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let rawText = '';
    // Use gemini-2.5-pro or gemini-3.1-pro-preview / gemini-3.6-flash as model
    const preferredModels = ['gemini-2.5-pro', 'gemini-3.1-pro-preview', 'gemini-3.6-flash'];
    let lastError: any = null;

    for (const modelName of preferredModels) {
      try {
        const geminiResponse = await ai.models.generateContent({
          model: modelName,
          contents: combinedPrompt,
          config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        });
        rawText = geminiResponse.text || '';
        if (rawText) break;
      } catch (e) {
        lastError = e;
        console.warn(`Model ${modelName} call failed, trying next model:`, e);
      }
    }

    if (!rawText) {
      throw new Error(lastError?.message || 'Failed to get response from Gemini model');
    }

    // 4. Parse JSON response
    let parsedStrategy: any;
    try {
      // Remove any markdown fencing if present
      const cleanJson = rawText.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
      parsedStrategy = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', rawText);
      return res.status(500).json({
        success: false,
        error: 'Failed to parse AI strategy output format',
        rawOutput: rawText,
      });
    }

    // Attach metadata
    const finalStrategy = {
      id: `strat_${Date.now().toString(36)}`,
      campaign_request_id: campaignRequest.id,
      created_at: new Date().toISOString(),
      ...parsedStrategy,
    };

    // 5. Save the response into campaign_strategies.strategy_json
    let savedToSupabase = false;
    if (supabase && campaignRequest.id) {
      try {
        const { error: insertErr } = await supabase
          .from('campaign_strategies')
          .insert([
            {
              id: finalStrategy.id,
              campaign_request_id: campaignRequest.id,
              strategy_json: JSON.stringify(finalStrategy),
              created_at: finalStrategy.created_at,
            },
          ]);

        if (!insertErr) {
          savedToSupabase = true;
        } else {
          console.warn('Error inserting into campaign_strategies table:', insertErr.message);
        }
      } catch (dbErr) {
        console.warn('Exception writing to campaign_strategies table:', dbErr);
      }
    }

    return res.json({
      success: true,
      strategy: finalStrategy,
      campaignRequestId: campaignRequest.id,
      savedToSupabase,
    });
  } catch (error: any) {
    console.error('Error in /api/generate-strategy:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate campaign strategy',
    });
  }
});

// Vite middleware setup (development) / Static file serving (production)
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();

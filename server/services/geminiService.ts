import { GoogleGenAI } from '@google/genai';
import { PlanResult } from '../../src/types/index.js';
import { validateAndOptimizePlan } from './budgetOptimizer.js';
import {
  generateFallbackHomePlan,
  generateFallbackPartyPlan,
  generateFallbackJewelryPlan,
} from './fallbackGenerator.js';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  }
  return cleaned;
}

export async function generateHomePlanWithGemini(input: any): Promise<PlanResult> {
  const userBudget = Math.max(1000, Number(input.budget) || 50000);
  const ai = getGeminiClient();

  if (!ai) {
    console.log('[PocketSmart] No GEMINI_API_KEY found, using rule-based fallback for Home Planner.');
    return generateFallbackHomePlan(input);
  }

  const prompt = `
You are PocketSmart AI's Home Interior Budget Assistant.
Analyze the user's home interior requirements and create practical, budget-conscious recommendations.
CRITICAL CONSTRAINT: Total allocated amount MUST NOT exceed the user's total budget of ₹${userBudget}.
Do NOT invent fake retail URLs, fake stock availability, or fake product IDs. Every item is an AI recommendation/estimate.

User Input:
- Total Budget: ₹${userBudget}
- Room Type: ${input.roomType || 'Living Room'}
- Style Preference: ${input.style || 'Modern'}
- Items Requested: ${JSON.stringify(input.items || [])}
- Additional Requirements: ${input.requirements || 'None'}

Return ONLY valid JSON matching this exact structure:
{
  "title": "${input.style || 'Modern'} ${input.roomType || 'Living Room'} Budget Plan",
  "summary": "Brief 2-sentence summary of the design and budget allocation strategy",
  "categories": [
    {
      "category": "Furniture & Seating",
      "allocatedAmount": 25000,
      "recommendations": [
        {
          "name": "3-Seater Ergonomic Sofa",
          "category": "Furniture",
          "quantity": 1,
          "estimatedUnitPrice": 22000,
          "estimatedTotalPrice": 22000,
          "reason": "Why this item fits their layout and style",
          "styleMatch": "Neutral textured fabric matching modern aesthetics",
          "budgetImpact": "Essential centerpiece purchase",
          "alternative": "Modular futon or 2-seater set to save ₹6,000",
          "vendor": "AI Curated Estimate"
        }
      ]
    }
  ],
  "tips": [
    "Practical actionable tip 1",
    "Practical actionable tip 2",
    "Practical actionable tip 3"
  ],
  "warnings": []
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are PocketSmart AI's Home Interior Budget Assistant. Analyze the user's home requirements and create practical, budget-conscious recommendations. Never exceed the provided budget.",
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from Gemini');
    const parsed = JSON.parse(cleanJsonString(text));

    parsed.type = 'home';
    parsed.currency = 'INR';
    parsed.aiMode = 'gemini';
    parsed.modelUsed = 'gemini-3.8-flash';
    parsed.rawInput = input;

    return validateAndOptimizePlan(parsed, userBudget);
  } catch (err: any) {
    console.error('[PocketSmart] Gemini Home error, falling back:', err?.message || err);
    const fallback = generateFallbackHomePlan(input);
    fallback.warnings.push('Generated using PocketSmart Offline Engine due to transient AI service interruption.');
    return fallback;
  }
}

export async function generatePartyPlanWithGemini(input: any): Promise<PlanResult> {
  const userBudget = Math.max(1000, Number(input.budget) || 50000);
  const ai = getGeminiClient();

  if (!ai) {
    console.log('[PocketSmart] No GEMINI_API_KEY found, using rule-based fallback for Party Planner.');
    return generateFallbackPartyPlan(input);
  }

  const prompt = `
You are PocketSmart AI's Event Budget Assistant.
Create a practical event plan based on guest count, event type, venue, and budget.
CRITICAL CONSTRAINT: Total allocated amount across all categories (Catering, Venue, Decoration, Entertainment, Reserve) MUST NOT exceed ₹${userBudget}.
Do NOT invent fake retail URLs or claim real-time stock availability without live APIs.
You can reference vendor platforms such as Swiggy, Zomato, OYO, and Urban Company as estimated benchmarks.

User Input:
- Total Budget: ₹${userBudget}
- Guest Count: ${input.guestCount || 50}
- Event Type: ${input.eventType || 'Birthday'}
- Venue: ${input.venue || 'Banquet Hall'}
- Food Preference: ${input.foodPreference || 'Mixed'}
- Decoration Style: ${input.decorationStyle || 'Elegant'}
- Entertainment: ${Array.isArray(input.entertainment) ? input.entertainment.join(', ') : 'Music'}
- Additional Requirements: ${input.requirements || 'None'}

Return ONLY valid JSON matching this exact structure:
{
  "title": "${input.eventType || 'Party'} Event Plan for ${input.guestCount || 50} Guests",
  "summary": "Brief 2-sentence summary of budget distribution and guest experience",
  "categories": [
    {
      "category": "Catering & Refreshments",
      "allocatedAmount": 20000,
      "recommendations": [
        {
          "name": "Live Buffet Spread with Starters",
          "category": "Catering",
          "quantity": ${input.guestCount || 50},
          "estimatedUnitPrice": 400,
          "estimatedTotalPrice": 20000,
          "reason": "Satisfying menu catering to ${input.foodPreference || 'Mixed'} guests",
          "styleMatch": "Celebratory banquet menu",
          "budgetImpact": "Primary per-guest catering expenditure",
          "alternative": "Set meal trays or high-tea buffet saves ₹100 per person",
          "vendor": "Swiggy / Zomato Bulk Catering Estimate"
        }
      ]
    },
    {
      "category": "Venue & Facilities",
      "allocatedAmount": 15000,
      "recommendations": [
        {
          "name": "${input.venue || 'Banquet'} Rental & Setup",
          "category": "Venue",
          "quantity": 1,
          "estimatedUnitPrice": 15000,
          "estimatedTotalPrice": 15000,
          "reason": "Fits ${input.guestCount || 50} people comfortably",
          "styleMatch": "Event hall ambiance",
          "budgetImpact": "Fixed cost",
          "alternative": "Non-peak afternoon booking saves 20%",
          "vendor": "OYO Event Spaces / Local Banquet Estimate"
        }
      ]
    },
    {
      "category": "Decorations & Ambience",
      "allocatedAmount": 8000,
      "recommendations": [
        {
          "name": "${input.decorationStyle || 'Elegant'} Photo Backdrop & Table Setup",
          "category": "Decoration",
          "quantity": 1,
          "estimatedUnitPrice": 8000,
          "estimatedTotalPrice": 8000,
          "reason": "Creates celebratory focal point",
          "styleMatch": "Matches ${input.decorationStyle || 'Elegant'} theme",
          "budgetImpact": "Aesthetic enhancement",
          "alternative": "DIY balloon and fairy light kit saves ₹3,500",
          "vendor": "AI Curated Decor Partner"
        }
      ]
    },
    {
      "category": "Entertainment & Photography",
      "allocatedAmount": 5000,
      "recommendations": [
        {
          "name": "Audio System & Candid Photographer",
          "category": "Entertainment",
          "quantity": 1,
          "estimatedUnitPrice": 5000,
          "estimatedTotalPrice": 5000,
          "reason": "Captures event memories and sets celebratory vibe",
          "styleMatch": "Engaging ambiance",
          "budgetImpact": "Guest experience investment",
          "alternative": "Digital curated music playlist & friend camera setup",
          "vendor": "AI Curated Media Partner"
        }
      ]
    }
  ],
  "tips": [
    "Practical party tip 1",
    "Practical party tip 2",
    "Practical party tip 3"
  ],
  "warnings": []
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are PocketSmart AI's Event Budget Assistant. Create a practical event plan based on guest count, event type, venue and budget. Allocate spending intelligently and never exceed the budget.",
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from Gemini');
    const parsed = JSON.parse(cleanJsonString(text));

    parsed.type = 'party';
    parsed.currency = 'INR';
    parsed.aiMode = 'gemini';
    parsed.modelUsed = 'gemini-3.8-flash';
    parsed.rawInput = input;

    return validateAndOptimizePlan(parsed, userBudget);
  } catch (err: any) {
    console.error('[PocketSmart] Gemini Party error, falling back:', err?.message || err);
    const fallback = generateFallbackPartyPlan(input);
    fallback.warnings.push('Generated using PocketSmart Offline Engine due to transient AI service interruption.');
    return fallback;
  }
}

export async function generateJewelryPlanWithGemini(input: any): Promise<PlanResult> {
  const userBudget = Math.max(500, Number(input.budget) || 25000);
  const ai = getGeminiClient();

  if (!ai) {
    console.log('[PocketSmart] No GEMINI_API_KEY found, using rule-based fallback for Jewelry Planner.');
    return generateFallbackJewelryPlan(input);
  }

  const promptText = `
You are PocketSmart AI's Jewelry Recommendation Assistant.
Recommend jewelry based on budget, occasion, style, metal preference, and outfit information.
If an outfit image is provided, analyze visible characteristics (dominant colors, embroidery, neckline, sleeve pattern, overall aesthetic) and use them to personalize recommendations.
Do not claim certainty about details that are not visible.
CRITICAL CONSTRAINT: Total estimated cost MUST NOT exceed ₹${userBudget}.
Do NOT invent real brand names, real retail listings, or fake URLs. Label estimates clearly.

User Specifications:
- Total Budget: ₹${userBudget}
- Occasion: ${input.occasion || 'Wedding / Festive'}
- Jewelry Type: ${input.jewelryType || 'Complete Set'}
- Style: ${input.style || 'Traditional'}
- Metal Preference: ${input.metalPreference || 'Gold Plated / Artificial'}
- Outfit Description: ${input.outfitDescription || 'Festive attire'}
- Outfit Image Attached: ${input.image ? 'YES (Analyze visual attributes)' : 'NO'}

Return ONLY valid JSON matching this exact structure:
{
  "title": "${input.style || 'Elegant'} Jewelry Ensemble for ${input.occasion || 'Special Occasion'}",
  "summary": "Brief 2-sentence rationale for these jewelry selections matching the attire and budget",
  "outfitAnalysis": {
    "dominantColors": ["Primary color 1", "Accent color 2"],
    "outfitStyle": "E.g. Traditional Zari Saree / Contemporary Evening Gown",
    "traditionalOrModern": "Traditional / Modern / Indo-Western",
    "neckline": "Visible neckline description or general styling recommendation",
    "sleevePattern": "Sleeve description or general recommendation",
    "embroideryOrWork": "Observed embroidery, stones, or fabric texture",
    "overallAesthetic": "Summary aesthetic description",
    "recommendedJewelryColors": ["Warm Gold", "Emerald Green", "Pearl"],
    "recommendedJewelryStyles": ["Temple Jewelry", "Choker", "Jhumka"]
  },
  "categories": [
    {
      "category": "Necklace & Chokers",
      "allocatedAmount": 14000,
      "recommendations": [
        {
          "name": "${input.style || 'Traditional'} ${input.metalPreference || 'Gold'} Statement Necklace",
          "category": "Necklace",
          "quantity": 1,
          "estimatedUnitPrice": 14000,
          "estimatedTotalPrice": 14000,
          "reason": "Harmonizes with neckline and adds regal presence without overpowering",
          "styleMatch": "${input.style || 'Traditional'} filigree and stone detailing",
          "material": "${input.metalPreference || 'Gold Plated'}",
          "occasionSuitability": "${input.occasion || 'Wedding'}",
          "outfitCompatibility": "Complements ${input.outfitDescription || 'the outfit'}",
          "budgetImpact": "Centerpiece purchase",
          "alternative": "Lighter pendant necklace with intricate chain saves ₹4,000",
          "vendor": "AI Curated Jewelry Studio"
        }
      ]
    },
    {
      "category": "Earrings & Hair Ornaments",
      "allocatedAmount": 7000,
      "recommendations": [
        {
          "name": "Coordinated Drop Earrings / Jhumkas",
          "category": "Earrings",
          "quantity": 1,
          "estimatedUnitPrice": 7000,
          "estimatedTotalPrice": 7000,
          "reason": "Frames the face beautifully and matches the metal tone of the necklace",
          "styleMatch": "Echoes design motifs of the main necklace",
          "material": "${input.metalPreference || 'Gold Plated'}",
          "occasionSuitability": "${input.occasion || 'Festive'}",
          "outfitCompatibility": "Echoes border motifs in outfit",
          "budgetImpact": "Balanced styling accent",
          "alternative": "Stud earrings with semi-precious stone drops save ₹2,000",
          "vendor": "AI Curated Jewelry Studio"
        }
      ]
    },
    {
      "category": "Bracelets & Rings",
      "allocatedAmount": 3500,
      "recommendations": [
        {
          "name": "Matching Bangles / Statement Cocktail Ring",
          "category": "Wristwear / Rings",
          "quantity": 1,
          "estimatedUnitPrice": 3500,
          "estimatedTotalPrice": 3500,
          "reason": "Adds sparkling gesture accents while keeping within remaining funds",
          "styleMatch": "Fine textured finish",
          "material": "${input.metalPreference || 'Gold Plated'}",
          "occasionSuitability": "${input.occasion || 'Evening'}",
          "outfitCompatibility": "Complements sleeve edges",
          "budgetImpact": "Finishing touch",
          "alternative": "Minimalist stackable bands save ₹1,200",
          "vendor": "AI Curated Jewelry Studio"
        }
      ]
    }
  ],
  "tips": [
    "Practical jewelry care or styling tip 1",
    "Practical jewelry care or styling tip 2",
    "Practical jewelry care or styling tip 3"
  ],
  "warnings": []
}
`;

  try {
    let contentsPayload: any = promptText;

    if (input.image && input.image.data) {
      const mimeType = input.image.mimeType || 'image/jpeg';
      let base64 = input.image.data;
      if (base64.includes('base64,')) {
        base64 = base64.split('base64,')[1];
      }
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64,
            },
          },
          {
            text: promptText,
          },
        ],
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction: "You are PocketSmart AI's Jewelry Recommendation Assistant. Recommend jewelry based on budget, occasion, style and outfit information. If an image is provided, analyze only visible characteristics and use them to personalize recommendations.",
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from Gemini');
    const parsed = JSON.parse(cleanJsonString(text));

    parsed.type = 'jewelry';
    parsed.currency = 'INR';
    parsed.aiMode = 'gemini';
    parsed.modelUsed = 'gemini-3.8-flash';
    parsed.rawInput = input;

    return validateAndOptimizePlan(parsed, userBudget);
  } catch (err: any) {
    console.error('[PocketSmart] Gemini Jewelry error, falling back:', err?.message || err);
    const fallback = generateFallbackJewelryPlan(input);
    fallback.warnings.push('Generated using PocketSmart Offline Engine due to transient AI service interruption.');
    return fallback;
  }
}

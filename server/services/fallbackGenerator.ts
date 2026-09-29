import { PlanResult } from '../../src/types/index.js';
import { validateAndOptimizePlan } from './budgetOptimizer.js';

export function generateFallbackHomePlan(input: any): PlanResult {
  const budget = Math.max(1000, Number(input.budget) || 50000);
  const room = input.roomType || 'Living Room';
  const style = input.style || 'Modern';
  const items = Array.isArray(input.items) && input.items.length > 0 ? input.items : [
    { name: 'Sofa Set', quantity: 1, category: 'Furniture' },
    { name: 'Warm Ambient Lighting', quantity: 4, category: 'Lighting' },
    { name: 'Center Coffee Table', quantity: 1, category: 'Furniture' },
    { name: 'Curtains & Blinds', quantity: 2, category: 'Decor' },
  ];

  // Allocation proportions: Furniture ~45%, Lighting ~20%, Decor ~15%, Utilities/Reserve ~20%
  const numItems = items.length;
  const budgetPerItem = (budget * 0.85) / numItems;

  const categoriesMap: { [cat: string]: any[] } = {
    'Furniture & Seating': [],
    'Lighting & Ambiance': [],
    'Decor & Accents': [],
  };

  items.forEach((item: any, idx: number) => {
    const qty = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(100, Math.round(budgetPerItem / qty));
    const recItem = {
      id: `fallback-home-${idx}-${Date.now()}`,
      name: `${item.name} (${style} series)`,
      category: item.category || (idx % 2 === 0 ? 'Furniture & Seating' : 'Lighting & Ambiance'),
      quantity: qty,
      estimatedUnitPrice: unitPrice,
      estimatedTotalPrice: unitPrice * qty,
      reason: `Matches your ${style.toLowerCase()} ${room.toLowerCase()} layout while balancing durable materials with price efficiency.`,
      styleMatch: `${style} aesthetic with clean ergonomics`,
      budgetImpact: `Allocates approx. ${Math.round(((unitPrice * qty) / budget) * 100)}% of total funds`,
      alternative: `Pre-assembled flat-pack engineered wood alternative saves 20%`,
      sourceType: 'ai_estimate' as const,
      vendor: 'AI Curated Estimate',
    };

    const targetCat = item.category?.toLowerCase().includes('light')
      ? 'Lighting & Ambiance'
      : item.category?.toLowerCase().includes('decor') || item.category?.toLowerCase().includes('curtain')
      ? 'Decor & Accents'
      : 'Furniture & Seating';

    if (!categoriesMap[targetCat]) categoriesMap[targetCat] = [];
    categoriesMap[targetCat].push(recItem);
  });

  const categories = Object.keys(categoriesMap)
    .filter((key) => categoriesMap[key].length > 0)
    .map((key) => ({
      category: key,
      allocatedAmount: categoriesMap[key].reduce((acc, curr) => acc + curr.estimatedTotalPrice, 0),
      percentage: 0,
      recommendations: categoriesMap[key],
    }));

  const rawPlan: Partial<PlanResult> = {
    id: `plan-home-${Date.now()}`,
    type: 'home',
    title: `${style} ${room} Interior Budget Plan`,
    currency: 'INR',
    summary: `Structured ${style.toLowerCase()} interior plan for your ${room.toLowerCase()} designed to maximize visual appeal and comfort within ₹${budget.toLocaleString('en-IN')}.`,
    categories,
    tips: [
      'Prioritize high-traffic items (seating & main lighting) over purely decorative accents.',
      'Check local clearance sales or modular multi-functional pieces for higher utility.',
      'Leave at least 10% contingency budget for shipping and carpenter assembly fees.',
    ],
    warnings: [],
    aiMode: 'fallback',
    modelUsed: 'PocketSmart Rule-Based AI Engine (Offline Fallback)',
    rawInput: input,
  };

  return validateAndOptimizePlan(rawPlan, budget);
}

export function generateFallbackPartyPlan(input: any): PlanResult {
  const budget = Math.max(1000, Number(input.budget) || 50000);
  const guests = Math.max(5, Number(input.guestCount) || 50);
  const eventType = input.eventType || 'Celebration';
  const venue = input.venue || 'Banquet Hall';
  const foodPref = input.foodPreference || 'Mixed';
  const decorStyle = input.decorationStyle || 'Elegant';
  const entertainment = Array.isArray(input.entertainment) && input.entertainment.length > 0
    ? input.entertainment.join(', ')
    : 'Music playlist & Photography';

  // Smart budget distribution: Catering 45%, Venue 25%, Decor 15%, Entertainment 10%, Emergency 5%
  const cateringTotal = Math.round(budget * 0.44);
  const perGuestCost = Math.round(cateringTotal / guests);
  const venueCost = Math.round(budget * 0.24);
  const decorCost = Math.round(budget * 0.14);
  const entertainmentCost = Math.round(budget * 0.11);

  const categories = [
    {
      category: 'Catering & Beverages',
      allocatedAmount: cateringTotal,
      percentage: 44,
      recommendations: [
        {
          id: `party-rec-cat-1-${Date.now()}`,
          name: `${foodPref} Multi-Course Buffet & Welcome Drinks`,
          category: 'Catering',
          quantity: guests,
          estimatedUnitPrice: perGuestCost,
          estimatedTotalPrice: cateringTotal,
          reason: `Generous 3-course spread configured for ${guests} guests with appetizers, main courses, and desserts.`,
          styleMatch: `${foodPref} celebration menu`,
          budgetImpact: `Approx. ₹${perGuestCost}/guest, keeping catering under 45% of total budget`,
          alternative: `Fixed platter / box catering saves ₹80 per guest`,
          sourceType: 'ai_estimate' as const,
          vendor: 'Swiggy / Zomato Bulk Catering Estimate',
        },
      ],
    },
    {
      category: 'Venue & Seating',
      allocatedAmount: venueCost,
      percentage: 24,
      recommendations: [
        {
          id: `party-rec-ven-1-${Date.now()}`,
          name: `${venue} Space Booking & Basic Utilities`,
          category: 'Venue',
          quantity: 1,
          estimatedUnitPrice: venueCost,
          estimatedTotalPrice: venueCost,
          reason: `Ample capacity for ${guests} attendees with air conditioning, stage, and restroom facilities.`,
          styleMatch: `Matches ${venue.toLowerCase()} event hospitality`,
          budgetImpact: 'Standard venue slot pricing',
          alternative: 'Community hall or outdoor lawn off-peak slot saves 25%',
          sourceType: 'ai_estimate' as const,
          vendor: 'OYO Event Spaces / Local Banquet Estimate',
        },
      ],
    },
    {
      category: 'Decoration & Lighting',
      allocatedAmount: decorCost,
      percentage: 14,
      recommendations: [
        {
          id: `party-rec-dec-1-${Date.now()}`,
          name: `${decorStyle} Backdrop, Table Centerpieces & Fairy Lights`,
          category: 'Decoration',
          quantity: 1,
          estimatedUnitPrice: decorCost,
          estimatedTotalPrice: decorCost,
          reason: `Creates an Instagrammable focal photo wall and ambient mood lighting matching ${eventType}.`,
          styleMatch: `${decorStyle} theme`,
          budgetImpact: 'Efficient modular stage setup',
          alternative: 'DIY balloon arches & LED drape rentals save 30%',
          sourceType: 'ai_estimate' as const,
          vendor: 'AI Estimated Decor Partner',
        },
      ],
    },
    {
      category: 'Entertainment & Media',
      allocatedAmount: entertainmentCost,
      percentage: 11,
      recommendations: [
        {
          id: `party-rec-ent-1-${Date.now()}`,
          name: `${entertainment} Coverage Package`,
          category: 'Entertainment',
          quantity: 1,
          estimatedUnitPrice: entertainmentCost,
          estimatedTotalPrice: entertainmentCost,
          reason: `Keeps guests engaged and captures high-resolution keepsake memories throughout the evening.`,
          styleMatch: 'High energy and festive engagement',
          budgetImpact: 'Essential event entertainment budget',
          alternative: 'Candid digital-only photographer package saves ₹3,000',
          sourceType: 'ai_estimate' as const,
          vendor: 'AI Estimated Media Vendor',
        },
      ],
    },
  ];

  const rawPlan: Partial<PlanResult> = {
    id: `plan-party-${Date.now()}`,
    type: 'party',
    title: `${eventType} Event Planning (${guests} Guests)`,
    currency: 'INR',
    summary: `End-to-end budget allocation for your ${eventType.toLowerCase()} with ${guests} guests at ${venue.toLowerCase()}, averaging ₹${Math.round(budget / guests)} per attendee.`,
    categories,
    tips: [
      `Confirm guest RSVPs 4 days early to adjust final catering plates and avoid per-plate waste.`,
      `Bring your own celebration cake or signature mocktail syrups if the venue allows outside dessert.`,
      `Create a shared digital album QR code on tables so guests can upload photos for free.`,
    ],
    warnings: perGuestCost < 250 ? ['Budget per guest is under ₹250. We recommend simple snacks or afternoon high-tea format.'] : [],
    aiMode: 'fallback',
    modelUsed: 'PocketSmart Event Rule Engine (Offline Fallback)',
    rawInput: input,
  };

  return validateAndOptimizePlan(rawPlan, budget);
}

export function generateFallbackJewelryPlan(input: any): PlanResult {
  const budget = Math.max(500, Number(input.budget) || 25000);
  const occasion = input.occasion || 'Festival / Wedding';
  const jewelryType = input.jewelryType || 'Complete Set';
  const style = input.style || 'Traditional';
  const metal = input.metalPreference || 'Gold Plated / Artificial';
  const outfitDesc = input.outfitDescription || 'Festive attire';

  // Jewelry distribution
  const necklacePrice = Math.round(budget * 0.52);
  const earringsPrice = Math.round(budget * 0.28);
  const braceletPrice = Math.round(budget * 0.14);

  const categories = [
    {
      category: 'Statement Centerpiece',
      allocatedAmount: necklacePrice,
      percentage: 52,
      recommendations: [
        {
          id: `jewel-rec-1-${Date.now()}`,
          name: `${style} ${metal} Choker / Necklace Set`,
          category: 'Necklace',
          quantity: 1,
          estimatedUnitPrice: necklacePrice,
          estimatedTotalPrice: necklacePrice,
          reason: `Draws eyes upward and complements the neckline and silhouette of ${outfitDesc}.`,
          styleMatch: `${style} craftsmanship in ${metal}`,
          material: metal,
          occasionSuitability: occasion,
          outfitCompatibility: `Accentuates ${outfitDesc}`,
          budgetImpact: 'Primary focal piece (approx. 52% of budget)',
          alternative: 'Semi-precious stone necklace with matching cord',
          sourceType: 'ai_estimate' as const,
          vendor: 'AI Curated Jewelry Studio',
        },
      ],
    },
    {
      category: 'Earrings & Jhumkas',
      allocatedAmount: earringsPrice,
      percentage: 28,
      recommendations: [
        {
          id: `jewel-rec-2-${Date.now()}`,
          name: `${style} Intricate Drop Earrings / Chandbalis`,
          category: 'Earrings',
          quantity: 1,
          estimatedUnitPrice: earringsPrice,
          estimatedTotalPrice: earringsPrice,
          reason: `Balances facial contours and harmonizes with the neckpiece without overwhelming the look.`,
          styleMatch: `${style} detailing`,
          material: metal,
          occasionSuitability: occasion,
          outfitCompatibility: `Matches fabric tones and borders`,
          budgetImpact: 'Secondary complementary accent',
          alternative: 'Minimalist gemstone studs for lighter daytime wear',
          sourceType: 'ai_estimate' as const,
          vendor: 'AI Curated Jewelry Studio',
        },
      ],
    },
    {
      category: 'Wristwear & Rings',
      allocatedAmount: braceletPrice,
      percentage: 14,
      recommendations: [
        {
          id: `jewel-rec-3-${Date.now()}`,
          name: `Adjustable ${metal} Cuff / Kangan Pair`,
          category: 'Bangles / Bracelet',
          quantity: 1,
          estimatedUnitPrice: braceletPrice,
          estimatedTotalPrice: braceletPrice,
          reason: `Adds elegant wrist movement that catches ambient event lighting gracefully.`,
          styleMatch: `${style} finish`,
          material: metal,
          occasionSuitability: occasion,
          outfitCompatibility: 'Matches sleeve borders and arm cuffs',
          budgetImpact: 'Finishing flourish',
          alternative: 'Stackable minimalist band set',
          sourceType: 'ai_estimate' as const,
          vendor: 'AI Curated Jewelry Studio',
        },
      ],
    },
  ];

  const rawPlan: Partial<PlanResult> = {
    id: `plan-jewel-${Date.now()}`,
    type: 'jewelry',
    title: `${style} ${jewelryType} Collection for ${occasion}`,
    currency: 'INR',
    summary: `Handpicked ${style.toLowerCase()} ${metal.toLowerCase()} jewelry suite curated to flatter ${outfitDesc} within ₹${budget.toLocaleString('en-IN')}.`,
    categories,
    tips: [
      'Store artificial and gold-plated jewelry in airtight zip pouches away from perfume spray to preserve luster.',
      'If your outfit neckline already features heavy gold zardozi embroidery, keep the necklace subtle and highlight statement earrings.',
      'Check hallmark or plating micron thickness guarantees when purchasing precious and demi-fine pieces.',
    ],
    warnings: [],
    aiMode: 'fallback',
    modelUsed: 'PocketSmart Jewelry Stylist Engine (Offline Fallback)',
    rawInput: input,
    outfitAnalysis: {
      dominantColors: ['Warm Gold', 'Rich Royal Accent', 'Neutral Base'],
      outfitStyle: style,
      traditionalOrModern: style.toLowerCase().includes('trad') ? 'Traditional Classic' : 'Contemporary Fusion',
      neckline: 'Complementary scoop / sweetheart neckline',
      sleevePattern: 'Fitted border or sleeveless silhouette',
      embroideryOrWork: 'Lustrous borders & metallic accents',
      overallAesthetic: `${style} celebration attire suitable for ${occasion}`,
      recommendedJewelryColors: [metal, 'Ruby Red Accent', 'Warm Champagne'],
      recommendedJewelryStyles: [style, 'Layered Elegance', 'Polki/Kundan finish'],
    },
  };

  return validateAndOptimizePlan(rawPlan, budget);
}

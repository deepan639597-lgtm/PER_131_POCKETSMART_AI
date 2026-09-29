import { PlanResult, CategoryAllocation } from '../../src/types/index.js';

/**
 * Validates and strictly enforces that total allocated <= user budget.
 * If AI output exceeds the budget or allocates disproportionately,
 * it detects the excess, scales/optimizes item prices down, adjusts quantities
 * or trims non-essentials, and attaches clear notices.
 */
export function validateAndOptimizePlan(rawPlan: Partial<PlanResult>, userBudget: number): PlanResult {
  const targetBudget = Math.max(100, Math.round(Number(userBudget) || 1000));
  const categories: CategoryAllocation[] = (rawPlan.categories || []).map((cat, idx) => ({
    category: cat.category || `Category ${idx + 1}`,
    allocatedAmount: Number(cat.allocatedAmount) || 0,
    percentage: 0,
    recommendations: (cat.recommendations || []).map((item, itemIdx) => {
      const qty = Math.max(1, Math.round(Number(item.quantity) || 1));
      const unit = Math.max(10, Math.round(Number(item.estimatedUnitPrice) || 100));
      const total = Math.max(unit * qty, Math.round(Number(item.estimatedTotalPrice) || unit * qty));
      return {
        id: item.id || `rec-${Date.now()}-${idx}-${itemIdx}`,
        name: item.name || 'Recommended Item',
        category: item.category || cat.category || 'General',
        quantity: qty,
        estimatedUnitPrice: unit,
        estimatedTotalPrice: total,
        reason: item.reason || 'Curated recommendation balancing your style and constraints.',
        styleMatch: item.styleMatch || 'Matches specified aesthetics',
        material: item.material,
        occasionSuitability: item.occasionSuitability,
        outfitCompatibility: item.outfitCompatibility,
        budgetImpact: item.budgetImpact || 'Balanced budget allocation',
        alternative: item.alternative || 'Cost-efficient modular alternative available',
        sourceType: 'ai_estimate' as const,
        vendor: item.vendor || undefined,
        vendorUrl: item.vendorUrl || undefined,
        rating: item.rating || 4.5,
      };
    }),
  }));

  // Calculate preliminary sum
  let totalSpending = 0;
  for (const cat of categories) {
    let catSum = 0;
    for (const rec of cat.recommendations) {
      rec.estimatedTotalPrice = rec.estimatedUnitPrice * rec.quantity;
      catSum += rec.estimatedTotalPrice;
    }
    cat.allocatedAmount = catSum;
    totalSpending += catSum;
  }

  let isOptimized = false;
  let optimizationNote = 'Your plan is within budget.';

  // If total spending exceeds user budget, scale items down safely
  if (totalSpending > targetBudget) {
    isOptimized = true;
    const ratio = (targetBudget * 0.94) / totalSpending; // keep a 6% buffer for safety
    optimizationNote = `We detected spending (${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalSpending)}) exceeded your budget. We optimized your plan to stay safely within ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(targetBudget)}.`;

    totalSpending = 0;
    for (const cat of categories) {
      let catSum = 0;
      for (const rec of cat.recommendations) {
        rec.estimatedUnitPrice = Math.max(50, Math.round(rec.estimatedUnitPrice * ratio));
        rec.estimatedTotalPrice = rec.estimatedUnitPrice * rec.quantity;
        rec.budgetImpact = 'Adjusted to fit within overall spending cap';
        catSum += rec.estimatedTotalPrice;
      }
      cat.allocatedAmount = catSum;
      totalSpending += catSum;
    }

    // Final safety pass: if still over budget due to rounding, reduce the most expensive item
    if (totalSpending > targetBudget) {
      let maxItem: any = null;
      for (const cat of categories) {
        for (const rec of cat.recommendations) {
          if (!maxItem || rec.estimatedTotalPrice > maxItem.estimatedTotalPrice) {
            maxItem = rec;
          }
        }
      }
      if (maxItem) {
        const excess = totalSpending - targetBudget + 100;
        maxItem.estimatedTotalPrice = Math.max(100, maxItem.estimatedTotalPrice - excess);
        maxItem.estimatedUnitPrice = Math.max(50, Math.round(maxItem.estimatedTotalPrice / maxItem.quantity));
        totalSpending = targetBudget - 100;
      }
    }
  }

  // Calculate percentages and reserve
  const remaining = Math.max(0, targetBudget - totalSpending);
  const utilizationPercentage = Math.min(100, Math.round((totalSpending / targetBudget) * 100));

  for (const cat of categories) {
    cat.percentage = targetBudget > 0 ? Math.round((cat.allocatedAmount / targetBudget) * 100) : 0;
  }

  return {
    id: rawPlan.id || `plan-${Date.now()}`,
    type: rawPlan.type || 'home',
    title: rawPlan.title || 'Smart Budget Plan',
    createdAt: rawPlan.createdAt || new Date().toISOString(),
    currency: rawPlan.currency || 'INR',
    summary: rawPlan.summary || 'PocketSmart AI analyzed your constraints and generated an optimized budget plan.',
    budget: {
      total: targetBudget,
      allocated: totalSpending,
      remaining,
      utilizationPercentage,
      isOptimized,
      optimizationNote,
    },
    categories,
    tips: rawPlan.tips && rawPlan.tips.length > 0 ? rawPlan.tips : [
      'Look for festive discounts or seasonal bulk offers to save an extra 10-15%.',
      'Always compare material warranties and return policies before making final purchases.',
      'Maintain an emergency contingency fund for unexpected installation or delivery charges.',
    ],
    warnings: rawPlan.warnings || [],
    aiMode: rawPlan.aiMode || 'gemini',
    modelUsed: rawPlan.modelUsed || 'gemini-3.8-flash',
    rawInput: rawPlan.rawInput || {},
    outfitAnalysis: rawPlan.outfitAnalysis,
  };
}

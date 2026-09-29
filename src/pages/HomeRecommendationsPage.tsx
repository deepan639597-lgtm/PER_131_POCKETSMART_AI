import React, { useState } from 'react';
import {
  Home,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Plus,
  Bookmark,
  Share2,
  Download,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { PlanResult, RecommendationItem } from '../types';
import { BudgetCard } from '../components/BudgetCard';
import { BudgetProgress } from '../components/BudgetProgress';
import { RecommendationCard } from '../components/RecommendationCard';
import { RecommendationDetailModal } from '../components/RecommendationDetailModal';
import { AlternativesModal } from '../components/AlternativesModal';
import { useToast } from '../components/Toast';

interface HomeRecommendationsPageProps {
  plan: PlanResult;
  onBackToPlanner: () => void;
  onSaveItem: (item: RecommendationItem) => void;
  onRegenerate: () => void;
  onUpdatePlan: (updatedPlan: PlanResult) => void;
  savedItemIds: string[];
}

export const HomeRecommendationsPage: React.FC<HomeRecommendationsPageProps> = ({
  plan,
  onBackToPlanner,
  onSaveItem,
  onRegenerate,
  onUpdatePlan,
  savedItemIds,
}) => {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailModalItem, setDetailModalItem] = useState<RecommendationItem | null>(null);
  const [alternativeModalItem, setAlternativeModalItem] = useState<RecommendationItem | null>(null);

  // Flatten all recommendation items
  const allItems: RecommendationItem[] = plan.categories.flatMap((c) => c.recommendations);
  const filteredItems = selectedCategory === 'all'
    ? allItems
    : allItems.filter((i) => i.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Remove an item and automatically recalculate allocations
  const handleRemoveItem = (itemId: string) => {
    const updatedCategories = plan.categories.map((cat) => ({
      ...cat,
      recommendations: cat.recommendations.filter((r) => r.id !== itemId),
      allocatedAmount: cat.recommendations
        .filter((r) => r.id !== itemId)
        .reduce((sum, r) => sum + r.estimatedTotalPrice, 0),
    }));

    const newAllocated = updatedCategories.reduce((sum, c) => sum + c.allocatedAmount, 0);
    const newRemaining = Math.max(0, plan.budget.total - newAllocated);
    const newPct = plan.budget.total > 0 ? Math.min(100, Math.round((newAllocated / plan.budget.total) * 100)) : 0;

    const updatedPlan: PlanResult = {
      ...plan,
      categories: updatedCategories,
      budget: {
        ...plan.budget,
        allocated: newAllocated,
        remaining: newRemaining,
        utilizationPercentage: newPct,
      },
    };

    onUpdatePlan(updatedPlan);
    showToast('Item removed. Budget recalculated automatically.', 'info');
  };

  // Swap an alternative into the plan
  const handleSwapAlternative = (oldId: string, newItem: RecommendationItem) => {
    const updatedCategories = plan.categories.map((cat) => {
      const idx = cat.recommendations.findIndex((r) => r.id === oldId);
      if (idx !== -1) {
        const newRecs = [...cat.recommendations];
        newRecs[idx] = newItem;
        return {
          ...cat,
          recommendations: newRecs,
          allocatedAmount: newRecs.reduce((sum, r) => sum + r.estimatedTotalPrice, 0),
        };
      }
      return cat;
    });

    const newAllocated = updatedCategories.reduce((sum, c) => sum + c.allocatedAmount, 0);
    const newRemaining = Math.max(0, plan.budget.total - newAllocated);
    const newPct = plan.budget.total > 0 ? Math.min(100, Math.round((newAllocated / plan.budget.total) * 100)) : 0;

    const updatedPlan: PlanResult = {
      ...plan,
      categories: updatedCategories,
      budget: {
        ...plan.budget,
        allocated: newAllocated,
        remaining: newRemaining,
        utilizationPercentage: newPct,
        isOptimized: newAllocated <= plan.budget.total,
      },
    };

    onUpdatePlan(updatedPlan);
    showToast(`Swapped with ${newItem.name}.`, 'success');
  };

  const handleExportPlan = () => {
    const summaryText = `
POCKETSMART AI — HOME INTERIOR BUDGET PLAN
Title: ${plan.title}
Total Budget: ₹${plan.budget.total.toLocaleString('en-IN')}
Estimated Cost: ₹${plan.budget.allocated.toLocaleString('en-IN')}
Remaining Reserve: ₹${plan.budget.remaining.toLocaleString('en-IN')}
Budget Utilization: ${plan.budget.utilizationPercentage}%

RECOMMENDED ITEMS:
${allItems.map((i) => `- ${i.name} (Qty: ${i.quantity}): ₹${i.estimatedTotalPrice.toLocaleString('en-IN')} [${i.category}]`).join('\n')}

TIPS:
${plan.tips.map((t) => `• ${t}`).join('\n')}
    `.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pocketsmart-home-plan-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Plan exported successfully.', 'success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPlanner}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Edit Input Requirements</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              Home Interior
            </span>
            {plan.aiMode === 'fallback' && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-500/30">
                Rule-Based Engine
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
            <span>Regenerate AI Plan</span>
          </button>
          <button
            onClick={handleExportPlan}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-md"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Plan</span>
          </button>
        </div>
      </div>

      {/* Plan Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          {plan.title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {plan.summary}
        </p>
      </div>

      {/* Fallback Banner Notice (Requirement 40) */}
      {plan.aiMode === 'fallback' && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Offline Resilience Mode Active</div>
            <p className="mt-0.5 text-amber-300/90 leading-relaxed">
              Gemini is currently unavailable or API key is not configured. Showing deterministic fallback recommendations with full mathematical budget guarantee.
            </p>
          </div>
        </div>
      )}

      {/* Budget Summary & Progress Bar */}
      <BudgetCard
        budget={plan.budget}
        currency={plan.currency}
        onExport={handleExportPlan}
      />

      <BudgetProgress
        categories={plan.categories}
        totalBudget={plan.budget.total}
        remainingBudget={plan.budget.remaining}
        currency={plan.currency}
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'border border-white/5 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            All Items ({allItems.length})
          </button>

          {plan.categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat.category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'border border-white/5 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              {cat.category} ({cat.recommendations.length})
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredItems.length} curated recommendation{filteredItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <RecommendationCard
            key={item.id}
            item={item}
            currency={plan.currency}
            isSaved={savedItemIds.includes(item.name)}
            onSave={(itemToSave) => {
              onSaveItem(itemToSave);
              showToast(`Saved "${itemToSave.name}" to your collection!`, 'success');
            }}
            onViewDetails={(itemToView) => setDetailModalItem(itemToView)}
            onFindAlternatives={(itemToAlt) => setAlternativeModalItem(itemToAlt)}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

      {/* AI Tips Section */}
      {plan.tips && plan.tips.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            <h3 className="text-base font-bold text-white font-heading">
              Smart Shopping & Cost-Saving Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plan.tips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-2xl bg-slate-950/70 p-4 border border-white/5 text-xs text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <RecommendationDetailModal
        item={detailModalItem}
        currency={plan.currency}
        isSaved={detailModalItem ? savedItemIds.includes(detailModalItem.name) : false}
        onClose={() => setDetailModalItem(null)}
        onSave={(item) => {
          onSaveItem(item);
          showToast(`Saved "${item.name}"!`, 'success');
        }}
        onFindAlternatives={(item) => setAlternativeModalItem(item)}
      />

      <AlternativesModal
        item={alternativeModalItem}
        currency={plan.currency}
        onClose={() => setAlternativeModalItem(null)}
        onSelectAlternative={handleSwapAlternative}
      />
    </div>
  );
};

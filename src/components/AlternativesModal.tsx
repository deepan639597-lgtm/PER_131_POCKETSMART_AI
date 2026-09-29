import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';
import { RecommendationItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface AlternativesModalProps {
  item: RecommendationItem | null;
  currency?: string;
  onClose: () => void;
  onSelectAlternative: (oldItemId: string, newItem: RecommendationItem) => void;
}

export const AlternativesModal: React.FC<AlternativesModalProps> = ({
  item,
  currency = 'INR',
  onClose,
  onSelectAlternative,
}) => {
  if (!item) return null;

  // Generate 3 smart alternatives derived from current item
  const unit = item.estimatedUnitPrice;
  const qty = item.quantity;

  const valueSaverPrice = Math.max(50, Math.round(unit * 0.72));
  const premiumUpgradePrice = Math.round(unit * 1.35);

  const alternatives: RecommendationItem[] = [
    {
      ...item,
      id: `alt-val-${Date.now()}`,
      name: `${item.name} (Budget-Optimized Tier)`,
      estimatedUnitPrice: valueSaverPrice,
      estimatedTotalPrice: valueSaverPrice * qty,
      reason: `Saves approx. ${formatCurrency((unit - valueSaverPrice) * qty, currency)} while preserving key functionality and visual balance.`,
      alternative: 'Engineered composite materials or off-season batch.',
      budgetImpact: `Frees up ${formatCurrency((unit - valueSaverPrice) * qty, currency)} in contingency funds.`,
    },
    {
      ...item,
      id: `alt-mod-${Date.now()}`,
      name: `${item.name} (Modular Compact Edition)`,
      estimatedUnitPrice: Math.round(unit * 0.88),
      estimatedTotalPrice: Math.round(unit * 0.88) * qty,
      reason: 'Space-saving design with multi-purpose ergonomics that simplifies setup and maintenance.',
      alternative: 'Collapsible or modular frame.',
      budgetImpact: 'Balanced utility-to-cost ratio.',
    },
    {
      ...item,
      id: `alt-prem-${Date.now()}`,
      name: `${item.name} (Premium Craftsmanship Edition)`,
      estimatedUnitPrice: premiumUpgradePrice,
      estimatedTotalPrice: premiumUpgradePrice * qty,
      reason: 'Extended durability warranty, enhanced finishes, and premium artisanal detailing.',
      alternative: 'Extended manufacturer warranty included.',
      budgetImpact: `Adds ${formatCurrency((premiumUpgradePrice - unit) * qty, currency)} to item allocation.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Smart Alternatives for &ldquo;{item.name}&rdquo;
            </h3>
            <p className="text-xs text-slate-400">
              Current: {formatCurrency(item.estimatedTotalPrice, currency)} ({item.quantity} units)
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {alternatives.map((alt, index) => {
            const isSaver = alt.estimatedTotalPrice < item.estimatedTotalPrice;
            return (
              <div
                key={alt.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-950/70 p-4 transition-all hover:border-indigo-500/40 hover:bg-slate-950"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {alt.name}
                    </span>
                    {isSaver && (
                      <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        <TrendingDown className="h-3 w-3" />
                        <span>Save Money</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{alt.reason}</p>
                  <div className="text-[11px] text-slate-500">{alt.budgetImpact}</div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-white font-heading">
                      {formatCurrency(alt.estimatedTotalPrice, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {formatCurrency(alt.estimatedUnitPrice, currency)}/unit
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAlternative(item.id, alt);
                      onClose();
                    }}
                    className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
                  >
                    <span>Swap Item</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Keep Original
          </button>
        </div>
      </div>
    </div>
  );
};

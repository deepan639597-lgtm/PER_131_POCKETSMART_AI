import React from 'react';
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  Share2,
} from 'lucide-react';
import { BudgetSummary } from '../types';
import { formatCurrency } from '../utils/formatters';

interface BudgetCardProps {
  budget: BudgetSummary;
  currency?: string;
  onExport?: () => void;
  onShare?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  budget,
  currency = 'INR',
  onExport,
  onShare,
}) => {
  const isHealthy = budget.remaining >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

      {/* Header status bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">Budget Intelligence Summary</h3>
            <p className="text-xs text-slate-400">Strict constraint validation & optimization</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {budget.isOptimized ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Optimized to Fit Budget</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Within Budget</span>
            </span>
          )}

          {onExport && (
            <button
              onClick={onExport}
              title="Download Plan Summary"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          )}

          {onShare && (
            <button
              onClick={onShare}
              title="Share Plan"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Optimization Note */}
      {budget.optimizationNote && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-900/80 p-3 text-xs text-slate-300 border border-white/5">
          <AlertCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{budget.optimizationNote}</p>
        </div>
      )}

      {/* Metric 4-Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Total Budget */}
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-slate-400">Total Budget</div>
          <div className="mt-1 text-lg sm:text-2xl font-extrabold text-white font-heading">
            {formatCurrency(budget.total, currency)}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">User Specified Cap</div>
        </div>

        {/* Estimated Spending */}
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-slate-400">Estimated Spending</div>
          <div className="mt-1 text-lg sm:text-2xl font-extrabold text-indigo-300 font-heading">
            {formatCurrency(budget.allocated, currency)}
          </div>
          <div className="mt-1 text-[11px] text-indigo-400/80 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>AI Calculated Total</span>
          </div>
        </div>

        {/* Remaining Reserve */}
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-slate-400">Remaining Budget</div>
          <div className={`mt-1 text-lg sm:text-2xl font-extrabold font-heading ${
            isHealthy ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {formatCurrency(budget.remaining, currency)}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400/80 flex items-center gap-1">
            <PiggyBank className="h-3 w-3" />
            <span>Contingency Buffer</span>
          </div>
        </div>

        {/* Utilization % */}
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4">
          <div className="text-xs font-medium text-slate-400">Budget Utilization</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-lg sm:text-2xl font-extrabold text-white font-heading">
              {budget.utilizationPercentage}%
            </span>
            <span className="text-xs text-slate-400">of cap</span>
          </div>
          {/* Micro Progress Bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                budget.utilizationPercentage > 95
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
              }`}
              style={{ width: `${Math.min(100, budget.utilizationPercentage)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CategoryAllocation } from '../types';
import { formatCurrency } from '../utils/formatters';
import { PieChart } from 'lucide-react';

interface BudgetProgressProps {
  categories: CategoryAllocation[];
  totalBudget: number;
  remainingBudget: number;
  currency?: string;
}

const CATEGORY_COLORS = [
  'bg-indigo-500 text-indigo-300 border-indigo-400/30',
  'bg-emerald-500 text-emerald-300 border-emerald-400/30',
  'bg-amber-500 text-amber-300 border-amber-400/30',
  'bg-pink-500 text-pink-300 border-pink-400/30',
  'bg-cyan-500 text-cyan-300 border-cyan-400/30',
  'bg-purple-500 text-purple-300 border-purple-400/30',
];

const RAW_BG_COLORS = [
  '#6366f1', // indigo-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#a855f7', // purple-500
];

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  categories,
  totalBudget,
  remainingBudget,
  currency = 'INR',
}) => {
  const remainingPct = totalBudget > 0 ? Math.max(0, Math.round((remainingBudget / totalBudget) * 100)) : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <PieChart className="h-4 w-4 text-indigo-400" />
          <h4 className="text-sm font-semibold text-white">Category Allocation Breakdown</h4>
        </div>
        <span className="text-xs text-slate-400">
          Target: {formatCurrency(totalBudget, currency)}
        </span>
      </div>

      {/* Multi-segment stacked progress bar */}
      <div className="h-4 w-full overflow-hidden rounded-full bg-slate-950 p-0.5 border border-white/5 flex gap-0.5">
        {categories.map((cat, idx) => {
          const pct = totalBudget > 0 ? (cat.allocatedAmount / totalBudget) * 100 : 0;
          if (pct <= 0) return null;
          return (
            <div
              key={cat.category}
              title={`${cat.category}: ${formatCurrency(cat.allocatedAmount, currency)} (${Math.round(pct)}%)`}
              className="h-full first:rounded-l-full transition-all duration-500 hover:opacity-90"
              style={{
                width: `${pct}%`,
                backgroundColor: RAW_BG_COLORS[idx % RAW_BG_COLORS.length],
              }}
            />
          );
        })}
        {remainingPct > 0 && (
          <div
            title={`Unallocated Reserve: ${formatCurrency(remainingBudget, currency)} (${remainingPct}%)`}
            className="h-full last:rounded-r-full bg-slate-800 transition-all duration-500 hover:opacity-90"
            style={{ width: `${remainingPct}%` }}
          />
        )}
      </div>

      {/* Breakdown Legend Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, idx) => {
          const colorClass = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
          const pct = totalBudget > 0 ? Math.round((cat.allocatedAmount / totalBudget) * 100) : 0;
          return (
            <div
              key={cat.category}
              className="flex items-center justify-between rounded-xl bg-slate-950/60 p-2.5 border border-white/5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: RAW_BG_COLORS[idx % RAW_BG_COLORS.length] }}
                />
                <span className="truncate text-xs font-medium text-slate-300">
                  {cat.category}
                </span>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="text-xs font-bold text-white">
                  {formatCurrency(cat.allocatedAmount, currency)}
                </div>
                <div className="text-[10px] text-slate-400">{pct}%</div>
              </div>
            </div>
          );
        })}

        {/* Unallocated Reserve Legend */}
        {remainingBudget > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-2.5 border border-white/5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700 shrink-0" />
              <span className="truncate text-xs font-medium text-slate-400">
                Reserve Fund
              </span>
            </div>
            <div className="text-right shrink-0 ml-2">
              <div className="text-xs font-bold text-emerald-400">
                {formatCurrency(remainingBudget, currency)}
              </div>
              <div className="text-[10px] text-slate-400">{remainingPct}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

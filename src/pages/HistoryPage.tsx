import React, { useState } from 'react';
import {
  History,
  Home,
  PartyPopper,
  Gem,
  Calendar,
  Wallet,
  Trash2,
  ArrowRight,
  Search,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PlanResult } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useToast } from '../components/Toast';

interface HistoryPageProps {
  history: PlanResult[];
  onSelectPlan: (plan: PlanResult) => void;
  onReusePlan: (plan: PlanResult) => void;
  onDeletePlan: (id: string) => void;
  currency?: string;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectPlan,
  onReusePlan,
  onDeletePlan,
  currency = 'INR',
}) => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = history.filter((p) => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `pocketsmart-history-${Date.now()}.json`);
    dlAnchorElem.click();
    showToast('All plan history exported as JSON.', 'success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <History className="h-4 w-4" />
            <span>Audit & Records</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Recommendation History
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Browse, re-open, reuse, or export your saved budget plans.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleExportAll}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all self-start sm:self-auto"
          >
            <Download className="h-4 w-4 text-indigo-400" />
            <span>Export All (JSON)</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute inset-y-0 left-0 pl-3.5 my-auto h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search plans by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'home', 'party', 'jewelry'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                filterType === type
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'border border-white/5 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Plans' : type}
            </button>
          ))}
        </div>
      </div>

      {/* History Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plan) => (
            <div
              key={plan.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:bg-slate-900/90 hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl p-2 bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {plan.type === 'home' && <Home className="h-4 w-4" />}
                      {plan.type === 'party' && <PartyPopper className="h-4 w-4" />}
                      {plan.type === 'jewelry' && <Gem className="h-4 w-4" />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {plan.type}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(plan.createdAt)}</span>
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {plan.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {plan.summary}
                </p>

                {/* Financial Metric Pill */}
                <div className="mt-4 rounded-2xl bg-slate-950/80 p-3 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Allocated</div>
                    <div className="text-sm font-extrabold text-white font-heading">
                      {formatCurrency(plan.budget.allocated, currency)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">User Budget</div>
                    <div className="text-xs font-bold text-emerald-400 font-heading">
                      {formatCurrency(plan.budget.total, currency)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-md"
                >
                  <span>Open Plan</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onReusePlan(plan);
                      showToast('Loaded plan inputs into form.', 'info');
                    }}
                    title="Reuse inputs in planner"
                    className="flex items-center gap-1 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <RotateCcw className="h-3 w-3 text-indigo-400" />
                    <span className="hidden sm:inline">Reuse</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this plan?')) {
                        onDeletePlan(plan.id);
                        showToast('Plan deleted from history.', 'info');
                      }
                    }}
                    title="Delete plan"
                    className="rounded-xl p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-12 text-center text-slate-400">
          <History className="mx-auto h-10 w-10 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white font-heading">No plans match your search</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Try a different keyword or start a new planning module from the menu.
          </p>
        </div>
      )}
    </div>
  );
};

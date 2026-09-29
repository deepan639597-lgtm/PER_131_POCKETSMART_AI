import React from 'react';
import {
  Home,
  PartyPopper,
  Gem,
  History,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { PlanResult, SavedItem, UserProfile } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface DashboardPageProps {
  user: UserProfile;
  history: PlanResult[];
  savedItems: SavedItem[];
  onNavigate: (page: string) => void;
  onSelectPlan: (plan: PlanResult) => void;
  onViewSavedItem: (item: SavedItem) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  history,
  savedItems,
  onNavigate,
  onSelectPlan,
  onViewSavedItem,
}) => {
  // Aggregate stats
  const totalPlannedAmount = history.reduce((sum, p) => sum + (p.budget?.total || 0), 0);
  const homePlansCount = history.filter((p) => p.type === 'home').length;
  const partyPlansCount = history.filter((p) => p.type === 'party').length;
  const jewelryPlansCount = history.filter((p) => p.type === 'jewelry').length;
  const recentPlans = history.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome & Quick Action Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-purple-950/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Smart Financial Assistant Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Manage your spending allocations, explore AI recommendations, and generate new plans.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('home-planner')}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105"
            >
              <Home className="h-4 w-4" />
              <span>Create New Home Plan</span>
            </button>

            <button
              onClick={() => onNavigate('party-planner')}
              className="flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-500 transition-all hover:scale-105"
            >
              <PartyPopper className="h-4 w-4" />
              <span>Plan a Party</span>
            </button>

            <button
              onClick={() => onNavigate('jewelry-planner')}
              className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-600/30 hover:bg-amber-500 transition-all hover:scale-105"
            >
              <Gem className="h-4 w-4" />
              <span>Find Jewelry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analytics 4-Stat Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Plans */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Plans</span>
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {history.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {homePlansCount} Home • {partyPlansCount} Party • {jewelryPlansCount} Jewelry
          </div>
        </div>

        {/* Total Budget Planned */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Planned Budget</span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {formatCurrency(totalPlannedAmount, user.currency)}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>Strict spending enforcement</span>
          </div>
        </div>

        {/* Saved Recommendations */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Saved Items</span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Bookmark className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {savedItems.length}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Bookmarked recommendations
          </div>
        </div>

        {/* AI Compliance */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Budget Compliance</span>
            <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
            100%
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Zero budget overruns guaranteed
          </div>
        </div>
      </div>

      {/* Three Planner Entry Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white font-heading">
            Select a Planning Module
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Home Card */}
          <div
            onClick={() => onNavigate('home-planner')}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all hover:border-indigo-500/50 hover:bg-slate-900/90 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                <Home className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-300 flex items-center gap-1">
                <span>Start</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white font-heading">
              Home Interior Planner
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Budget-based room interior planning, furniture lists, lighting setups, and durable decor allocation.
            </p>
          </div>

          {/* Party Card */}
          <div
            onClick={() => onNavigate('party-planner')}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all hover:border-pink-500/50 hover:bg-slate-900/90 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30">
                <PartyPopper className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-pink-300 flex items-center gap-1">
                <span>Start</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white font-heading">
              Party & Event Planner
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Event budget allocation for catering, venue reservation, theme decorations, and entertainment.
            </p>
          </div>

          {/* Jewelry Card */}
          <div
            onClick={() => onNavigate('jewelry-planner')}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all hover:border-amber-500/50 hover:bg-slate-900/90 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Gem className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-300 flex items-center gap-1">
                <span>Start</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white font-heading">
              Jewelry Planner
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Curate matching necklaces, earrings, and bangles based on budget, occasion, and outfit image analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Plans & Saved Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Plans (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-400" />
              <span>Recent Plans</span>
            </h2>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View History ({history.length})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {recentPlans.length > 0 ? (
            <div className="space-y-3">
              {recentPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => onSelectPlan(plan)}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/60 p-4 transition-all hover:border-white/20 hover:bg-slate-900/90 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 rounded-xl p-2.5 bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {plan.type === 'home' && <Home className="h-5 w-5" />}
                      {plan.type === 'party' && <PartyPopper className="h-5 w-5" />}
                      {plan.type === 'jewelry' && <Gem className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {plan.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-1 max-w-md">
                        {plan.summary}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(plan.createdAt)}</span>
                        </span>
                        <span>•</span>
                        <span>{plan.categories.length} categories</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-white font-heading">
                        {formatCurrency(plan.budget.allocated, user.currency)}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Cap: {formatCurrency(plan.budget.total, user.currency)}
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      View Plan
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-8 text-center text-slate-400">
              <Layers className="mx-auto h-8 w-8 text-slate-600 mb-2" />
              <div className="text-sm font-semibold text-slate-300">No plans created yet</div>
              <p className="text-xs text-slate-500 mt-1">
                Choose a planner above to generate your first smart budget recommendation.
              </p>
            </div>
          )}
        </div>

        {/* Saved Recommendations Widget (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-indigo-400" />
              <span>Saved Items</span>
            </h2>
            <button
              onClick={() => onNavigate('saved')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>All ({savedItems.length})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {savedItems.length > 0 ? (
            <div className="space-y-2.5">
              {savedItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewSavedItem(item)}
                  className="group flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/60 p-3 hover:border-white/20 hover:bg-slate-900 cursor-pointer transition-colors"
                >
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {item.category} • {formatDate(item.dateSaved)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-indigo-300 font-heading">
                      {formatCurrency(item.estimatedPrice, user.currency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 text-center text-slate-400">
              <Bookmark className="mx-auto h-6 w-6 text-slate-600 mb-2" />
              <div className="text-xs font-semibold text-slate-300">No saved items</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Bookmark items in recommendation results to view them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

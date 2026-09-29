import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Eye,
  RefreshCw,
  Trash2,
  Sparkles,
  Info,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { RecommendationItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface RecommendationCardProps {
  item: RecommendationItem;
  currency?: string;
  isSaved?: boolean;
  onSave?: (item: RecommendationItem) => void;
  onViewDetails?: (item: RecommendationItem) => void;
  onFindAlternatives?: (item: RecommendationItem) => void;
  onRemove?: (itemId: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  currency = 'INR',
  isSaved = false,
  onSave,
  onViewDetails,
  onFindAlternatives,
  onRemove,
}) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-indigo-500/10">
      {/* Top badges bar */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-lg bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-3 w-3" />
              <span>AI Recommendation</span>
            </span>
            {item.quantity > 1 && (
              <span className="rounded-lg bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-300">
                Qty: {item.quantity}
              </span>
            )}
          </div>

          {/* Quick Save button */}
          {onSave && (
            <button
              onClick={() => onSave(item)}
              title={isSaved ? 'Saved to collection' : 'Save recommendation'}
              className={`rounded-xl p-2 transition-colors ${
                isSaved
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Item Name */}
        <h4 className="mt-3 text-base font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
          {item.name}
        </h4>

        {/* Price Tag */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-white font-heading">
            {formatCurrency(item.estimatedTotalPrice, currency)}
          </span>
          {item.quantity > 1 && (
            <span className="text-xs text-slate-400">
              ({formatCurrency(item.estimatedUnitPrice, currency)} each)
            </span>
          )}
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">
            (Estimated)
          </span>
        </div>

        {/* Vendor disclosure */}
        {item.vendor && (
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Benchmark: {item.vendor}</span>
          </div>
        )}

        {/* AI Reason */}
        <div className="mt-3.5 rounded-xl bg-slate-950/60 p-3 border border-white/5 text-xs text-slate-300">
          <div className="font-semibold text-indigo-300 mb-1 flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>Why Recommended</span>
          </div>
          <p className="line-clamp-3 leading-relaxed text-slate-300">{item.reason}</p>
        </div>

        {/* Style Match & Specifications */}
        <div className="mt-3 space-y-1.5 text-xs text-slate-400">
          {item.styleMatch && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300">Style:</span>
              <span className="text-slate-400 truncate">{item.styleMatch}</span>
            </div>
          )}
          {item.material && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-300">Material:</span>
              <span className="text-slate-400 truncate">{item.material}</span>
            </div>
          )}
          {item.alternative && (
            <div className="rounded-lg bg-emerald-950/30 p-2 text-[11px] text-emerald-300/90 border border-emerald-500/20">
              <span className="font-semibold">Alternative: </span>
              {item.alternative}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons footer */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(item)}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Details</span>
            </button>
          )}

          {onFindAlternatives && (
            <button
              onClick={() => onFindAlternatives(item)}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Alternatives</span>
            </button>
          )}
        </div>

        {onRemove && (
          <button
            onClick={() => onRemove(item.id)}
            title="Remove from plan"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

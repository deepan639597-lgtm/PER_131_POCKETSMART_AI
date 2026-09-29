import React from 'react';
import {
  X,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  Tag,
  DollarSign,
  Layers,
  CheckCircle,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { RecommendationItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface RecommendationDetailModalProps {
  item: RecommendationItem | null;
  currency?: string;
  isSaved?: boolean;
  onClose: () => void;
  onSave?: (item: RecommendationItem) => void;
  onFindAlternatives?: (item: RecommendationItem) => void;
}

export const RecommendationDetailModal: React.FC<RecommendationDetailModalProps> = ({
  item,
  currency = 'INR',
  isSaved = false,
  onClose,
  onSave,
  onFindAlternatives,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
            {item.category}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Verified Estimate</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-2xl font-extrabold text-white font-heading tracking-tight">
          {item.name}
        </h3>

        {/* Price & Quantity Box */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-950/80 p-4 border border-white/5">
          <div>
            <div className="text-xs text-slate-400">Total Estimated Cost</div>
            <div className="text-2xl font-black text-indigo-300 font-heading">
              {formatCurrency(item.estimatedTotalPrice, currency)}
            </div>
            {item.quantity > 1 && (
              <div className="text-xs text-slate-500">
                {formatCurrency(item.estimatedUnitPrice, currency)} × {item.quantity} units
              </div>
            )}
          </div>
          <div className="rounded-xl bg-slate-900 px-3 py-2 text-right border border-white/5">
            <div className="text-[11px] text-slate-400">Pricing Mode</div>
            <div className="text-xs font-semibold text-slate-200">
              {item.sourceType === 'ai_estimate' ? 'GenAI Estimation' : 'External Vendor API'}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-6 space-y-4 text-sm">
          {/* Why Recommended */}
          <div className="rounded-2xl bg-indigo-950/20 p-4 border border-indigo-500/20">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Why Gemini Recommends This</span>
            </h4>
            <p className="mt-2 text-slate-300 leading-relaxed text-xs sm:text-sm">
              {item.reason}
            </p>
          </div>

          {/* Style & Compatibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.styleMatch && (
              <div className="rounded-xl bg-slate-950/60 p-3.5 border border-white/5">
                <span className="text-xs font-semibold text-slate-400">Style Match</span>
                <p className="mt-1 text-xs text-slate-200">{item.styleMatch}</p>
              </div>
            )}
            {item.budgetImpact && (
              <div className="rounded-xl bg-slate-950/60 p-3.5 border border-white/5">
                <span className="text-xs font-semibold text-slate-400">Budget Impact</span>
                <p className="mt-1 text-xs text-slate-200">{item.budgetImpact}</p>
              </div>
            )}
            {item.material && (
              <div className="rounded-xl bg-slate-950/60 p-3.5 border border-white/5">
                <span className="text-xs font-semibold text-slate-400">Material / Texture</span>
                <p className="mt-1 text-xs text-slate-200">{item.material}</p>
              </div>
            )}
            {item.occasionSuitability && (
              <div className="rounded-xl bg-slate-950/60 p-3.5 border border-white/5">
                <span className="text-xs font-semibold text-slate-400">Occasion Match</span>
                <p className="mt-1 text-xs text-slate-200">{item.occasionSuitability}</p>
              </div>
            )}
          </div>

          {/* Cost-saving Alternative */}
          {item.alternative && (
            <div className="rounded-2xl bg-emerald-950/20 p-4 border border-emerald-500/20">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Smart Budget Alternative</span>
              </h4>
              <p className="mt-1.5 text-xs text-emerald-200/90 leading-relaxed">
                {item.alternative}
              </p>
            </div>
          )}

          {/* Vendor Notice */}
          <div className="rounded-xl bg-slate-950 p-3 text-[11px] text-slate-400 border border-white/5 flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Data Notice: </strong> Prices and recommendations are generated by PocketSmart AI based on market medians. No real-time retailer inventory or live affiliate links are claimed.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors"
          >
            Back to Recommendations
          </button>

          <div className="flex items-center gap-2">
            {onFindAlternatives && (
              <button
                onClick={() => {
                  onClose();
                  onFindAlternatives(item);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-indigo-400" />
                <span>Alternatives</span>
              </button>
            )}

            {onSave && (
              <button
                onClick={() => onSave(item)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  isSaved
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:opacity-90'
                }`}
              >
                {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                <span>{isSaved ? 'Saved to Collection' : 'Save Recommendation'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

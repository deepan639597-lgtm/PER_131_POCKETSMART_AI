import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  Eye,
  Home,
  PartyPopper,
  Gem,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { SavedItem, RecommendationItem } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { RecommendationDetailModal } from '../components/RecommendationDetailModal';
import { useToast } from '../components/Toast';

interface SavedRecommendationsPageProps {
  savedItems: SavedItem[];
  onRemoveSavedItem: (id: string) => void;
  currency?: string;
}

export const SavedRecommendationsPage: React.FC<SavedRecommendationsPageProps> = ({
  savedItems,
  onRemoveSavedItem,
  currency = 'INR',
}) => {
  const { showToast } = useToast();
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState<RecommendationItem | null>(null);

  const filtered = savedItems.filter((item) => {
    if (filterType !== 'all' && item.plannerType !== filterType) return false;
    return true;
  });

  const handleOpenDetails = (saved: SavedItem) => {
    const item: RecommendationItem = {
      id: saved.id,
      name: saved.name,
      category: saved.category,
      quantity: saved.quantity || 1,
      estimatedUnitPrice: saved.estimatedPrice,
      estimatedTotalPrice: saved.estimatedPrice,
      reason: saved.reason,
      styleMatch: saved.styleMatch,
      material: saved.material,
      alternative: saved.alternative,
      sourceType: saved.sourceType,
      vendor: saved.vendor,
    };
    setSelectedDetailItem(item);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Bookmark className="h-4 w-4" />
            <span>Curated Collection</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Saved Recommendations
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            All your bookmarked products and service options from Home, Party, and Jewelry plans.
          </p>
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
              {type === 'all' ? 'All Items' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:bg-slate-900/90"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-indigo-500/15 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 uppercase">
                      {item.plannerType}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(item.dateSaved)}</span>
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {item.name}
                </h3>

                <div className="mt-2 text-xl font-extrabold text-white font-heading">
                  {formatCurrency(item.estimatedPrice, currency)}
                </div>

                <div className="mt-3 rounded-2xl bg-slate-950/70 p-3 border border-white/5 text-xs text-slate-300">
                  <p className="line-clamp-2 leading-relaxed">{item.reason}</p>
                </div>

                {item.alternative && (
                  <div className="mt-2.5 rounded-lg bg-emerald-950/30 p-2 text-[11px] text-emerald-300 border border-emerald-500/20">
                    <span className="font-semibold">Alternative: </span>
                    {item.alternative}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDetails(item)}
                  className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => {
                    onRemoveSavedItem(item.id);
                    showToast('Removed from saved list.', 'info');
                  }}
                  className="rounded-xl p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  title="Remove saved item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-slate-900/40 p-12 text-center text-slate-400">
          <Bookmark className="mx-auto h-10 w-10 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white font-heading">No saved recommendations</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            When you view recommendations on any planner, click the bookmark icon to save items here for later review.
          </p>
        </div>
      )}

      {/* Modal */}
      <RecommendationDetailModal
        item={selectedDetailItem}
        currency={currency}
        isSaved={true}
        onClose={() => setSelectedDetailItem(null)}
      />
    </div>
  );
};

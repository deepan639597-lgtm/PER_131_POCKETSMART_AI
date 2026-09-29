import React, { useState } from 'react';
import {
  Home,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface HomeItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  targetPrice?: number;
}

interface HomePlannerPageProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const ROOM_OPTIONS = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Bathroom',
  'Home Office',
  'Balcony / Patio',
  'Multiple Rooms',
];

const STYLE_OPTIONS = [
  'Modern',
  'Minimalist',
  'Scandinavian',
  'Traditional',
  'Luxury',
  'Contemporary',
  'Industrial',
  'Budget Friendly',
];

const CATEGORY_OPTIONS = [
  'Furniture',
  'Lighting',
  'Decor & Accents',
  'Appliance',
  'Storage',
  'Textiles & Curtains',
];

export const HomePlannerPage: React.FC<HomePlannerPageProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [budget, setBudget] = useState<string>('100000');
  const [roomType, setRoomType] = useState<string>('Living Room');
  const [style, setStyle] = useState<string>('Modern');
  const [requirements, setRequirements] = useState<string>(
    'I want a modern living room with warm lighting, durable pet-friendly sofa fabrics, and Scandinavian wooden touches.'
  );
  const [items, setItems] = useState<HomeItem[]>([
    { id: '1', name: 'Sofa Set (3-Seater)', quantity: 1, category: 'Furniture' },
    { id: '2', name: 'Ceiling Fan with Light', quantity: 2, category: 'Appliance' },
    { id: '3', name: 'Warm Recessed Spotlights', quantity: 6, category: 'Lighting' },
    { id: '4', name: 'Center Coffee Table', quantity: 1, category: 'Furniture' },
    { id: '5', name: 'Floor-Length Curtains', quantity: 4, category: 'Textiles & Curtains' },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `item-${Date.now()}`,
        name: '',
        quantity: 1,
        category: 'Furniture',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof HomeItem, val: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: val };
        }
        return item;
      })
    );
  };

  // Load realistic sample data (Requirement 38)
  const handleLoadSample = () => {
    setBudget('100000');
    setRoomType('Living Room');
    setStyle('Modern');
    setRequirements(
      'Clean modern living room with neutral grey and oak palette, warm ambient lighting, and space-saving modular storage.'
    );
    setItems([
      { id: '1', name: 'Sofa', quantity: 1, category: 'Furniture' },
      { id: '2', name: 'Fan', quantity: 2, category: 'Appliance' },
      { id: '3', name: 'Lights', quantity: 6, category: 'Lighting' },
      { id: '4', name: 'Coffee Table', quantity: 1, category: 'Furniture' },
      { id: '5', name: 'Curtains', quantity: 4, category: 'Textiles & Curtains' },
    ]);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const numBudget = Number(budget);
    if (!budget || isNaN(numBudget) || numBudget <= 0) {
      newErrors.budget = 'Please enter a valid budget greater than ₹0.';
    } else if (numBudget < 2000) {
      newErrors.budget = 'Minimum recommended budget for home planning is ₹2,000.';
    }

    if (!roomType) newErrors.roomType = 'Please select a room type.';
    if (!style) newErrors.style = 'Please select a style preference.';

    // Check items
    const invalidItems = items.some((i) => !i.name.trim() || i.quantity <= 0);
    if (invalidItems) {
      newErrors.items = 'All items must have a name and quantity greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      budget: Number(budget),
      roomType,
      style,
      items: items.map((i) => ({
        name: i.name.trim(),
        quantity: Number(i.quantity),
        category: i.category,
        targetPrice: i.targetPrice ? Number(i.targetPrice) : undefined,
      })),
      requirements: requirements.trim(),
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Home className="h-4 w-4" />
            <span>Module 1</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Home Interior Budget Planner
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Tell us what you need for your home and we&apos;ll create a budget-friendly plan.
          </p>
        </div>

        {/* 1-Click Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all self-start sm:self-auto"
        >
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Load Living Room Demo (₹1,00,000)</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Budget & Room Config */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          {/* Total Budget */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Total Budget (₹) *
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="1000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="100000"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-8 pr-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.budget
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
            </div>
            {errors.budget && (
              <p className="mt-1 text-[11px] text-red-400">{errors.budget}</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Allocated sum is strictly capped to this amount
            </p>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Room Type *
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              {ROOM_OPTIONS.map((room) => (
                <option key={room} value={room} className="bg-slate-900 text-white">
                  {room}
                </option>
              ))}
            </select>
            {errors.roomType && (
              <p className="mt-1 text-[11px] text-red-400">{errors.roomType}</p>
            )}
          </div>

          {/* Style Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Style Preference *
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              {STYLE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
            {errors.style && (
              <p className="mt-1 text-[11px] text-red-400">{errors.style}</p>
            )}
          </div>
        </div>

        {/* Dynamic Items Builder */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Items to Include
              </h3>
              <p className="text-xs text-slate-400">
                Specify what you need. AI will balance costs across all selections.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-white/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>

          {errors.items && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs text-red-400 border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errors.items}</span>
            </div>
          )}

          <div className="mt-5 space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-slate-950/70 p-3.5 border border-white/5"
              >
                {/* Index badge */}
                <span className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400">
                  {idx + 1}
                </span>

                {/* Name */}
                <div className="w-full sm:flex-1">
                  <input
                    type="text"
                    placeholder="Item name (e.g. Sofa, Lights, Desk)"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2 px-3 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Category */}
                <div className="w-full sm:w-44">
                  <select
                    value={item.category}
                    onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2 px-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 w-full sm:w-28">
                  <span className="text-xs text-slate-400 font-medium">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2 px-2 text-center text-xs font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={items.length <= 1}
                  className="rounded-xl p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Additional Requirements & Preferences (Optional)
          </label>
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Tell us about color palettes, fabric preferences, room dimensions, natural light, or special needs..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 p-3.5 text-xs font-normal text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Strict Budget Enforcement Active</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? 'Calculating Plan...' : 'Generate AI Plan'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

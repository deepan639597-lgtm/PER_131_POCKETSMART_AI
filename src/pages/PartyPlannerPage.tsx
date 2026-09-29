import React, { useState } from 'react';
import {
  PartyPopper,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Users,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface PartyPlannerPageProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const EVENT_TYPES = [
  'Birthday',
  'Wedding',
  'Engagement',
  'Anniversary',
  'Corporate Event',
  'Baby Shower',
  'College Event',
  'House Party',
  'Other',
];

const VENUE_OPTIONS = [
  'Home',
  'Hotel',
  'Restaurant',
  'Banquet Hall',
  'Outdoor / Lawn',
  'Community Hall',
  'Other',
];

const FOOD_PREFERENCES = ['Vegetarian', 'Non-Vegetarian', 'Mixed'];

const DECOR_STYLES = [
  'Simple',
  'Elegant',
  'Traditional',
  'Modern',
  'Luxury',
  'Theme Based',
];

const ENTERTAINMENT_OPTIONS = [
  'DJ & Sound System',
  'Acoustic Music / Playlist',
  'Live Performance',
  'Party Games & Emcee',
  'Candid Photography',
  'Cinematic Videography',
  'None',
];

export const PartyPlannerPage: React.FC<PartyPlannerPageProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [budget, setBudget] = useState<string>('75000');
  const [guestCount, setGuestCount] = useState<string>('100');
  const [eventType, setEventType] = useState<string>('Birthday');
  const [venue, setVenue] = useState<string>('Banquet Hall');
  const [foodPreference, setFoodPreference] = useState<string>('Mixed');
  const [decorationStyle, setDecorationStyle] = useState<string>('Elegant');
  const [entertainment, setEntertainment] = useState<string[]>([
    'DJ & Sound System',
    'Candid Photography',
  ]);
  const [requirements, setRequirements] = useState<string>(
    '100 guests celebration with welcoming appetizers, dessert counter, and balloon + fairy light photo wall.'
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const toggleEntertainment = (option: string) => {
    if (option === 'None') {
      setEntertainment(['None']);
      return;
    }
    const filtered = entertainment.filter((e) => e !== 'None');
    if (filtered.includes(option)) {
      setEntertainment(filtered.filter((e) => e !== option));
    } else {
      setEntertainment([...filtered, option]);
    }
  };

  const handleLoadSample = () => {
    setBudget('75000');
    setGuestCount('100');
    setEventType('Birthday');
    setVenue('Banquet Hall');
    setFoodPreference('Mixed');
    setDecorationStyle('Elegant');
    setEntertainment(['DJ & Sound System', 'Candid Photography']);
    setRequirements(
      'Celebration for 100 close friends and family with finger snacks, 3-course dinner, and celebratory music.'
    );
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const numBudget = Number(budget);
    const numGuests = Number(guestCount);

    if (!budget || isNaN(numBudget) || numBudget <= 0) {
      newErrors.budget = 'Please enter a valid budget greater than ₹0.';
    }
    if (!guestCount || isNaN(numGuests) || numGuests <= 0) {
      newErrors.guestCount = 'Please enter a valid guest count (at least 1).';
    }

    if (!eventType) newErrors.eventType = 'Please select an event type.';
    if (!venue) newErrors.venue = 'Please select a venue type.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      budget: Number(budget),
      guestCount: Number(guestCount),
      eventType,
      venue,
      foodPreference,
      decorationStyle,
      entertainment,
      requirements: requirements.trim(),
    });
  };

  const perPersonEstimate =
    Number(budget) > 0 && Number(guestCount) > 0
      ? Math.round(Number(budget) / Number(guestCount))
      : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <PartyPopper className="h-4 w-4" />
            <span>Module 2</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Party & Event Budget Planner
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Intelligently allocate your event budget across catering, venue, decor, and entertainment.
          </p>
        </div>

        {/* 1-Click Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-500/10 px-3.5 py-2 text-xs font-semibold text-pink-300 hover:bg-pink-500/20 transition-all self-start sm:self-auto"
        >
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Load 100-Guest Birthday (₹75,000)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Core Constraints */}
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
                placeholder="50000"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-8 pr-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.budget
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-pink-500 focus:ring-pink-500/30'
                }`}
              />
            </div>
            {errors.budget && (
              <p className="mt-1 text-[11px] text-red-400">{errors.budget}</p>
            )}
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Guest Count *
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Users className="h-4 w-4" />
              </span>
              <input
                type="number"
                min="1"
                max="5000"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="100"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-9 pr-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.guestCount
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-pink-500 focus:ring-pink-500/30'
                }`}
              />
            </div>
            {errors.guestCount && (
              <p className="mt-1 text-[11px] text-red-400">{errors.guestCount}</p>
            )}
          </div>

          {/* Computed Avg Cost Per Guest Preview */}
          <div className="rounded-2xl bg-slate-950 p-4 border border-white/5 flex flex-col justify-center">
            <span className="text-[11px] font-medium text-slate-400">
              Estimated Spending Per Guest
            </span>
            <span className="mt-1 text-xl font-black text-pink-400 font-heading">
              ₹{perPersonEstimate.toLocaleString('en-IN')} / attendee
            </span>
            <span className="text-[10px] text-slate-500">
              Includes catering, venue & decor share
            </span>
          </div>
        </div>

        {/* Event Type & Venue Setup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          {/* Event Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Event Type *
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type} className="bg-slate-900 text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Venue Type *
            </label>
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
            >
              {VENUE_OPTIONS.map((v) => (
                <option key={v} value={v} className="bg-slate-900 text-white">
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Food Preference
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {FOOD_PREFERENCES.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setFoodPreference(pref)}
                  className={`rounded-xl py-2 px-3 text-xs font-semibold transition-all ${
                    foodPreference === pref
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'border border-white/10 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Decoration Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Decoration Style
            </label>
            <select
              value={decorationStyle}
              onChange={(e) => setDecorationStyle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
            >
              {DECOR_STYLES.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Entertainment Checkbox Grid */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Entertainment & Media Services (Select all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ENTERTAINMENT_OPTIONS.map((opt) => {
              const isSelected = entertainment.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleEntertainment(opt)}
                  className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium text-left transition-all ${
                    isSelected
                      ? 'border border-pink-500/50 bg-pink-500/15 text-pink-200'
                      : 'border border-white/5 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-pink-400 bg-pink-500 text-white'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Additional Requirements & Instructions
          </label>
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Special dietary requirements (vegan/jain), timing, cake table setup, stage lighting..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 p-3.5 text-xs font-normal text-slate-200 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Swiggy, Zomato & OYO Benchmark Integration Ready</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-pink-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-pink-600/30 hover:from-pink-500 hover:to-pink-400 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? 'Calculating Plan...' : 'Generate Party Plan'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

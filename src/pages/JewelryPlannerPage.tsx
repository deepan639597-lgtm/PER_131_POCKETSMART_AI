import React, { useState } from 'react';
import {
  Gem,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Camera,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';

interface JewelryPlannerPageProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const OCCASIONS = [
  'Wedding',
  'Engagement',
  'Festival / Puja',
  'Cocktail Party',
  'Birthday',
  'Office / Formal',
  'Casual Outing',
  'Traditional Event',
];

const JEWELRY_TYPES = [
  'Complete Set',
  'Necklace',
  'Earrings & Jhumkas',
  'Bangles & Bracelets',
  'Rings',
  'Hair Accessories / Maang Tikka',
  'Any / Curated Mix',
];

const STYLES = [
  'Traditional',
  'Modern',
  'Minimal',
  'Elegant',
  'Bridal',
  'Statement',
  'Contemporary Fusion',
];

const METALS = [
  'Gold Plated',
  'Pure Gold',
  'Silver (925)',
  'Diamond / American Diamond (CZ)',
  'Pearl',
  'Artificial / Fashion',
  'No Preference',
];

export const JewelryPlannerPage: React.FC<JewelryPlannerPageProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [budget, setBudget] = useState<string>('30000');
  const [occasion, setOccasion] = useState<string>('Wedding');
  const [jewelryType, setJewelryType] = useState<string>('Complete Set');
  const [style, setStyle] = useState<string>('Traditional');
  const [metalPreference, setMetalPreference] = useState<string>('Gold Plated');
  const [outfitDescription, setOutfitDescription] = useState<string>(
    'Red silk saree with gold zari border, deep scoop neckline, and emerald green blouse with hand-embroidered sleeve motifs.'
  );
  const [uploadedImage, setUploadedImage] = useState<{
    mimeType: string;
    data: string;
    previewUrl: string;
  } | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLoadSample = () => {
    setBudget('30000');
    setOccasion('Wedding');
    setJewelryType('Complete Set');
    setStyle('Traditional');
    setMetalPreference('Gold Plated');
    setOutfitDescription(
      'Royal crimson Banarasi silk saree with ornate floral gold border and ruby-accented sleeve cuffs.'
    );
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const numBudget = Number(budget);

    if (!budget || isNaN(numBudget) || numBudget <= 0) {
      newErrors.budget = 'Please enter a valid budget greater than ₹0.';
    }
    if (!occasion) newErrors.occasion = 'Please select an occasion.';
    if (!style) newErrors.style = 'Please select a style.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      budget: Number(budget),
      occasion,
      jewelryType,
      style,
      metalPreference,
      outfitDescription: outfitDescription.trim(),
      image: uploadedImage
        ? {
            mimeType: uploadedImage.mimeType,
            data: uploadedImage.data,
          }
        : null,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Gem className="h-4 w-4" />
            <span>Module 3</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Jewelry Recommendation Planner
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Find jewelry recommendations based on your budget, occasion, style, and optional outfit photo.
          </p>
        </div>

        {/* 1-Click Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Zap className="h-4 w-4 text-amber-400" />
          <span>Load Bridal Wedding Demo (₹30,000)</span>
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
                min="500"
                step="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="25000"
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-8 pr-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.budget
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/30'
                }`}
              />
            </div>
            {errors.budget && (
              <p className="mt-1 text-[11px] text-red-400">{errors.budget}</p>
            )}
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Occasion *
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {OCCASIONS.map((occ) => (
                <option key={occ} value={occ} className="bg-slate-900 text-white">
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Jewelry Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Jewelry Category *
            </label>
            <select
              value={jewelryType}
              onChange={(e) => setJewelryType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {JEWELRY_TYPES.map((type) => (
                <option key={type} value={type} className="bg-slate-900 text-white">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Style & Metal Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          {/* Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Aesthetic Style *
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {STYLES.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Metal Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Metal / Material Preference
            </label>
            <select
              value={metalPreference}
              onChange={(e) => setMetalPreference(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 text-sm font-semibold text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {METALS.map((m) => (
                <option key={m} value={m} className="bg-slate-900 text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Outfit Description */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Outfit Description
          </label>
          <textarea
            rows={2}
            value={outfitDescription}
            onChange={(e) => setOutfitDescription(e.target.value)}
            placeholder="E.g., Red silk saree with gold border, plunging V-neck evening gown, emerald green Anarkali..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 p-3.5 text-xs font-normal text-slate-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          />
        </div>

        {/* Multimodal Outfit Image Uploader */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Multimodal Vision AI: Upload Outfit Photo (Optional)
            </h3>
          </div>
          <ImageUploader
            onImageSelected={(imgData) => setUploadedImage(imgData)}
            selectedPreview={uploadedImage?.previewUrl || null}
          />
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Harmonized Color & Neckline Matching Active</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-amber-600/30 hover:opacity-95 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isLoading ? 'Styling with Gemini...' : 'Generate Jewelry Recommendations'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

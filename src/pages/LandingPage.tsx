import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Home,
  PartyPopper,
  Gem,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingDown,
  Layers,
  ChevronRight,
  Star,
  Users,
  PieChart,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectSamplePlan?: (type: 'home' | 'party' | 'jewelry') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectSamplePlan,
}) => {
  return (
    <div className="relative overflow-hidden pb-20">
      {/* Background radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-[600px] right-0 h-[400px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md mb-8">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Next-Gen Gemini 3.8 Flash Budget Engine</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-300">Zero Budget Overruns</span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading leading-[1.1]">
          Plan smarter. Spend better. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
            PocketSmart AI
          </span>
        </h1>

        {/* Subtitle & Description */}
        <h2 className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl font-medium text-indigo-200/90 font-heading">
          Your Smart Budget & Recommendation Assistant
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
          Plan smarter. Spend better. Get personalized AI recommendations within your budget. Never worry about going over budget again—Gemini calculates, allocates, and curates products with mathematical precision.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-indigo-500/40"
          >
            <span>Start Planning Free</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('features-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-3.5 text-base font-semibold text-slate-200 backdrop-blur-xl hover:bg-slate-800/80 hover:text-white transition-all"
          >
            <span>Explore Features</span>
          </button>
        </div>

        {/* Live Metrics Trust Banner */}
        <div className="mx-auto mt-16 max-w-4xl grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-xl">
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-white font-heading">₹2.4 Cr+</div>
            <div className="text-xs text-slate-400 mt-0.5">Budgets Planned</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Budget Cap Compliance</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-indigo-300 font-heading">3</div>
            <div className="text-xs text-slate-400 mt-0.5">Specialized Planners</div>
          </div>
          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-black text-purple-300 font-heading">Vision AI</div>
            <div className="text-xs text-slate-400 mt-0.5">Multimodal Outfit Styling</div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-white font-heading sm:text-4xl">
            Three Specialized AI Planners
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Tailored specifically for home renovations, celebratory events, and bridal or festive jewelry curation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Home Planner */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-900/90 hover:-translate-y-1">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Home className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Module 1
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300">
                  Room by Room
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-bold text-white font-heading">
                Home Interior Planner
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Plan your home purchases according to your budget and style. Automatically balances furniture, ambient lighting, decor, and reserve funds.
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Room types: Living Room, Bedroom, Dining & more</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Itemized quantity & category breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Scandinavian, Modern, Minimalist & Traditional</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onNavigate('home-planner')}
                className="flex items-center gap-1.5 text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors"
              >
                <span>Open Home Planner</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onSelectSamplePlan?.('home')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Demo Plan
              </button>
            </div>
          </div>

          {/* Module 2: Party Planner */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-pink-500/50 hover:bg-slate-900/90 hover:-translate-y-1">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
                <PartyPopper className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  Module 2
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300">
                  Per-Guest Allocation
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-bold text-white font-heading">
                Party & Event Planner
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Organize your event and intelligently allocate your budget across catering, decoration, venue booking, and entertainment.
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Cost-per-guest smart calculation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Swiggy, Zomato & OYO vendor benchmarks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Birthdays, Weddings, Anniversaries & Corporate</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onNavigate('party-planner')}
                className="flex items-center gap-1.5 text-sm font-bold text-pink-400 group-hover:text-pink-300 transition-colors"
              >
                <span>Open Party Planner</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onSelectSamplePlan?.('party')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Demo Plan
              </button>
            </div>
          </div>

          {/* Module 3: Jewelry Planner */}
          <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-900/90 hover:-translate-y-1">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Gem className="h-7 w-7" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Module 3
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300">
                  Multimodal Vision AI
                </span>
              </div>

              <h3 className="mt-2 text-2xl font-bold text-white font-heading">
                Jewelry Planner
              </h3>

              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Find jewelry recommendations based on your occasion, outfit and style. Upload an outfit photo and Gemini will match necklines and colors!
              </p>

              <div className="mt-6 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Multimodal image upload & color harmony</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Gold, Silver, Diamond, Pearl & Artificial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Necklaces, earrings, jhumkas & wristwear</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onNavigate('jewelry-planner')}
                className="flex items-center gap-1.5 text-sm font-bold text-amber-400 group-hover:text-amber-300 transition-colors"
              >
                <span>Open Jewelry Planner</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onSelectSamplePlan?.('jewelry')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Demo Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How PocketSmart AI Works (5 Steps) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 sm:p-14 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Streamlined Process
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white font-heading sm:text-4xl">
              How PocketSmart AI Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Five simple steps to guaranteed budget peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-slate-950/70 p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-extrabold text-sm border border-indigo-500/20">
                  01
                </div>
                <h4 className="mt-4 text-base font-bold text-white">Enter Requirements</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Specify items, room type, guest count, or upload your outfit photo.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl bg-slate-950/70 p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-extrabold text-sm border border-indigo-500/20">
                  02
                </div>
                <h4 className="mt-4 text-base font-bold text-white">Set Your Budget</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Define your exact maximum spending cap (e.g. ₹50,000 or ₹1,00,000).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl bg-slate-950/70 p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-extrabold text-sm border border-indigo-500/20">
                  03
                </div>
                <h4 className="mt-4 text-base font-bold text-white">Let Gemini Analyze</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Gemini runs multi-variable constraint optimization in real time.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-2xl bg-slate-950/70 p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-extrabold text-sm border border-indigo-500/20">
                  04
                </div>
                <h4 className="mt-4 text-base font-bold text-white">Personalized Recs</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Review itemized costs, styling rationale, and category splits.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative rounded-2xl bg-slate-950/70 p-5 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-sm border border-emerald-500/20">
                  05
                </div>
                <h4 className="mt-4 text-base font-bold text-white">Compare & Save</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Explore lower-cost alternatives, save items, and export full plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Loved by Homeowners, Event Planners & Stylists
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Real stories from people who saved money without sacrificing aesthetic standards.
            </p>
          </div>
          <button
            onClick={() => onNavigate('testimonials')}
            className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            <span>View All Reviews</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;We had exactly ₹1,00,000 for our new 2BHK living room. PocketSmart AI gave us a breakdown that left ₹14,000 in reserve for unexpected delivery charges!&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                PK
              </div>
              <div>
                <div className="text-xs font-bold text-white">Pooja & Karan</div>
                <div className="text-[10px] text-slate-400">Home Interior Plan • Bengaluru</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;Organized an 80-guest engagement party. The per-guest catering breakdown kept caterers from overcharging us. PocketSmart was our event secret weapon!&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
              <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center font-bold text-xs text-white">
                RM
              </div>
              <div>
                <div className="text-xs font-bold text-white">Rahul Mehta</div>
                <div className="text-[10px] text-slate-400">Engagement Event • Mumbai</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;I uploaded a photo of my crimson Kanjeevaram saree, and the vision AI identified the matte gold zari and suggested antique temple jewellery that matched flawlessly.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xs text-white">
                AS
              </div>
              <div>
                <div className="text-xs font-bold text-white">Ananya Sharma</div>
                <div className="text-[10px] text-slate-400">Bridal Jewelry Styling • Delhi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 text-center">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/80 p-10 sm:p-14 shadow-2xl backdrop-blur-2xl">
          <h2 className="text-3xl font-extrabold text-white font-heading sm:text-4xl">
            Ready to Plan Within Your Budget?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            Create your first intelligent plan in under 60 seconds with Google Gemini 3.8 Flash.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="rounded-2xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-105"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => onNavigate('home-planner')}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              Start Home Planner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Star, Sparkles, Home, PartyPopper, Gem, Quote } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const reviews = [
    {
      name: 'Sneha & Rajesh Verma',
      location: 'Bengaluru, Karnataka',
      role: 'New Homeowners (3BHK Interior)',
      rating: 5,
      type: 'home',
      quote:
        'We were stressed about blowing our ₹2,50,000 interior budget on living room furniture. PocketSmart AI balanced the dining table, lights, and modular sofa perfectly and warned us about delivery assembly fees. We stayed exactly at ₹2,32,000!',
    },
    {
      name: 'Aditya Sen',
      location: 'Kolkata, West Bengal',
      role: 'College Fest Organizer',
      rating: 5,
      type: 'party',
      quote:
        'Our student union had an ₹80,000 budget for 250 attendees. PocketSmart recommended finger-food buffet trays and sound rental packages that kept the cost per person under ₹280. The festival was a mega hit without financial deficit.',
    },
    {
      name: 'Kavita Iyer',
      location: 'Chennai, Tamil Nadu',
      role: 'Bride-to-be',
      rating: 5,
      type: 'jewelry',
      quote:
        'The multimodal outfit analysis blew me away! I uploaded my gold and bottle-green Kanjeevaram wedding saree, and it suggested matte antique temple jewelry that matched the neckline contour. Everyone praised the styling.',
    },
    {
      name: 'Vikram Joshi',
      location: 'Pune, Maharashtra',
      role: 'Freelance Event Manager',
      rating: 5,
      type: 'party',
      quote:
        'I use PocketSmart AI as an initial estimating benchmark before quoting clients. It structures catering, venue, and contingency reserves into clean proportions that make sense mathematically.',
    },
    {
      name: 'Meera Nambiar',
      location: 'Kochi, Kerala',
      role: 'Interior Designer',
      rating: 5,
      type: 'home',
      quote:
        'The auto-optimization feature is brilliant. If an initial plan exceeds the client cap, the system automatically suggests composite alternatives and rebalances the bottom line without crashing.',
    },
    {
      name: 'Tanvi Agarwal',
      location: 'Jaipur, Rajasthan',
      role: 'Fashion Blogger',
      rating: 5,
      type: 'jewelry',
      quote:
        'Finding artificial and demi-fine jewelry that doesn’t look cheap is hard. PocketSmart’s material suggestions and style matching give you sophisticated looks without thousands spent on real gold.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20 mb-3">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>User Experiences & Reviews</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Trusted by Budget Conscious Planners
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Discover how real homeowners, event organizers, and brides saved thousands using PocketSmart AI.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <div className="rounded-lg bg-slate-800 p-1.5 text-slate-400">
                  {r.type === 'home' && <Home className="h-4 w-4" />}
                  {r.type === 'party' && <PartyPopper className="h-4 w-4" />}
                  {r.type === 'jewelry' && <Gem className="h-4 w-4" />}
                </div>
              </div>

              <div className="mt-4 relative">
                <Quote className="h-6 w-6 text-indigo-500/30 absolute -top-2 -left-1 pointer-events-none" />
                <p className="text-xs text-slate-300 leading-relaxed pl-4 font-normal">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{r.name}</div>
                <div className="text-[11px] text-slate-400">{r.role}</div>
                <div className="text-[10px] text-slate-500">{r.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

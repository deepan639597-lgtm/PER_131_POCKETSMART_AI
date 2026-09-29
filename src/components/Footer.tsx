import React from 'react';
import { Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 pt-12 pb-8 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-heading text-base font-bold text-white tracking-tight">
                PocketSmart <span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Smart Budget & Recommendation Assistant. Powered by Google Gemini AI to balance functionality, style, occasion, and strict budget caps.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemini 3.8 Flash Engine Active</span>
            </div>
          </div>

          {/* Planners */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Budget Planners
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home-planner')}
                  className="hover:text-white transition-colors"
                >
                  Home Interior Budget Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('party-planner')}
                  className="hover:text-white transition-colors"
                >
                  Party & Event Budget Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jewelry-planner')}
                  className="hover:text-white transition-colors"
                >
                  Jewelry Recommendation Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-white transition-colors"
                >
                  Recommendation History
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Integrations */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Vendor Architecture
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Stubs prepared for Amazon, Flipkart, IKEA, Swiggy, Zomato, and OYO.
            </p>
            <div className="rounded-lg bg-slate-900 p-2.5 border border-white/5 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Rule Notice: </span>
              Unconnected vendor items are strictly tagged as &ldquo;AI Recommendation (Estimated)&rdquo;.
            </div>
          </div>

          {/* Guarantee */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Budget Guarantee
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <Shield className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Budget Overrun:</strong> PocketSmart automatically recalculates allocations so the final sum never exceeds your budget.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-400 pt-1">
              <Cpu className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>Multimodal outfit vision analysis for accurate jewelry styling.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PocketSmart AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('testimonials')} className="hover:text-slate-300">
              Testimonials
            </button>
            <button onClick={() => onNavigate('profile')} className="hover:text-slate-300">
              API Status
            </button>
            <span>v1.0.0 (Production Build)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

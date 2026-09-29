import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, Calculator, Gift, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  moduleName?: string;
  budget?: number;
  currency?: string;
}

const STEPS = [
  {
    icon: BrainCircuit,
    title: 'PocketSmart AI is analyzing your requirements...',
    subtitle: 'Extracting aesthetic preferences, constraints & scope',
  },
  {
    icon: Calculator,
    title: 'Calculating your budget allocations...',
    subtitle: 'Enforcing strict spending caps & contingency reserves',
  },
  {
    icon: Gift,
    title: 'Finding personalized recommendations...',
    subtitle: 'Curating cost-efficient alternatives and style matches',
  },
];

export const LoadingState: React.FC<LoadingStateProps> = ({
  moduleName = 'Plan',
  budget,
  currency = 'INR',
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1800);
    const timer2 = setTimeout(() => setCurrentStep(2), 3600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="mx-auto my-12 max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center shadow-2xl backdrop-blur-xl">
      {/* Animated Orb */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 opacity-30 blur-xl animate-pulse" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 shadow-xl">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
            <Sparkles className="h-7 w-7 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-extrabold text-white font-heading">
        Generating Your {moduleName}
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        Google Gemini 3.8 Flash is architecting your optimal budget allocation
      </p>

      {/* Steps List */}
      <div className="mt-8 space-y-3 text-left">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;
          const isPending = currentStep < idx;

          return (
            <div
              key={step.title}
              className={`flex items-start gap-3 rounded-2xl p-3.5 border transition-all duration-300 ${
                isCurrent
                  ? 'border-indigo-500/50 bg-indigo-500/10 scale-[1.02]'
                  : isDone
                  ? 'border-emerald-500/30 bg-emerald-500/5 opacity-80'
                  : 'border-white/5 bg-slate-950/40 opacity-40'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className={`h-4 w-4 ${isCurrent ? 'animate-bounce' : ''}`} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-bold ${isCurrent ? 'text-white' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {step.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-700"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="mt-4 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <span>Zero-Budget-Overrun Guarantee Active</span>
        <span>•</span>
        <span>Strict mathematical cap</span>
      </div>
    </div>
  );
};

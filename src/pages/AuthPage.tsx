import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';
import { loginUser, registerUser } from '../services/api';
import { useToast } from '../components/Toast';

interface AuthPageProps {
  onAuthSuccess: (user: any) => void;
  defaultMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onAuthSuccess,
  defaultMode = 'login',
}) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!email || !email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (mode === 'register') {
      if (!name.trim()) {
        errs.name = 'Full name is required.';
      }
      if (password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (mode === 'login') {
        const data = await loginUser({ email, password });
        showToast(`Welcome back, ${data.user.name}!`, 'success');
        onAuthSuccess(data.user);
      } else {
        const data = await registerUser({ name, email, password, confirmPassword });
        showToast(`Account created! Welcome, ${data.user.name}.`, 'success');
        onAuthSuccess(data.user);
      }
    } catch (err: any) {
      setErrors({ global: err.message || 'Authentication failed' });
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click Demo Login
  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    try {
      const data = await loginUser({
        email: 'alex@pocketsmart.ai',
        password: 'password123',
      });
      showToast('Logged in as Alex Johnson (Demo)', 'success');
      onAuthSuccess(data.user);
    } catch (e: any) {
      setErrors({ global: 'Demo login error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-black text-white font-heading">
            {mode === 'login' ? 'Sign In to PocketSmart' : 'Create Your Account'}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            {mode === 'login'
              ? 'Access your budgets, saved recommendations, and history'
              : 'Start planning smart with Google Gemini 3.8 Flash'}
          </p>
        </div>

        {/* Global error */}
        {errors.global && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs text-red-400 border border-red-500/20">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errors.global}</span>
          </div>
        )}

        {/* 1-Click Demo Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 px-4 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 transition-all"
          >
            <Zap className="h-4 w-4 text-amber-400" />
            <span>1-Click Demo Login (Instant Access)</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Or continue with email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300">
                Full Name *
              </label>
              <div className="relative mt-1.5">
                <User className="absolute inset-y-0 left-0 pl-3 my-auto h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Deepan Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-9 pr-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500' : 'border-white/10 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300">
              Email Address *
            </label>
            <div className="relative mt-1.5">
              <Mail className="absolute inset-y-0 left-0 pl-3 my-auto h-4 w-4 text-slate-500" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-9 pr-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500' : 'border-white/10 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300">
              Password *
            </label>
            <div className="relative mt-1.5">
              <Lock className="absolute inset-y-0 left-0 pl-3 my-auto h-4 w-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-9 pr-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : 'border-white/10 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-[11px] text-red-400">{errors.password}</p>}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300">
                Confirm Password *
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute inset-y-0 left-0 pl-3 my-auto h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-slate-950 py-2.5 pl-9 pr-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-3 text-xs font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition-all disabled:opacity-50"
          >
            {isLoading
              ? 'Authenticating...'
              : mode === 'login'
              ? 'Sign In to Account'
              : 'Create Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrors({});
                }}
                className="font-bold text-indigo-400 hover:underline"
              >
                Create Account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrors({});
                }}
                className="font-bold text-indigo-400 hover:underline"
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

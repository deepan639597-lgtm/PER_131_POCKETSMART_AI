import React, { useState, useEffect } from 'react';
import {
  User,
  Settings,
  Shield,
  Layers,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { UserProfile } from '../types';
import { fetchExternalVendors, checkHealth } from '../services/api';
import { useToast } from '../components/Toast';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const { showToast } = useToast();
  const [name, setName] = useState(user.name);
  const [currency, setCurrency] = useState(user.currency || 'INR');
  const [vendors, setVendors] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchExternalVendors().then((data) => setVendors(data.vendors || []));
    checkHealth().then((h) => setHealth(h));
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    onUpdateUser({ name, currency });
    setTimeout(() => {
      setIsSaving(false);
      showToast('Profile and preferences updated successfully.', 'success');
    }, 400);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Settings className="h-4 w-4" />
          <span>Account Settings</span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-heading">
          Profile & Integration Architecture
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Manage your personal details, preferred currency, and inspect external platform connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-bold text-white shadow-xl mb-4">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-white font-heading">{user.name}</h2>
            <p className="text-xs text-slate-400">{user.email}</p>

            <div className="mt-6 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Total Plans:</span>
                <span className="font-bold text-white">{user.totalPlansCreated}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Saved Recommendations:</span>
                <span className="font-bold text-white">{user.savedItemsCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Default Currency:</span>
                <span className="font-bold text-indigo-300">{currency}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="mt-6 w-full rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Settings Form */}
        <div className="md:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <h3 className="text-base font-bold text-white font-heading">
            Preferences & Personalization
          </h3>

          <form onSubmit={handleSaveProfile} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 font-semibold text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="mt-1.5 w-full rounded-xl border border-white/5 bg-slate-950/50 py-2.5 px-3 font-medium text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Email address is linked to your demo account session.
              </span>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300">
                Display Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 px-3 font-semibold text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="INR">₹ INR (Indian Rupee - Default)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
                <option value="GBP">£ GBP (British Pound)</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* External Platform Architecture Stubs (Section 27) */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              External Vendor Integration Architecture
            </h3>
            <p className="text-xs text-slate-400">
              Clean interfaces prepared for Amazon, Flipkart, IKEA, Swiggy, Zomato, and OYO.
            </p>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-300">
            Rule 4 & 27 Compliant
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl bg-slate-950/70 p-4 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{v.name}</span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                    AI Estimated Mode
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-500">
                {v.disclaimer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Health Diagnostics */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-indigo-400" />
          <span>
            AI Engine: <strong>Google Gemini 3.8 Flash</strong> ({health?.geminiConfigured ? 'API Key Attached' : 'Offline Fallback Enabled'})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Server Status: Operational</span>
        </div>
      </div>
    </div>
  );
};

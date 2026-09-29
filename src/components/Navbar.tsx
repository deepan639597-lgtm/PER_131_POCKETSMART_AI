import React, { useState } from 'react';
import {
  Sparkles,
  Home,
  PartyPopper,
  Gem,
  History,
  Bookmark,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserProfile | null;
  onLogout: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  user,
  onLogout,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [plannerDropdownOpen, setPlannerDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: History },
    {
      id: 'saved',
      label: 'Saved',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : null,
    },
    { id: 'testimonials', label: 'Testimonials', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b0f19]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-5 w-5 text-indigo-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-heading">
                  PocketSmart<span className="text-indigo-400"> AI</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  GenAI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Smart Budget & Recommendation Assistant
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Planner Mega Trigger */}
          <div className="relative">
            <button
              onClick={() => setPlannerDropdownOpen(!plannerDropdownOpen)}
              onBlur={() => setTimeout(() => setPlannerDropdownOpen(false), 200)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                ['home-planner', 'party-planner', 'jewelry-planner'].includes(currentPage)
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <PlusCircle className="h-4 w-4 text-indigo-400" />
              <span>Planners</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {plannerDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                <button
                  onClick={() => {
                    onNavigate('home-planner');
                    setPlannerDropdownOpen(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-white/5"
                >
                  <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400 border border-indigo-500/20">
                    <Home className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Home Interior Planner</div>
                    <div className="text-xs text-slate-400">Budget room design & furniture</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('party-planner');
                    setPlannerDropdownOpen(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-white/5"
                >
                  <div className="rounded-lg bg-pink-500/10 p-2 text-pink-400 border border-pink-500/20">
                    <PartyPopper className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Party & Event Planner</div>
                    <div className="text-xs text-slate-400">Catering, decor & venue budget</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('jewelry-planner');
                    setPlannerDropdownOpen(false);
                  }}
                  className="flex w-full items-start gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-white/5"
                >
                  <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400 border border-amber-500/20">
                    <Gem className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Jewelry Planner</div>
                    <div className="text-xs text-slate-400">Multimodal outfit styling</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4 text-slate-400" />
                <span>{link.label}</span>
                {link.badge ? (
                  <span className="ml-1 rounded-full bg-indigo-500 px-1.5 py-0.2 text-[11px] font-bold text-white">
                    {link.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Profile */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  currentPage === 'profile'
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-xs font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="font-medium text-slate-200">{user.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={onLogout}
                title="Logout"
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-indigo-400 transition-all hover:scale-[1.02]"
            >
              <User className="h-4 w-4" />
              <span>Sign In / Demo</span>
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-white/10">
            <button
              onClick={() => {
                onNavigate('home-planner');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center gap-1 rounded-xl bg-slate-900 p-2.5 text-center text-xs font-medium text-slate-300 hover:text-white"
            >
              <Home className="h-4 w-4 text-indigo-400" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                onNavigate('party-planner');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center gap-1 rounded-xl bg-slate-900 p-2.5 text-center text-xs font-medium text-slate-300 hover:text-white"
            >
              <PartyPopper className="h-4 w-4 text-pink-400" />
              <span>Party</span>
            </button>
            <button
              onClick={() => {
                onNavigate('jewelry-planner');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center gap-1 rounded-xl bg-slate-900 p-2.5 text-center text-xs font-medium text-slate-300 hover:text-white"
            >
              <Gem className="h-4 w-4 text-amber-400" />
              <span>Jewelry</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    currentPage === link.id
                      ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-bold text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            {user ? (
              <div className="flex w-full items-center justify-between">
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-slate-200"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name}</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onNavigate('auth');
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

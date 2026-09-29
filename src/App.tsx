import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider, useToast } from './components/Toast';
import { LoadingState } from './components/LoadingState';
import { ErrorMessage } from './components/ErrorMessage';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { HomePlannerPage } from './pages/HomePlannerPage';
import { HomeRecommendationsPage } from './pages/HomeRecommendationsPage';
import { PartyPlannerPage } from './pages/PartyPlannerPage';
import { PartyRecommendationsPage } from './pages/PartyRecommendationsPage';
import { JewelryPlannerPage } from './pages/JewelryPlannerPage';
import { JewelryRecommendationsPage } from './pages/JewelryRecommendationsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SavedRecommendationsPage } from './pages/SavedRecommendationsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';

import { PlanResult, SavedItem, UserProfile } from './types';
import {
  generateHomePlan,
  generatePartyPlan,
  generateJewelryPlan,
  fetchHistory,
  deleteHistoryPlan,
  fetchSavedItems,
  saveRecommendation,
  deleteSavedRecommendation,
  fetchProfile,
  updateProfile,
} from './services/api';

function AppContent() {
  const { showToast } = useToast();

  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);

  const [history, setHistory] = useState<PlanResult[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const [currentHomePlan, setCurrentHomePlan] = useState<PlanResult | null>(null);
  const [currentPartyPlan, setCurrentPartyPlan] = useState<PlanResult | null>(null);
  const [currentJewelryPlan, setCurrentJewelryPlan] = useState<PlanResult | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingModuleName, setLoadingModuleName] = useState<string>('Plan');
  const [error, setError] = useState<string | null>(null);

  // Initial data load
  useEffect(() => {
    fetchProfile()
      .then((u) => setUser(u))
      .catch((err) => console.log('Profile init error', err));

    fetchHistory()
      .then((h) => {
        setHistory(h);
        // Pre-populate initial plans if available
        const hHome = h.find((p) => p.type === 'home');
        if (hHome) setCurrentHomePlan(hHome);
        const hParty = h.find((p) => p.type === 'party');
        if (hParty) setCurrentPartyPlan(hParty);
        const hJewel = h.find((p) => p.type === 'jewelry');
        if (hJewel) setCurrentJewelryPlan(hJewel);
      })
      .catch((err) => console.log('History init error', err));

    fetchSavedItems()
      .then((s) => setSavedItems(s))
      .catch((err) => console.log('Saved items init error', err));
  }, []);

  const handleNavigate = (page: string) => {
    setError(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Home Plan
  const handleGenerateHome = async (formData: any) => {
    setIsLoading(true);
    setLoadingModuleName('Home Interior Plan');
    setError(null);
    try {
      const plan = await generateHomePlan(formData);
      setCurrentHomePlan(plan);
      setHistory((prev) => [plan, ...prev]);
      setCurrentPage('home-recommendations');
      showToast('Home interior plan generated successfully!', 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to generate home plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Party Plan
  const handleGenerateParty = async (formData: any) => {
    setIsLoading(true);
    setLoadingModuleName('Party & Event Plan');
    setError(null);
    try {
      const plan = await generatePartyPlan(formData);
      setCurrentPartyPlan(plan);
      setHistory((prev) => [plan, ...prev]);
      setCurrentPage('party-recommendations');
      showToast('Event budget plan generated successfully!', 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to generate party plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Jewelry Plan
  const handleGenerateJewelry = async (formData: any) => {
    setIsLoading(true);
    setLoadingModuleName('Jewelry Recommendations');
    setError(null);
    try {
      const plan = await generateJewelryPlan(formData);
      setCurrentJewelryPlan(plan);
      setHistory((prev) => [plan, ...prev]);
      setCurrentPage('jewelry-recommendations');
      showToast('Jewelry recommendations generated successfully!', 'success');
    } catch (err: any) {
      setError(err.message || 'Failed to generate jewelry plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Select a plan from History or Dashboard
  const handleSelectPlan = (plan: PlanResult) => {
    if (plan.type === 'home') {
      setCurrentHomePlan(plan);
      setCurrentPage('home-recommendations');
    } else if (plan.type === 'party') {
      setCurrentPartyPlan(plan);
      setCurrentPage('party-recommendations');
    } else if (plan.type === 'jewelry') {
      setCurrentJewelryPlan(plan);
      setCurrentPage('jewelry-recommendations');
    }
  };

  // Reuse inputs in planner form
  const handleReusePlan = (plan: PlanResult) => {
    if (plan.type === 'home') {
      setCurrentPage('home-planner');
    } else if (plan.type === 'party') {
      setCurrentPage('party-planner');
    } else if (plan.type === 'jewelry') {
      setCurrentPage('jewelry-planner');
    }
  };

  // Save individual item
  const handleSaveItem = async (item: any) => {
    try {
      const saved = await saveRecommendation(item);
      setSavedItems((prev) => [saved, ...prev.filter((s) => s.name !== saved.name)]);
      if (user) {
        setUser({ ...user, savedItemsCount: savedItems.length + 1 });
      }
    } catch (err) {
      console.error('Failed to save item:', err);
    }
  };

  // Remove saved item
  const handleRemoveSavedItem = async (id: string) => {
    await deleteSavedRecommendation(id);
    setSavedItems((prev) => prev.filter((s) => s.id !== id));
  };

  // Delete history plan
  const handleDeletePlan = async (id: string) => {
    await deleteHistoryPlan(id);
    setHistory((prev) => prev.filter((p) => p.id !== id));
  };

  // User Profile updates
  const handleUpdateUser = async (updated: Partial<UserProfile>) => {
    const updatedUser = await updateProfile(updated);
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    showToast('Logged out successfully.', 'info');
  };

  const savedNames = savedItems.map((s) => s.name);

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        savedCount={savedItems.length}
      />

      <main className="flex-1">
        {isLoading ? (
          <LoadingState moduleName={loadingModuleName} />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => {
              setError(null);
            }}
            onReset={() => {
              setError(null);
              handleNavigate('dashboard');
            }}
          />
        ) : (
          <>
            {currentPage === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
                onSelectSamplePlan={(type) => {
                  const found = history.find((p) => p.type === type);
                  if (found) handleSelectPlan(found);
                  else handleNavigate(`${type}-planner`);
                }}
              />
            )}

            {currentPage === 'dashboard' && (
              <DashboardPage
                user={
                  user || {
                    id: 'usr-demo',
                    name: 'Guest Planner',
                    email: 'guest@pocketsmart.ai',
                    currency: 'INR',
                    joinedDate: new Date().toISOString(),
                    totalPlansCreated: history.length,
                    savedItemsCount: savedItems.length,
                  }
                }
                history={history}
                savedItems={savedItems}
                onNavigate={handleNavigate}
                onSelectPlan={handleSelectPlan}
                onViewSavedItem={(saved) => {
                  handleNavigate('saved');
                }}
              />
            )}

            {currentPage === 'home-planner' && (
              <HomePlannerPage
                onSubmit={handleGenerateHome}
                isLoading={isLoading}
              />
            )}

            {currentPage === 'home-recommendations' && currentHomePlan && (
              <HomeRecommendationsPage
                plan={currentHomePlan}
                onBackToPlanner={() => handleNavigate('home-planner')}
                onSaveItem={handleSaveItem}
                onRegenerate={() => handleGenerateHome(currentHomePlan.rawInput)}
                onUpdatePlan={(upPlan) => setCurrentHomePlan(upPlan)}
                savedItemIds={savedNames}
              />
            )}

            {currentPage === 'party-planner' && (
              <PartyPlannerPage
                onSubmit={handleGenerateParty}
                isLoading={isLoading}
              />
            )}

            {currentPage === 'party-recommendations' && currentPartyPlan && (
              <PartyRecommendationsPage
                plan={currentPartyPlan}
                onBackToPlanner={() => handleNavigate('party-planner')}
                onSaveItem={handleSaveItem}
                onRegenerate={() => handleGenerateParty(currentPartyPlan.rawInput)}
                onUpdatePlan={(upPlan) => setCurrentPartyPlan(upPlan)}
                savedItemIds={savedNames}
              />
            )}

            {currentPage === 'jewelry-planner' && (
              <JewelryPlannerPage
                onSubmit={handleGenerateJewelry}
                isLoading={isLoading}
              />
            )}

            {currentPage === 'jewelry-recommendations' && currentJewelryPlan && (
              <JewelryRecommendationsPage
                plan={currentJewelryPlan}
                onBackToPlanner={() => handleNavigate('jewelry-planner')}
                onSaveItem={handleSaveItem}
                onRegenerate={() => handleGenerateJewelry(currentJewelryPlan.rawInput)}
                onUpdatePlan={(upPlan) => setCurrentJewelryPlan(upPlan)}
                savedItemIds={savedNames}
              />
            )}

            {currentPage === 'history' && (
              <HistoryPage
                history={history}
                onSelectPlan={handleSelectPlan}
                onReusePlan={handleReusePlan}
                onDeletePlan={handleDeletePlan}
                currency={user?.currency || 'INR'}
              />
            )}

            {currentPage === 'saved' && (
              <SavedRecommendationsPage
                savedItems={savedItems}
                onRemoveSavedItem={handleRemoveSavedItem}
                currency={user?.currency || 'INR'}
              />
            )}

            {currentPage === 'testimonials' && <TestimonialsPage />}

            {currentPage === 'profile' && user && (
              <ProfilePage
                user={user}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
              />
            )}

            {currentPage === 'auth' && (
              <AuthPage
                onAuthSuccess={(authUser) => {
                  setUser(authUser);
                  handleNavigate('dashboard');
                }}
              />
            )}
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

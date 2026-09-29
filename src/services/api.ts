import { PlanResult, SavedItem, UserProfile } from '../types';

const API_BASE = '/api';

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (e) {
    return { status: 'offline', geminiConfigured: false, model: 'gemini-3.8-flash' };
  }
}

export async function fetchExternalVendors() {
  try {
    const res = await fetch(`${API_BASE}/external-services`);
    return await res.json();
  } catch (e) {
    return { vendors: [] };
  }
}

export async function generateHomePlan(payload: any): Promise<PlanResult> {
  const res = await fetch(`${API_BASE}/generate-home`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate home budget plan.');
  }
  return data.plan;
}

export async function generatePartyPlan(payload: any): Promise<PlanResult> {
  const res = await fetch(`${API_BASE}/generate-party`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate party budget plan.');
  }
  return data.plan;
}

export async function generateJewelryPlan(payload: any): Promise<PlanResult> {
  const res = await fetch(`${API_BASE}/generate-jewelry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to generate jewelry plan.');
  }
  return data.plan;
}

export async function fetchHistory(): Promise<PlanResult[]> {
  try {
    const res = await fetch(`${API_BASE}/history`);
    const data = await res.json();
    return data.history || [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export async function deleteHistoryPlan(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function fetchSavedItems(): Promise<SavedItem[]> {
  try {
    const res = await fetch(`${API_BASE}/saved`);
    const data = await res.json();
    return data.savedItems || [];
  } catch (e) {
    return [];
  }
}

export async function saveRecommendation(item: any): Promise<SavedItem> {
  const res = await fetch(`${API_BASE}/saved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save item');
  return data.item;
}

export async function deleteSavedRecommendation(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/saved/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function fetchProfile(): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/auth/profile`);
  const data = await res.json();
  return data.user;
}

export async function updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData.user;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function registerUser(payload: { name: string; email: string; password: string; confirmPassword: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
}

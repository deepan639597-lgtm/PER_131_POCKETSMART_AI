export type PlannerType = 'home' | 'party' | 'jewelry';

export interface BudgetSummary {
  total: number;
  allocated: number;
  remaining: number;
  utilizationPercentage: number;
  isOptimized?: boolean;
  optimizationNote?: string;
}

export interface RecommendationItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  estimatedUnitPrice: number;
  estimatedTotalPrice: number;
  reason: string;
  styleMatch?: string;
  material?: string;
  occasionSuitability?: string;
  outfitCompatibility?: string;
  budgetImpact?: string;
  alternative?: string;
  sourceType: 'ai_estimate' | 'external_vendor';
  vendor?: string;
  vendorUrl?: string;
  rating?: number;
  isSaved?: boolean;
}

export interface CategoryAllocation {
  category: string;
  allocatedAmount: number;
  percentage: number;
  recommendations: RecommendationItem[];
}

export interface MultimodalOutfitAnalysis {
  dominantColors: string[];
  outfitStyle: string;
  traditionalOrModern: string;
  neckline?: string;
  sleevePattern?: string;
  embroideryOrWork?: string;
  overallAesthetic: string;
  recommendedJewelryColors: string[];
  recommendedJewelryStyles: string[];
}

export interface PlanResult {
  id: string;
  type: PlannerType;
  title: string;
  createdAt: string;
  currency: string;
  summary: string;
  budget: BudgetSummary;
  categories: CategoryAllocation[];
  tips: string[];
  warnings: string[];
  aiMode: 'gemini' | 'fallback';
  modelUsed?: string;
  rawInput: any;
  outfitAnalysis?: MultimodalOutfitAnalysis;
}

export interface SavedItem {
  id: string;
  planId?: string;
  plannerType: PlannerType;
  name: string;
  category: string;
  estimatedPrice: number;
  quantity?: number;
  reason: string;
  styleMatch?: string;
  material?: string;
  alternative?: string;
  dateSaved: string;
  vendor?: string;
  sourceType: 'ai_estimate' | 'external_vendor';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatar?: string;
  joinedDate: string;
  totalPlansCreated: number;
  savedItemsCount: number;
}

export interface ExternalVendor {
  id: string;
  name: string;
  category: 'home' | 'party' | 'jewelry';
  status: 'connected' | 'disconnected' | 'mock_mode';
  description: string;
  logo: string;
}

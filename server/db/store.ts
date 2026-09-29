import { PlanResult, SavedItem, UserProfile } from '../../src/types/index.js';
import {
  generateFallbackHomePlan,
  generateFallbackPartyPlan,
  generateFallbackJewelryPlan,
} from '../services/fallbackGenerator.js';

// Pre-seeded initial data for instant demo testing
const initialHomePlan = generateFallbackHomePlan({
  budget: 100000,
  roomType: 'Living Room',
  style: 'Modern',
  items: [
    { name: 'Sofa', quantity: 1, category: 'Furniture' },
    { name: 'Ceiling Fan', quantity: 2, category: 'Appliance' },
    { name: 'Recessed Warm Lights', quantity: 6, category: 'Lighting' },
    { name: 'Coffee Table', quantity: 1, category: 'Furniture' },
    { name: 'Blackout Curtains', quantity: 4, category: 'Decor' },
  ],
  requirements: 'Clean modern aesthetic with cozy warm lighting and durable fabrics.',
});
initialHomePlan.id = 'demo-plan-home-1';
initialHomePlan.title = 'Modern Living Room Interior Plan';
initialHomePlan.createdAt = '2026-09-24T10:30:00.000Z';

const initialPartyPlan = generateFallbackPartyPlan({
  budget: 75000,
  guestCount: 100,
  eventType: 'Birthday',
  venue: 'Banquet Hall',
  foodPreference: 'Mixed',
  decorationStyle: 'Elegant',
  entertainment: ['DJ & Sound System', 'Photography'],
  requirements: '100 guests celebration with welcoming appetizers and photo backdrop.',
});
initialPartyPlan.id = 'demo-plan-party-1';
initialPartyPlan.title = 'Grand 100-Guest Birthday Celebration';
initialPartyPlan.createdAt = '2026-09-23T14:15:00.000Z';

const initialJewelryPlan = generateFallbackJewelryPlan({
  budget: 30000,
  occasion: 'Wedding',
  jewelryType: 'Necklace Set',
  style: 'Traditional',
  metalPreference: 'Gold Plated',
  outfitDescription: 'Red silk saree with gold zari border and emerald blouse.',
});
initialJewelryPlan.id = 'demo-plan-jewel-1';
initialJewelryPlan.title = 'Traditional Bridal & Festive Jewelry Suite';
initialJewelryPlan.createdAt = '2026-09-22T09:45:00.000Z';

export interface ServerState {
  users: UserProfile[];
  currentUser: UserProfile;
  history: PlanResult[];
  savedItems: SavedItem[];
}

export const serverState: ServerState = {
  users: [
    {
      id: 'usr-demo-1',
      name: 'Alex Johnson',
      email: 'alex@pocketsmart.ai',
      currency: 'INR',
      joinedDate: '2026-09-01T00:00:00.000Z',
      totalPlansCreated: 3,
      savedItemsCount: 2,
    },
  ],
  currentUser: {
    id: 'usr-demo-1',
    name: 'Alex Johnson',
    email: 'alex@pocketsmart.ai',
    currency: 'INR',
    joinedDate: '2026-09-01T00:00:00.000Z',
    totalPlansCreated: 3,
    savedItemsCount: 2,
  },
  history: [initialHomePlan, initialPartyPlan, initialJewelryPlan],
  savedItems: [
    {
      id: 'saved-item-1',
      planId: 'demo-plan-home-1',
      plannerType: 'home',
      name: '3-Seater Ergonomic Sofa (Modern series)',
      category: 'Furniture',
      estimatedPrice: 38000,
      quantity: 1,
      reason: 'Key living room centerpiece with durable stain-resistant weave.',
      styleMatch: 'Modern minimalist grey tone',
      material: 'Solid wood frame & high-density foam',
      alternative: '2-seater compact loveseat saves ₹8,000',
      dateSaved: '2026-09-24T11:00:00.000Z',
      sourceType: 'ai_estimate',
      vendor: 'AI Estimated Recommendation',
    },
    {
      id: 'saved-item-2',
      planId: 'demo-plan-jewel-1',
      plannerType: 'jewelry',
      name: 'Traditional Gold Plated Choker & Earring Suite',
      category: 'Necklace',
      estimatedPrice: 15600,
      quantity: 1,
      reason: 'Perfect match for red and gold saree border motifs.',
      styleMatch: 'Antique Matte Gold finish',
      material: 'Brass with 22k micron gold plating',
      alternative: 'Single pendant chain with ruby accents',
      dateSaved: '2026-09-22T10:15:00.000Z',
      sourceType: 'ai_estimate',
      vendor: 'AI Estimated Recommendation',
    },
  ],
};

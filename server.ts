import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { serverState } from './server/db/store.js';
import {
  generateHomePlanWithGemini,
  generatePartyPlanWithGemini,
  generateJewelryPlanWithGemini,
} from './server/services/geminiService.js';
import { vendorRegistry } from './server/services/externalServices.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // JSON payload parser with generous limit for multimodal outfit photos (base64)
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Health & AI status endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      status: 'ok',
      service: 'PocketSmart AI',
      geminiConfigured: hasKey,
      model: 'gemini-3.8-flash',
      version: '1.0.0',
    });
  });

  // External Vendor Services Status
  app.get('/api/external-services', (req: Request, res: Response) => {
    res.json({
      vendors: [
        {
          id: 'amazon',
          name: 'Amazon',
          category: 'home',
          status: vendorRegistry.amazon.isConfigured() ? 'connected' : 'disconnected',
          description: 'E-commerce marketplace for home appliances, electronics, and decor.',
          disclaimer: 'AI Estimated Recommendation — Amazon PA-API requires merchant keys.',
        },
        {
          id: 'flipkart',
          name: 'Flipkart',
          category: 'home',
          status: vendorRegistry.flipkart.isConfigured() ? 'connected' : 'disconnected',
          description: 'Furniture, lifestyle goods, and smart home appliances.',
          disclaimer: 'AI Estimated Recommendation — Flipkart Affiliate API disconnected.',
        },
        {
          id: 'ikea',
          name: 'IKEA',
          category: 'home',
          status: vendorRegistry.ikea.isConfigured() ? 'connected' : 'disconnected',
          description: 'Ready-to-assemble Scandinavian furniture and modern homeware.',
          disclaimer: 'AI Estimated Recommendation — IKEA Partner API in sandbox mode.',
        },
        {
          id: 'swiggy',
          name: 'Swiggy',
          category: 'party',
          status: vendorRegistry.swiggy.isConfigured() ? 'connected' : 'disconnected',
          description: 'Party bulk food packages, finger foods, and quick catering deliveries.',
          disclaimer: 'AI Estimated Recommendation — Swiggy Bulk Catering API disconnected.',
        },
        {
          id: 'zomato',
          name: 'Zomato',
          category: 'party',
          status: vendorRegistry.zomato.isConfigured() ? 'connected' : 'disconnected',
          description: 'Catering menus, celebration platters, and banquet restaurant bookings.',
          disclaimer: 'AI Estimated Recommendation — Zomato Catering Partner API disconnected.',
        },
        {
          id: 'oyo',
          name: 'OYO',
          category: 'party',
          status: vendorRegistry.oyo.isConfigured() ? 'connected' : 'disconnected',
          description: 'Townhouse halls, banquet spaces, and party room reservations.',
          disclaimer: 'AI Estimated Recommendation — OYO Event Spaces API disconnected.',
        },
      ],
    });
  });

  // Home Generation
  app.post('/api/generate-home', async (req: Request, res: Response) => {
    try {
      const { budget, roomType, style, items, requirements } = req.body;
      if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
        return res.status(400).json({ error: 'Please enter a valid budget greater than 0.' });
      }

      const plan = await generateHomePlanWithGemini({
        budget: Number(budget),
        roomType: roomType || 'Living Room',
        style: style || 'Modern',
        items: items || [],
        requirements: requirements || '',
      });

      // Save to server history
      serverState.history.unshift(plan);
      serverState.currentUser.totalPlansCreated += 1;

      return res.json({ success: true, plan });
    } catch (err: any) {
      console.error('Error generating home plan:', err);
      return res.status(500).json({
        error: 'Something went wrong while generating your recommendations. Please try again.',
      });
    }
  });

  // Party Generation
  app.post('/api/generate-party', async (req: Request, res: Response) => {
    try {
      const { budget, guestCount, eventType, venue, foodPreference, decorationStyle, entertainment, requirements } = req.body;
      if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
        return res.status(400).json({ error: 'Please enter a valid budget greater than 0.' });
      }
      if (!guestCount || isNaN(Number(guestCount)) || Number(guestCount) <= 0) {
        return res.status(400).json({ error: 'Please enter a valid guest count greater than 0.' });
      }

      const plan = await generatePartyPlanWithGemini({
        budget: Number(budget),
        guestCount: Number(guestCount),
        eventType: eventType || 'Birthday',
        venue: venue || 'Banquet Hall',
        foodPreference: foodPreference || 'Mixed',
        decorationStyle: decorationStyle || 'Elegant',
        entertainment: entertainment || ['Music'],
        requirements: requirements || '',
      });

      // Save to server history
      serverState.history.unshift(plan);
      serverState.currentUser.totalPlansCreated += 1;

      return res.json({ success: true, plan });
    } catch (err: any) {
      console.error('Error generating party plan:', err);
      return res.status(500).json({
        error: 'Something went wrong while generating your party plan. Please try again.',
      });
    }
  });

  // Jewelry Generation
  app.post('/api/generate-jewelry', async (req: Request, res: Response) => {
    try {
      const { budget, occasion, jewelryType, style, metalPreference, outfitDescription, image } = req.body;
      if (!budget || isNaN(Number(budget)) || Number(budget) <= 0) {
        return res.status(400).json({ error: 'Please enter a valid budget greater than 0.' });
      }

      const plan = await generateJewelryPlanWithGemini({
        budget: Number(budget),
        occasion: occasion || 'Wedding',
        jewelryType: jewelryType || 'Complete Set',
        style: style || 'Traditional',
        metalPreference: metalPreference || 'Gold Plated',
        outfitDescription: outfitDescription || 'Festive outfit',
        image: image || null,
      });

      // Save to server history
      serverState.history.unshift(plan);
      serverState.currentUser.totalPlansCreated += 1;

      return res.json({ success: true, plan });
    } catch (err: any) {
      console.error('Error generating jewelry plan:', err);
      return res.status(500).json({
        error: 'Something went wrong while generating your jewelry recommendations. Please try again.',
      });
    }
  });

  // History Endpoints
  app.get('/api/history', (req: Request, res: Response) => {
    res.json({ history: serverState.history });
  });

  app.post('/api/history', (req: Request, res: Response) => {
    const { plan } = req.body;
    if (!plan || !plan.id) {
      return res.status(400).json({ error: 'Invalid plan object.' });
    }
    const existingIndex = serverState.history.findIndex((p) => p.id === plan.id);
    if (existingIndex >= 0) {
      serverState.history[existingIndex] = plan;
    } else {
      serverState.history.unshift(plan);
      serverState.currentUser.totalPlansCreated += 1;
    }
    res.json({ success: true, plan });
  });

  app.delete('/api/history/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    serverState.history = serverState.history.filter((p) => p.id !== id);
    res.json({ success: true, message: 'Plan removed from history' });
  });

  // Saved Recommendations Endpoints
  app.get('/api/saved', (req: Request, res: Response) => {
    res.json({ savedItems: serverState.savedItems });
  });

  app.post('/api/saved', (req: Request, res: Response) => {
    const { item } = req.body;
    if (!item || !item.name) {
      return res.status(400).json({ error: 'Invalid item object' });
    }
    const newItem = {
      id: item.id || `saved-${Date.now()}`,
      planId: item.planId,
      plannerType: item.plannerType || 'home',
      name: item.name,
      category: item.category || 'General',
      estimatedPrice: Number(item.estimatedPrice) || Number(item.estimatedTotalPrice) || 0,
      quantity: Number(item.quantity) || 1,
      reason: item.reason || '',
      styleMatch: item.styleMatch || '',
      material: item.material || '',
      alternative: item.alternative || '',
      dateSaved: new Date().toISOString(),
      sourceType: 'ai_estimate' as const,
      vendor: item.vendor || 'AI Estimated Recommendation',
    };

    // Avoid duplicate saves
    const exists = serverState.savedItems.some((s) => s.name === newItem.name);
    if (!exists) {
      serverState.savedItems.unshift(newItem);
      serverState.currentUser.savedItemsCount = serverState.savedItems.length;
    }
    res.json({ success: true, item: newItem });
  });

  app.delete('/api/saved/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    serverState.savedItems = serverState.savedItems.filter((s) => s.id !== id);
    serverState.currentUser.savedItemsCount = serverState.savedItems.length;
    res.json({ success: true, message: 'Item removed from saved list' });
  });

  // Auth / User Profile Endpoints
  app.get('/api/auth/profile', (req: Request, res: Response) => {
    res.json({
      user: {
        ...serverState.currentUser,
        savedItemsCount: serverState.savedItems.length,
        totalPlansCreated: serverState.history.length,
      },
    });
  });

  app.put('/api/auth/profile', (req: Request, res: Response) => {
    const { name, currency } = req.body;
    if (name) serverState.currentUser.name = name;
    if (currency) serverState.currentUser.currency = currency;
    res.json({ success: true, user: serverState.currentUser });
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      currency: 'INR',
      joinedDate: new Date().toISOString(),
      totalPlansCreated: 0,
      savedItemsCount: 0,
    };
    serverState.users.push(newUser);
    serverState.currentUser = newUser;
    res.json({ success: true, user: newUser, token: `demo-jwt-${Date.now()}` });
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }
    const found = serverState.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      serverState.currentUser = found;
    } else {
      // Demo convenience: allow instant sign in
      const defaultUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        currency: 'INR',
        joinedDate: new Date().toISOString(),
        totalPlansCreated: serverState.history.length,
        savedItemsCount: serverState.savedItems.length,
      };
      serverState.currentUser = defaultUser;
    }

    res.json({ success: true, user: serverState.currentUser, token: `demo-jwt-${Date.now()}` });
  });

  // Attach Vite middleware in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production serve dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PocketSmart AI server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

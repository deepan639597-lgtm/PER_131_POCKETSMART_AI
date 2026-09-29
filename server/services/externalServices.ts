/**
 * External Platform Integration Architecture
 * Interfaces and stubs for Amazon, Flipkart, IKEA, Swiggy, Zomato, OYO.
 * When real API credentials are configured in backend environment variables,
 * these services will query real live vendor catalogs.
 *
 * Current status: Disconnected / AI Estimated Mode.
 * Strictly labels every output as 'AI Recommendation (Estimated)'.
 */

export interface ExternalProductQuery {
  query: string;
  category?: string;
  maxBudget?: number;
  limit?: number;
}

export interface ExternalProductItem {
  id: string;
  name: string;
  vendor: 'Amazon' | 'Flipkart' | 'IKEA' | 'Swiggy' | 'Zomato' | 'OYO';
  category: string;
  estimatedPrice: number;
  currency: string;
  isAiEstimated: boolean;
  statusNotice: string;
  urlPlaceholder: string;
  ratingNotice?: string;
}

export interface VendorService {
  name: string;
  isConfigured: () => boolean;
  searchProducts: (params: ExternalProductQuery) => Promise<ExternalProductItem[]>;
}

export class AmazonService implements VendorService {
  name = 'Amazon';
  isConfigured(): boolean {
    return Boolean(process.env.AMAZON_API_KEY && process.env.AMAZON_ASSOCIATE_TAG);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    if (!this.isConfigured()) {
      return [
        {
          id: `amz-est-${Date.now()}-1`,
          name: `${params.query} (Standard Grade)`,
          vendor: 'Amazon',
          category: params.category || 'General',
          estimatedPrice: Math.min(params.maxBudget || 5000, 4500),
          currency: 'INR',
          isAiEstimated: true,
          statusNotice: 'AI Estimated Recommendation — Amazon Product Advertising API not configured.',
          urlPlaceholder: 'https://www.amazon.in',
        },
      ];
    }
    // Future live implementation with Amazon PA-API SDK
    return [];
  }
}

export class FlipkartService implements VendorService {
  name = 'Flipkart';
  isConfigured(): boolean {
    return Boolean(process.env.FLIPKART_AFFILIATE_KEY);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    return [
      {
        id: `fk-est-${Date.now()}-1`,
        name: `${params.query} (Curated Budget Selection)`,
        vendor: 'Flipkart',
        category: params.category || 'General',
        estimatedPrice: Math.min(params.maxBudget || 4000, 3800),
        currency: 'INR',
        isAiEstimated: true,
        statusNotice: 'AI Estimated Recommendation — Flipkart Affiliate API not configured.',
        urlPlaceholder: 'https://www.flipkart.com',
      },
    ];
  }
}

export class IKEAService implements VendorService {
  name = 'IKEA';
  isConfigured(): boolean {
    return Boolean(process.env.IKEA_PARTNER_KEY);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    return [
      {
        id: `ikea-est-${Date.now()}-1`,
        name: `${params.query} (Scandinavian Modular Design)`,
        vendor: 'IKEA',
        category: params.category || 'Home Interior',
        estimatedPrice: Math.min(params.maxBudget || 12000, 11500),
        currency: 'INR',
        isAiEstimated: true,
        statusNotice: 'AI Estimated Recommendation — IKEA Catalog API in sandbox mode.',
        urlPlaceholder: 'https://www.ikea.com/in',
      },
    ];
  }
}

export class SwiggyService implements VendorService {
  name = 'Swiggy';
  isConfigured(): boolean {
    return Boolean(process.env.SWIGGY_CATERING_KEY);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    return [
      {
        id: `swiggy-est-${Date.now()}-1`,
        name: `${params.query} (Bulk Catering / Party Food Pack)`,
        vendor: 'Swiggy',
        category: 'Event Catering',
        estimatedPrice: Math.min(params.maxBudget || 15000, 14000),
        currency: 'INR',
        isAiEstimated: true,
        statusNotice: 'AI Estimated Recommendation — Swiggy Bulk Catering API not configured.',
        urlPlaceholder: 'https://www.swiggy.com',
      },
    ];
  }
}

export class ZomatoService implements VendorService {
  name = 'Zomato';
  isConfigured(): boolean {
    return Boolean(process.env.ZOMATO_API_KEY);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    return [
      {
        id: `zomato-est-${Date.now()}-1`,
        name: `${params.query} (Celebration Buffet & Platters)`,
        vendor: 'Zomato',
        category: 'Event Catering',
        estimatedPrice: Math.min(params.maxBudget || 18000, 16500),
        currency: 'INR',
        isAiEstimated: true,
        statusNotice: 'AI Estimated Recommendation — Zomato Catering Partner API not configured.',
        urlPlaceholder: 'https://www.zomato.com',
      },
    ];
  }
}

export class OYOService implements VendorService {
  name = 'OYO';
  isConfigured(): boolean {
    return Boolean(process.env.OYO_VENUE_KEY);
  }

  async searchProducts(params: ExternalProductQuery): Promise<ExternalProductItem[]> {
    return [
      {
        id: `oyo-est-${Date.now()}-1`,
        name: `${params.query} (Townhouse / Banquet Space)`,
        vendor: 'OYO',
        category: 'Event Venue',
        estimatedPrice: Math.min(params.maxBudget || 20000, 18000),
        currency: 'INR',
        isAiEstimated: true,
        statusNotice: 'AI Estimated Recommendation — OYO Event Spaces API not configured.',
        urlPlaceholder: 'https://www.oyorooms.com',
      },
    ];
  }
}

export const vendorRegistry = {
  amazon: new AmazonService(),
  flipkart: new FlipkartService(),
  ikea: new IKEAService(),
  swiggy: new SwiggyService(),
  zomato: new ZomatoService(),
  oyo: new OYOService(),
};

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  role: UserRole;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  platform: 'shopify' | 'woocommerce' | 'amazon' | 'flipkart';
  totalSpent: number;
  orderCount: number;
  lastOrderDate: string;
  firstOrderDate: string;
  averageOrderValue: number;
  rfmScore: {
    recency: number;
    frequency: number;
    monetary: number;
    total: number;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  emotions: {
    joy: number;
    anger: number;
    sadness: number;
    fear: number;
    surprise: number;
  };
  personality: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  segmentId: string;
  churnRisk: number;
  lifetimeValue: number;
  tags: string[];
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  color: string;
  customerCount: number;
  averageValue: number;
  characteristics: string[];
  recommendations: string[];
  emotionalProfile: {
    dominant: string;
    secondary: string;
  };
  personalityTraits: string[];
  pricingRule?: PricingRule;
}

export interface PricingRule {
  segmentId: string;
  strategy: 'premium' | 'discount' | 'standard' | 'dynamic' | 'loyalty';
  priceMultiplier: number;
  maxDiscount: number;
  minPrice: number;
  description: string;
  conditions: {
    minOrderValue?: number;
    maxOrderValue?: number;
    timeBasedAdjustment?: boolean;
    inventoryBasedAdjustment?: boolean;
  };
}

export interface DynamicPrice {
  customerId: string;
  productId: string;
  basePrice: number;
  adjustedPrice: number;
  discount: number;
  reason: string;
  segmentId: string;
  validUntil: string;
}

export interface PlatformConnection {
  id: string;
  platform: 'shopify' | 'woocommerce' | 'amazon' | 'flipkart';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  customerCount: number;
  apiKey?: string;
  storeName?: string;
}

export interface Recommendation {
  id: string;
  segmentId: string;
  type: 'marketing' | 'retention' | 'upsell' | 'cross-sell';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  expectedImpact: string;
  actionItems: string[];
}

export interface AnalyticsData {
  totalCustomers: number;
  totalRevenue: number;
  averageOrderValue: number;
  churnRate: number;
  segmentDistribution: {
    segmentId: string;
    count: number;
    percentage: number;
  }[];
  emotionTrends: {
    date: string;
    joy: number;
    anger: number;
    sadness: number;
    fear: number;
    surprise: number;
  }[];
  revenueBySegment: {
    segmentId: string;
    revenue: number;
  }[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'flash_sale' | 'vip_reward' | 'free_shipping' | 'bundle' | 'exclusive_access';
  segmentIds: string[];
  discountValue: number;
  discountType: 'percentage' | 'fixed';
  validFrom: string;
  validUntil: string;
  status: 'draft' | 'active' | 'scheduled' | 'expired';
  targetCustomers: number;
  sentCount: number;
  openRate: number;
  conversionRate: number;
  revenue: number;
  createdAt: string;
  conditions?: {
    minPurchase?: number;
    maxUses?: number;
    firstTimeOnly?: boolean;
  };
}

export interface OfferTemplate {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'flash_sale' | 'vip_reward' | 'free_shipping' | 'bundle' | 'exclusive_access';
  recommendedSegments: string[];
  defaultDiscount: number;
  discountType: 'percentage' | 'fixed';
  emailSubject: string;
  emailBody: string;
  psychologyTriggers: string[];
}

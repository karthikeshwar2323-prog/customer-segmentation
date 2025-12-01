export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
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

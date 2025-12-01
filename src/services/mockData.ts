import type { Customer, Segment, PlatformConnection, Recommendation, AnalyticsData } from '@/types';

export const mockSegments: Segment[] = [
  {
    id: 'seg-1',
    name: 'Impulsive Emotional Buyers',
    description: 'High-frequency buyers driven by emotions and impulse purchases',
    color: 'hsl(217 91% 60%)',
    customerCount: 1245,
    averageValue: 3250,
    characteristics: [
      'High purchase frequency',
      'Low cart abandonment',
      'Responds well to limited-time offers',
      'Strong emotional connection to brand'
    ],
    recommendations: [
      'Send flash sale notifications',
      'Create urgency with countdown timers',
      'Offer exclusive early access to new products'
    ],
    emotionalProfile: {
      dominant: 'Joy',
      secondary: 'Surprise'
    },
    personalityTraits: ['High Extraversion', 'High Openness', 'Low Conscientiousness']
  },
  {
    id: 'seg-2',
    name: 'Price-Sensitive Anxious Buyers',
    description: 'Careful shoppers who compare prices and seek best deals',
    color: 'hsl(38 92% 50%)',
    customerCount: 892,
    averageValue: 1850,
    characteristics: [
      'High cart abandonment rate',
      'Long decision-making time',
      'Responds to discounts and coupons',
      'Frequent price comparisons'
    ],
    recommendations: [
      'Offer price-match guarantees',
      'Send abandoned cart emails with discounts',
      'Provide detailed product comparisons'
    ],
    emotionalProfile: {
      dominant: 'Fear',
      secondary: 'Sadness'
    },
    personalityTraits: ['High Neuroticism', 'High Conscientiousness', 'Low Extraversion']
  },
  {
    id: 'seg-3',
    name: 'Brand-Loyal Confident Buyers',
    description: 'Repeat customers with strong brand loyalty and high lifetime value',
    color: 'hsl(142 76% 36%)',
    customerCount: 567,
    averageValue: 5420,
    characteristics: [
      'Very high lifetime value',
      'Consistent purchase patterns',
      'Low churn risk',
      'Brand advocates'
    ],
    recommendations: [
      'Launch VIP loyalty program',
      'Request product reviews and testimonials',
      'Offer referral incentives'
    ],
    emotionalProfile: {
      dominant: 'Joy',
      secondary: 'Surprise'
    },
    personalityTraits: ['High Agreeableness', 'High Conscientiousness', 'Low Neuroticism']
  },
  {
    id: 'seg-4',
    name: 'Curious Browsers',
    description: 'Window shoppers with high engagement but low conversion',
    color: 'hsl(271 81% 56%)',
    customerCount: 2134,
    averageValue: 450,
    characteristics: [
      'High website engagement',
      'Low purchase frequency',
      'Interested in product information',
      'Needs conversion nudge'
    ],
    recommendations: [
      'Implement exit-intent popups',
      'Offer first-time buyer discounts',
      'Create engaging product content'
    ],
    emotionalProfile: {
      dominant: 'Surprise',
      secondary: 'Joy'
    },
    personalityTraits: ['High Openness', 'Low Conscientiousness', 'Moderate Extraversion']
  },
  {
    id: 'seg-5',
    name: 'Luxury Seekers',
    description: 'Premium customers seeking high-end products and experiences',
    color: 'hsl(280 65% 60%)',
    customerCount: 234,
    averageValue: 8750,
    characteristics: [
      'Highest average order value',
      'Quality over price',
      'Seeks premium experiences',
      'Low price sensitivity'
    ],
    recommendations: [
      'Curate premium product collections',
      'Offer white-glove customer service',
      'Create exclusive membership tiers'
    ],
    emotionalProfile: {
      dominant: 'Joy',
      secondary: 'Surprise'
    },
    personalityTraits: ['High Openness', 'Low Neuroticism', 'High Extraversion']
  },
  {
    id: 'seg-6',
    name: 'Frustrated At-Risk Customers',
    description: 'Previously active customers showing signs of churn',
    color: 'hsl(0 84.2% 60.2%)',
    customerCount: 423,
    averageValue: 1200,
    characteristics: [
      'Declining purchase frequency',
      'Negative sentiment in reviews',
      'High churn risk',
      'Recent service issues'
    ],
    recommendations: [
      'Implement win-back campaigns',
      'Offer personalized apology discounts',
      'Conduct satisfaction surveys'
    ],
    emotionalProfile: {
      dominant: 'Anger',
      secondary: 'Sadness'
    },
    personalityTraits: ['High Neuroticism', 'Low Agreeableness', 'Moderate Conscientiousness']
  }
];

const generateCustomer = (index: number, segment: Segment): Customer => {
  const platforms: Array<'shopify' | 'woocommerce' | 'amazon' | 'flipkart'> = ['shopify', 'woocommerce', 'amazon', 'flipkart'];
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const orderCount = Math.floor(Math.random() * 50) + 1;
  const totalSpent = segment.averageValue + (Math.random() - 0.5) * 1000;
  const averageOrderValue = totalSpent / orderCount;
  
  const daysSinceLastOrder = Math.floor(Math.random() * 180);
  const daysSinceFirstOrder = Math.floor(Math.random() * 730) + daysSinceLastOrder;
  
  const lastOrderDate = new Date(Date.now() - daysSinceLastOrder * 24 * 60 * 60 * 1000).toISOString();
  const firstOrderDate = new Date(Date.now() - daysSinceFirstOrder * 24 * 60 * 60 * 1000).toISOString();
  
  const recency = Math.max(1, Math.min(5, Math.floor((180 - daysSinceLastOrder) / 36) + 1));
  const frequency = Math.max(1, Math.min(5, Math.floor(orderCount / 10) + 1));
  const monetary = Math.max(1, Math.min(5, Math.floor(totalSpent / 2000) + 1));
  
  const sentiment = segment.id === 'seg-6' ? 'negative' : 
                   segment.id === 'seg-3' ? 'positive' : 
                   sentiments[Math.floor(Math.random() * sentiments.length)];
  
  const emotions = {
    joy: segment.emotionalProfile.dominant === 'Joy' ? 0.7 + Math.random() * 0.3 : Math.random() * 0.4,
    anger: segment.emotionalProfile.dominant === 'Anger' ? 0.6 + Math.random() * 0.4 : Math.random() * 0.3,
    sadness: segment.emotionalProfile.dominant === 'Sadness' ? 0.5 + Math.random() * 0.5 : Math.random() * 0.3,
    fear: segment.emotionalProfile.dominant === 'Fear' ? 0.6 + Math.random() * 0.4 : Math.random() * 0.3,
    surprise: segment.emotionalProfile.dominant === 'Surprise' ? 0.6 + Math.random() * 0.4 : Math.random() * 0.4
  };
  
  const personality = {
    openness: Math.random(),
    conscientiousness: Math.random(),
    extraversion: Math.random(),
    agreeableness: Math.random(),
    neuroticism: Math.random()
  };
  
  const churnRisk = segment.id === 'seg-6' ? 0.7 + Math.random() * 0.3 : 
                   segment.id === 'seg-3' ? Math.random() * 0.2 : 
                   Math.random() * 0.5;
  
  const lifetimeValue = totalSpent * (1 + Math.random() * 2);
  
  return {
    id: `cust-${index}`,
    name: `Customer ${index}`,
    email: `customer${index}@example.com`,
    platform,
    totalSpent: Math.round(totalSpent),
    orderCount,
    lastOrderDate,
    firstOrderDate,
    averageOrderValue: Math.round(averageOrderValue),
    rfmScore: {
      recency,
      frequency,
      monetary,
      total: recency + frequency + monetary
    },
    sentiment,
    emotions,
    personality,
    segmentId: segment.id,
    churnRisk: Math.round(churnRisk * 100) / 100,
    lifetimeValue: Math.round(lifetimeValue),
    tags: []
  };
};

export const mockCustomers: Customer[] = mockSegments.flatMap((segment, segmentIndex) => {
  const customersPerSegment = segment.customerCount;
  return Array.from({ length: Math.min(customersPerSegment, 50) }, (_, i) => 
    generateCustomer(segmentIndex * 1000 + i, segment)
  );
});

export const mockPlatformConnections: PlatformConnection[] = [
  {
    id: 'conn-1',
    platform: 'shopify',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    customerCount: 1234,
    storeName: 'My Shopify Store'
  },
  {
    id: 'conn-2',
    platform: 'woocommerce',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    customerCount: 892,
    storeName: 'WooCommerce Shop'
  },
  {
    id: 'conn-3',
    platform: 'amazon',
    status: 'disconnected',
    lastSync: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    customerCount: 0
  },
  {
    id: 'conn-4',
    platform: 'flipkart',
    status: 'disconnected',
    lastSync: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    customerCount: 0
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    segmentId: 'seg-1',
    type: 'marketing',
    title: 'Flash Sale Campaign for Impulsive Buyers',
    description: 'Launch a 24-hour flash sale with countdown timers to trigger impulse purchases',
    priority: 'high',
    expectedImpact: '+15% conversion rate, +$45,000 revenue',
    actionItems: [
      'Create urgency-driven email campaign',
      'Set up countdown timers on product pages',
      'Offer exclusive early access to VIP customers',
      'Use push notifications for real-time alerts'
    ]
  },
  {
    id: 'rec-2',
    segmentId: 'seg-2',
    type: 'retention',
    title: 'Price Guarantee Program',
    description: 'Implement a price-match guarantee to reduce anxiety and cart abandonment',
    priority: 'high',
    expectedImpact: '-25% cart abandonment, +$32,000 revenue',
    actionItems: [
      'Create price-match policy page',
      'Add trust badges to checkout',
      'Send abandoned cart emails with price guarantees',
      'Offer 30-day price protection'
    ]
  },
  {
    id: 'rec-3',
    segmentId: 'seg-3',
    type: 'upsell',
    title: 'VIP Loyalty Program Launch',
    description: 'Create an exclusive loyalty program for brand-loyal customers',
    priority: 'medium',
    expectedImpact: '+20% repeat purchase rate, +$78,000 LTV',
    actionItems: [
      'Design tiered rewards structure',
      'Offer exclusive product previews',
      'Provide dedicated customer support',
      'Create referral incentive program'
    ]
  },
  {
    id: 'rec-4',
    segmentId: 'seg-4',
    type: 'marketing',
    title: 'First-Time Buyer Conversion Campaign',
    description: 'Convert curious browsers into buyers with targeted incentives',
    priority: 'high',
    expectedImpact: '+12% conversion rate, +$28,000 revenue',
    actionItems: [
      'Implement exit-intent popups with 10% discount',
      'Create engaging product videos',
      'Offer free shipping on first order',
      'Send personalized product recommendations'
    ]
  },
  {
    id: 'rec-5',
    segmentId: 'seg-5',
    type: 'upsell',
    title: 'Premium Concierge Service',
    description: 'Launch white-glove service for luxury segment customers',
    priority: 'medium',
    expectedImpact: '+30% AOV, +$65,000 revenue',
    actionItems: [
      'Create exclusive product collections',
      'Offer personal shopping assistance',
      'Provide premium packaging options',
      'Implement priority customer support'
    ]
  },
  {
    id: 'rec-6',
    segmentId: 'seg-6',
    type: 'retention',
    title: 'Win-Back Campaign for At-Risk Customers',
    description: 'Re-engage frustrated customers with personalized apology offers',
    priority: 'high',
    expectedImpact: '-40% churn rate, +$18,000 retained revenue',
    actionItems: [
      'Send personalized apology emails',
      'Offer 20% discount on next purchase',
      'Conduct satisfaction surveys',
      'Provide dedicated support for issue resolution'
    ]
  }
];

export const mockAnalyticsData: AnalyticsData = {
  totalCustomers: mockSegments.reduce((sum, seg) => sum + seg.customerCount, 0),
  totalRevenue: 2847500,
  averageOrderValue: 285,
  churnRate: 0.12,
  segmentDistribution: mockSegments.map(seg => ({
    segmentId: seg.id,
    count: seg.customerCount,
    percentage: Math.round((seg.customerCount / mockSegments.reduce((sum, s) => sum + s.customerCount, 0)) * 100)
  })),
  emotionTrends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    joy: 0.5 + Math.random() * 0.3,
    anger: 0.1 + Math.random() * 0.2,
    sadness: 0.1 + Math.random() * 0.2,
    fear: 0.15 + Math.random() * 0.2,
    surprise: 0.2 + Math.random() * 0.3
  })),
  revenueBySegment: mockSegments.map(seg => ({
    segmentId: seg.id,
    revenue: seg.customerCount * seg.averageValue
  }))
};

import type { Customer, Segment, PlatformConnection, Recommendation, AnalyticsData, Offer, OfferTemplate } from '@/types';

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

export const mockOfferTemplates: OfferTemplate[] = [
  {
    id: 'template-1',
    name: '24-Hour Flash Sale',
    description: 'Create urgency with time-limited offers',
    type: 'flash_sale',
    recommendedSegments: ['seg-1'],
    defaultDiscount: 25,
    discountType: 'percentage',
    emailSubject: '⚡ Flash Sale: {discount}% OFF - Only 24 Hours!',
    emailBody: 'Don\'t miss out! Get {discount}% off your favorite items. This exclusive offer expires in 24 hours. Shop now before it\'s gone!',
    psychologyTriggers: ['Urgency', 'Scarcity', 'FOMO']
  },
  {
    id: 'template-2',
    name: 'Price Match Guarantee',
    description: 'Reduce purchase anxiety with price protection',
    type: 'discount',
    recommendedSegments: ['seg-2'],
    defaultDiscount: 15,
    discountType: 'percentage',
    emailSubject: 'Shop with Confidence: Price Match Guarantee + {discount}% OFF',
    emailBody: 'We guarantee the best prices! Get {discount}% off plus our 30-day price protection. If you find it cheaper elsewhere, we\'ll match it.',
    psychologyTriggers: ['Trust', 'Security', 'Value']
  },
  {
    id: 'template-3',
    name: 'VIP Exclusive Access',
    description: 'Reward loyal customers with exclusive perks',
    type: 'vip_reward',
    recommendedSegments: ['seg-3'],
    defaultDiscount: 20,
    discountType: 'percentage',
    emailSubject: 'VIP Exclusive: Early Access + {discount}% OFF',
    emailBody: 'As a valued VIP member, enjoy {discount}% off and exclusive early access to our new collection. Thank you for your loyalty!',
    psychologyTriggers: ['Exclusivity', 'Recognition', 'Loyalty']
  },
  {
    id: 'template-4',
    name: 'First Purchase Welcome',
    description: 'Convert browsers into buyers',
    type: 'discount',
    recommendedSegments: ['seg-4'],
    defaultDiscount: 10,
    discountType: 'percentage',
    emailSubject: 'Welcome! Here\'s {discount}% OFF Your First Order',
    emailBody: 'Start your journey with us! Get {discount}% off your first purchase plus free shipping. Discover why thousands of customers love us.',
    psychologyTriggers: ['Welcome', 'Low Risk', 'Trial']
  },
  {
    id: 'template-5',
    name: 'Premium Bundle Offer',
    description: 'Curated luxury experiences',
    type: 'bundle',
    recommendedSegments: ['seg-5'],
    defaultDiscount: 30,
    discountType: 'percentage',
    emailSubject: 'Exclusive Premium Collection: {discount}% OFF Luxury Bundles',
    emailBody: 'Indulge in our curated premium collection. Save {discount}% on luxury bundles with complimentary white-glove service and premium packaging.',
    psychologyTriggers: ['Luxury', 'Quality', 'Prestige']
  },
  {
    id: 'template-6',
    name: 'We Miss You - Win Back',
    description: 'Re-engage at-risk customers',
    type: 'discount',
    recommendedSegments: ['seg-6'],
    defaultDiscount: 20,
    discountType: 'percentage',
    emailSubject: 'We Miss You! Here\'s {discount}% OFF to Welcome You Back',
    emailBody: 'We noticed you haven\'t shopped with us lately. We\'d love to have you back! Enjoy {discount}% off your next order as our apology.',
    psychologyTriggers: ['Apology', 'Reconciliation', 'Value']
  }
];

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    title: 'Flash Sale: 25% OFF Everything',
    description: '24-hour flash sale for impulsive buyers',
    type: 'flash_sale',
    segmentIds: ['seg-1'],
    discountValue: 25,
    discountType: 'percentage',
    validFrom: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    targetCustomers: 1245,
    sentCount: 1245,
    openRate: 0.68,
    conversionRate: 0.34,
    revenue: 138750,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    conditions: {
      maxUses: 1
    }
  },
  {
    id: 'offer-2',
    title: 'Price Match + 15% OFF',
    description: 'Price guarantee offer for price-sensitive customers',
    type: 'discount',
    segmentIds: ['seg-2'],
    discountValue: 15,
    discountType: 'percentage',
    validFrom: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    targetCustomers: 892,
    sentCount: 892,
    openRate: 0.72,
    conversionRate: 0.28,
    revenue: 46200,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    conditions: {
      minPurchase: 50
    }
  },
  {
    id: 'offer-3',
    title: 'VIP Early Access: 20% OFF New Collection',
    description: 'Exclusive offer for brand-loyal customers',
    type: 'vip_reward',
    segmentIds: ['seg-3'],
    discountValue: 20,
    discountType: 'percentage',
    validFrom: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    targetCustomers: 567,
    sentCount: 567,
    openRate: 0.85,
    conversionRate: 0.52,
    revenue: 159000,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'offer-4',
    title: 'Welcome Offer: 10% OFF + Free Shipping',
    description: 'First-time buyer incentive',
    type: 'free_shipping',
    segmentIds: ['seg-4'],
    discountValue: 10,
    discountType: 'percentage',
    validFrom: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    targetCustomers: 2134,
    sentCount: 2134,
    openRate: 0.45,
    conversionRate: 0.15,
    revenue: 144450,
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    conditions: {
      firstTimeOnly: true
    }
  },
  {
    id: 'offer-5',
    title: 'Luxury Bundle: 30% OFF Premium Collection',
    description: 'Curated luxury experience for high-end customers',
    type: 'bundle',
    segmentIds: ['seg-5'],
    discountValue: 30,
    discountType: 'percentage',
    validFrom: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    targetCustomers: 234,
    sentCount: 0,
    openRate: 0,
    conversionRate: 0,
    revenue: 0,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    conditions: {
      minPurchase: 500
    }
  },
  {
    id: 'offer-6',
    title: 'We Miss You: 20% OFF Welcome Back',
    description: 'Win-back offer for at-risk customers',
    type: 'discount',
    segmentIds: ['seg-6'],
    discountValue: 20,
    discountType: 'percentage',
    validFrom: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    targetCustomers: 423,
    sentCount: 423,
    openRate: 0.58,
    conversionRate: 0.22,
    revenue: 22300,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

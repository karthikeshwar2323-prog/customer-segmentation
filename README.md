# AI-Driven Customer Segmentation Platform

A comprehensive AI-powered web application designed for e-commerce businesses to automatically analyze customer behavior, emotions, and psychological traits. The system integrates with major e-commerce platforms, processes customer data using advanced AI models, and generates actionable insights through intelligent segmentation and personalized recommendations.

## 🎯 Features

### Core Capabilities

- **Multi-Platform Integration**: Connect with Shopify, WooCommerce, Amazon Seller API, and Flipkart Seller API
- **AI-Powered Analysis**: Automated sentiment analysis, emotion detection, and personality trait prediction
- **Intelligent Segmentation**: Machine learning-based customer clustering (K-Means, DBSCAN)
- **Psychological Profiling**: OCEAN personality model implementation for deep customer insights
- **Actionable Recommendations**: Segment-specific marketing strategies and retention tactics
- **Real-time Analytics**: Comprehensive dashboards with emotional trends and behavioral patterns

### Customer Segments

The system automatically generates 6-10 psychological segments, including:

1. **Impulsive Emotional Buyers** - High-frequency buyers driven by emotions
2. **Price-Sensitive Anxious Buyers** - Careful shoppers seeking best deals
3. **Brand-Loyal Confident Buyers** - Repeat customers with high lifetime value
4. **Curious Browsers** - High engagement but low conversion
5. **Luxury Seekers** - Premium customers seeking high-end experiences
6. **Frustrated At-Risk Customers** - Previously active customers showing churn signals

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router v7
- **State Management**: React Hooks and Context

### Backend (Integration Points)
- **Database**: Firebase Firestore (ready for integration)
- **AI Models**: 
  - Sentiment Analysis: BERT/DistilBERT
  - Emotion Detection: RoBERTa
  - Clustering: K-Means, DBSCAN
  - Personality Analysis: OCEAN model

### Current Implementation
This version includes a fully functional frontend with mock data services that simulate AI responses. The architecture is designed to easily integrate with real backend services.

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/              # Data visualization components
│   │   ├── EmotionTrendChart.tsx
│   │   ├── SegmentDistributionChart.tsx
│   │   └── RevenueBySegmentChart.tsx
│   ├── common/              # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── MetricCard.tsx
│   │   └── SegmentBadge.tsx
│   └── ui/                  # shadcn/ui components
├── pages/                   # Main application pages
│   ├── Dashboard.tsx        # Overview with key metrics
│   ├── Segments.tsx         # Customer segment visualization
│   ├── Customers.tsx        # Customer list with filters
│   ├── Analytics.tsx        # Detailed insights and trends
│   ├── Recommendations.tsx  # AI-generated recommendations
│   └── Settings.tsx         # Platform integration settings
├── services/                # Data and API services
│   ├── mockData.ts          # Mock data generator
│   └── dataService.ts       # Data access layer
├── types/                   # TypeScript type definitions
│   └── index.ts
├── routes.tsx               # Application routing
└── App.tsx                  # Main application component
```

## 🎨 Design System

The application uses a professional blue color scheme optimized for data visualization:

- **Primary**: `hsl(217 91% 60%)` - Professional blue for main actions
- **Success**: `hsl(142 76% 36%)` - Green for positive metrics
- **Warning**: `hsl(38 92% 50%)` - Orange for alerts
- **Destructive**: `hsl(0 84.2% 60.2%)` - Red for critical issues
- **Chart Colors**: Distinct colors for each data series

## 🔧 Setup and Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd app-7xo3g02uw3k1
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to the local development URL

## 📊 Data Models

### Customer
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  platform: 'shopify' | 'woocommerce' | 'amazon' | 'flipkart';
  totalSpent: number;
  orderCount: number;
  rfmScore: { recency: number; frequency: number; monetary: number; total: number };
  sentiment: 'positive' | 'neutral' | 'negative';
  emotions: { joy: number; anger: number; sadness: number; fear: number; surprise: number };
  personality: { openness: number; conscientiousness: number; extraversion: number; agreeableness: number; neuroticism: number };
  segmentId: string;
  churnRisk: number;
  lifetimeValue: number;
}
```

### Segment
```typescript
interface Segment {
  id: string;
  name: string;
  description: string;
  color: string;
  customerCount: number;
  averageValue: number;
  characteristics: string[];
  recommendations: string[];
  emotionalProfile: { dominant: string; secondary: string };
  personalityTraits: string[];
}
```

## 🔌 Integration Guide

### E-commerce Platform Integration

The application is designed to connect with multiple e-commerce platforms:

#### Shopify
```typescript
// API endpoint: /admin/api/2024-01/customers.json
// Authentication: API Key or OAuth
// Required scopes: read_customers, read_orders
```

#### WooCommerce
```typescript
// API endpoint: /wp-json/wc/v3/customers
// Authentication: Consumer Key + Consumer Secret
// Required permissions: read
```

#### Amazon Seller API
```typescript
// API endpoint: MWS API or SP-API
// Authentication: AWS Signature
// Required permissions: Customer data access
```

#### Flipkart Seller API
```typescript
// API endpoint: Seller API v3
// Authentication: API Key
// Required permissions: Order and customer data
```

### Firebase/Firestore Integration

To integrate with Firebase Firestore:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Create the following collections:
   - `customers` - Customer data
   - `segments` - Segment definitions
   - `emotions` - Emotion analysis results
   - `recommendations` - AI-generated recommendations

4. Set up security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /customers/{customerId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /segments/{segmentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

5. Update the data service to use Firebase SDK instead of mock data

### AI Model Integration

To integrate real AI models:

1. **Sentiment Analysis**: Deploy BERT/DistilBERT model
   - Input: Customer reviews, feedback, chat messages
   - Output: Sentiment score (positive/neutral/negative)

2. **Emotion Detection**: Deploy RoBERTa model
   - Input: Text data from customer interactions
   - Output: Emotion scores (joy, anger, sadness, fear, surprise)

3. **Personality Analysis**: Implement OCEAN model
   - Input: Customer behavioral data and text
   - Output: Personality trait scores (openness, conscientiousness, extraversion, agreeableness, neuroticism)

4. **Clustering**: Implement K-Means or DBSCAN
   - Input: RFM scores, emotions, personality traits
   - Output: Customer segment assignments

## 📈 Usage Guide

### Dashboard
- View overall metrics and key performance indicators
- Monitor emotional trends over time
- See segment distribution and revenue breakdown
- Access quick action items for immediate attention

### Segments
- Explore all customer segments with detailed profiles
- View emotional and personality characteristics
- See customer count and average value per segment
- Click on segments for detailed analysis

### Customers
- Browse all customers with advanced filtering
- Filter by segment, platform, sentiment
- Search by name or email
- View RFM scores and churn risk

### Analytics
- Deep dive into segment performance
- Analyze emotional trends and patterns
- Review behavioral insights
- Track key metrics over time

### Recommendations
- View AI-generated recommendations by segment
- Filter by type (marketing, retention, upsell, cross-sell)
- See expected impact and priority levels
- Access detailed action items

### Settings
- Connect e-commerce platforms
- Configure API keys and credentials
- Sync customer data manually
- View AI model configuration

## 🔒 Security Considerations

- Never commit API keys or credentials to version control
- Use environment variables for sensitive configuration
- Implement proper authentication and authorization
- Enable HTTPS for all API communications
- Follow GDPR and data privacy regulations
- Implement rate limiting for API calls
- Regularly audit access logs

## 🚧 Future Enhancements

- Real-time data synchronization
- Advanced filtering and search capabilities
- Export functionality (PDF, CSV, Excel)
- Email notification system
- A/B testing integration
- Predictive analytics for customer lifetime value
- Multi-language support
- Mobile application
- Advanced visualization options
- Custom segment creation

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For technical support or questions:
- Review the documentation
- Check the integration guides
- Contact the development team

---

**Note**: This is a demonstration version with mock data. For production use, integrate with real e-commerce platforms and AI services as described in the integration guide.

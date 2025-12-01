# Dynamic Pricing System - Complete Guide

## Overview

The Dynamic Pricing system enables you to automatically adjust product prices for different customer segments based on their psychological profiles, behaviors, and purchasing patterns. This sophisticated pricing engine maximizes revenue while maintaining customer satisfaction through personalized pricing strategies.

## Key Concepts

### What is Dynamic Pricing?

Dynamic pricing (also called surge pricing, demand pricing, or time-based pricing) is a strategy where businesses set flexible prices for products or services based on current market demands, customer segments, and other factors.

### Why Segment-Based Pricing?

Different customer segments have different price sensitivities and value perceptions:
- **Luxury Seekers** value quality over price and are willing to pay premium
- **Price-Sensitive Buyers** need competitive pricing to convert
- **Brand-Loyal Customers** deserve rewards for their loyalty
- **At-Risk Customers** need incentives to prevent churn

## Pricing Strategies

### 1. Premium Strategy
**Best For**: Luxury Seekers

**Characteristics**:
- Price Multiplier: 1.10 - 1.20 (10-20% higher)
- Max Discount: 5-10%
- Min Price: Higher threshold
- Focus: Quality, exclusivity, superior service

**Example**:
```
Base Price: $100
Adjusted Price: $115 (15% premium)
Reason: Premium pricing with exclusive benefits
```

**Benefits**:
- Higher profit margins
- Reinforces premium brand perception
- Attracts quality-conscious customers
- Funds superior customer service

### 2. Discount Strategy
**Best For**: Price-Sensitive Anxious Buyers, Curious Browsers, At-Risk Customers

**Characteristics**:
- Price Multiplier: 0.85 - 0.95 (5-15% lower)
- Max Discount: 15-30%
- Min Price: Lower threshold
- Focus: Value, savings, affordability

**Example**:
```
Base Price: $100
Adjusted Price: $92 (8% discount)
Reason: Segment discount to reduce purchase anxiety
```

**Benefits**:
- Increases conversion rates
- Reduces cart abandonment
- Attracts price-conscious shoppers
- Prevents customer churn

### 3. Standard Strategy
**Best For**: General customer base

**Characteristics**:
- Price Multiplier: 1.0 (no adjustment)
- Max Discount: 10-15%
- Min Price: Standard threshold
- Focus: Consistency, fairness

**Example**:
```
Base Price: $100
Adjusted Price: $100 (no change)
Reason: Standard pricing
```

**Benefits**:
- Simple and transparent
- Easy to manage
- Predictable revenue
- Fair to all customers

### 4. Dynamic Strategy
**Best For**: Impulsive Emotional Buyers

**Characteristics**:
- Price Multiplier: 0.95 - 1.10 (varies)
- Max Discount: 15-25%
- Time-based adjustments
- Inventory-based adjustments
- Focus: Urgency, scarcity, FOMO

**Example**:
```
Base Price: $100
Adjusted Price: $95 during flash sale hours
Reason: Flash sale active! 10% off (10am-2pm, 6pm-10pm)
```

**Benefits**:
- Maximizes revenue during peak times
- Creates urgency and excitement
- Clears inventory efficiently
- Captures impulse purchases

### 5. Loyalty Strategy
**Best For**: Brand-Loyal Confident Buyers

**Characteristics**:
- Price Multiplier: 1.0 (standard price)
- Max Discount: 10%
- Additional rewards and benefits
- Focus: Recognition, appreciation, retention

**Example**:
```
Base Price: $100
Adjusted Price: $100
Reason: Loyalty member - earn 2x rewards points
```

**Benefits**:
- Strengthens customer relationships
- Increases lifetime value
- Encourages repeat purchases
- Builds brand advocates

## Segment Pricing Rules

### Impulsive Emotional Buyers
```json
{
  "strategy": "dynamic",
  "priceMultiplier": 1.05,
  "maxDiscount": 15,
  "minPrice": 0,
  "description": "Slightly higher prices with frequent flash discounts",
  "conditions": {
    "timeBasedAdjustment": true
  }
}
```

**Rationale**: These customers respond to urgency and excitement. Slightly higher base prices allow room for dramatic flash sales that trigger impulse purchases.

### Price-Sensitive Anxious Buyers
```json
{
  "strategy": "discount",
  "priceMultiplier": 0.92,
  "maxDiscount": 20,
  "minPrice": 0,
  "description": "Lower base prices with visible savings",
  "conditions": {
    "minOrderValue": 50
  }
}
```

**Rationale**: These customers need to see clear value and savings. Lower prices reduce purchase anxiety and increase conversion rates.

### Brand-Loyal Confident Buyers
```json
{
  "strategy": "loyalty",
  "priceMultiplier": 1.0,
  "maxDiscount": 10,
  "minPrice": 0,
  "description": "Standard pricing with loyalty rewards",
  "conditions": {
    "minOrderValue": 100
  }
}
```

**Rationale**: Loyal customers don't need price incentives. They value recognition and exclusive benefits over discounts.

### Curious Browsers
```json
{
  "strategy": "discount",
  "priceMultiplier": 0.95,
  "maxDiscount": 15,
  "minPrice": 0,
  "description": "Attractive entry prices with first-purchase incentives",
  "conditions": {
    "minOrderValue": 25
  }
}
```

**Rationale**: These customers need a nudge to convert. Attractive pricing with low minimum orders reduces barriers to first purchase.

### Luxury Seekers
```json
{
  "strategy": "premium",
  "priceMultiplier": 1.15,
  "maxDiscount": 5,
  "minPrice": 100,
  "description": "Premium pricing with exclusive benefits",
  "conditions": {
    "minOrderValue": 200,
    "inventoryBasedAdjustment": true
  }
}
```

**Rationale**: These customers associate higher prices with quality. Premium pricing reinforces brand prestige and funds superior service.

### Frustrated At-Risk Customers
```json
{
  "strategy": "discount",
  "priceMultiplier": 0.85,
  "maxDiscount": 30,
  "minPrice": 0,
  "description": "Aggressive win-back pricing",
  "conditions": {
    "minOrderValue": 30,
    "timeBasedAdjustment": true
  }
}
```

**Rationale**: These customers are at risk of churning. Aggressive discounts demonstrate commitment to winning them back.

## Using the Dynamic Pricing Page

### Overview Tab

The Overview tab displays all segment pricing rules with detailed information:

**For Each Segment You'll See**:
- Segment name and description
- Pricing strategy badge
- Price adjustment percentage
- Maximum discount allowed
- Minimum price threshold
- Strategy description
- Pricing conditions
- Revenue impact analysis

**Revenue Impact Metrics**:
- **Base Revenue**: Expected revenue at standard prices
- **Adjusted Revenue**: Expected revenue with pricing rules
- **Revenue Change**: Difference between base and adjusted
- **Change Percentage**: Percentage increase or decrease

### Price Calculator Tab

The Price Calculator allows you to test how a product price varies across segments:

**How to Use**:
1. Enter a base product price (e.g., $100)
2. View adjusted prices for each segment
3. See discount/premium amounts and percentages
4. Compare lowest, average, and highest prices

**Example Output**:
```
Base Price: $100

Luxury Seekers: $115 (+$15, +15%) [Premium]
Impulsive Buyers: $105 (+$5, +5%) [Dynamic]
Brand-Loyal: $100 ($0, 0%) [Standard]
Curious Browsers: $95 (-$5, -5%) [Discount]
Price-Sensitive: $92 (-$8, -8%) [Discount]
At-Risk: $85 (-$15, -15%) [Discount]

Lowest Price: $85
Average Price: $98.67
Highest Price: $115
```

### Revenue Impact Tab

The Revenue Impact tab shows projected revenue changes for each segment:

**Metrics Displayed**:
- Customer count per segment
- Average order value
- Base revenue (current)
- Adjusted revenue (with pricing rules)
- Revenue change (dollar amount and percentage)
- Total revenue comparison

**Use Cases**:
- Forecast revenue impact before implementing pricing changes
- Identify which segments contribute most to revenue
- Optimize pricing strategies for maximum profitability
- Justify pricing decisions to stakeholders

## Implementation Guide

### For E-commerce Platforms

#### Shopify Integration

```javascript
// Calculate personalized price for a customer
import PricingService from '@/services/pricingService';

async function getPersonalizedPrice(productId, customerId) {
  // Get customer and segment data
  const customer = await getCustomer(customerId);
  const segment = await getSegment(customer.segmentId);
  
  // Get product base price
  const product = await getProduct(productId);
  
  // Calculate personalized price
  const dynamicPrice = PricingService.calculatePrice(
    product.price,
    customer,
    segment,
    productId
  );
  
  return dynamicPrice;
}

// Display personalized price in storefront
function displayPrice(dynamicPrice) {
  if (dynamicPrice.discount > 0) {
    return `
      <span class="original-price">$${dynamicPrice.basePrice}</span>
      <span class="sale-price">$${dynamicPrice.adjustedPrice}</span>
      <span class="savings">Save $${dynamicPrice.discount}</span>
      <span class="reason">${dynamicPrice.reason}</span>
    `;
  } else {
    return `<span class="price">$${dynamicPrice.adjustedPrice}</span>`;
  }
}
```

#### WooCommerce Integration

```php
// Add personalized pricing to WooCommerce
add_filter('woocommerce_product_get_price', 'apply_segment_pricing', 10, 2);

function apply_segment_pricing($price, $product) {
    $customer_id = get_current_user_id();
    
    if (!$customer_id) {
        return $price;
    }
    
    // Get customer segment
    $segment_id = get_user_meta($customer_id, 'customer_segment', true);
    $pricing_rule = get_segment_pricing_rule($segment_id);
    
    if (!$pricing_rule) {
        return $price;
    }
    
    // Apply price multiplier
    $adjusted_price = $price * $pricing_rule['priceMultiplier'];
    
    // Apply constraints
    if ($adjusted_price < $pricing_rule['minPrice']) {
        $adjusted_price = $pricing_rule['minPrice'];
    }
    
    $max_discount = $price * ($pricing_rule['maxDiscount'] / 100);
    $discount = $price - $adjusted_price;
    
    if ($discount > $max_discount) {
        $adjusted_price = $price - $max_discount;
    }
    
    return $adjusted_price;
}
```

### API Integration

```typescript
// REST API endpoint for personalized pricing
app.post('/api/pricing/calculate', async (req, res) => {
  const { customerId, productId, basePrice } = req.body;
  
  try {
    // Get customer and segment
    const customer = await Customer.findById(customerId);
    const segment = await Segment.findById(customer.segmentId);
    
    // Calculate price
    const dynamicPrice = PricingService.calculatePrice(
      basePrice,
      customer,
      segment,
      productId
    );
    
    res.json({
      success: true,
      data: dynamicPrice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Bulk pricing calculation
app.post('/api/pricing/calculate-bulk', async (req, res) => {
  const { customerId, products } = req.body;
  
  try {
    const customer = await Customer.findById(customerId);
    const segment = await Segment.findById(customer.segmentId);
    
    const prices = PricingService.calculateBulkPrices(
      products,
      customer,
      segment
    );
    
    res.json({
      success: true,
      data: prices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

## Best Practices

### 1. Transparency and Ethics

**Do**:
- Clearly communicate pricing policies
- Ensure pricing is fair and non-discriminatory
- Provide value justification for premium pricing
- Honor advertised prices

**Don't**:
- Use deceptive pricing tactics
- Discriminate based on protected characteristics
- Change prices after adding to cart
- Hide fees or surcharges

### 2. Testing and Optimization

**A/B Testing**:
- Test different price multipliers
- Compare revenue across strategies
- Measure conversion rate impact
- Track customer satisfaction

**Metrics to Monitor**:
- Conversion rate by segment
- Average order value
- Revenue per customer
- Customer lifetime value
- Churn rate
- Customer satisfaction scores

### 3. Pricing Psychology

**Charm Pricing**: End prices in .99 or .95
```
$99.99 instead of $100.00
$14.95 instead of $15.00
```

**Anchoring**: Show original price with discount
```
Was: $100
Now: $85
You Save: $15 (15%)
```

**Scarcity**: Add urgency to dynamic pricing
```
Flash Sale: $85 (ends in 2 hours)
Only 5 left at this price!
```

### 4. Legal Compliance

**Price Discrimination Laws**:
- Ensure compliance with Robinson-Patman Act (US)
- Follow EU pricing regulations
- Avoid discrimination based on protected characteristics
- Document business justification for pricing differences

**Consumer Protection**:
- Display total price including taxes and fees
- Honor advertised prices
- Provide clear refund policies
- Maintain price history records

### 5. Customer Communication

**When to Communicate Pricing**:
- During onboarding (explain loyalty benefits)
- In marketing emails (highlight savings)
- On product pages (show personalized prices)
- At checkout (confirm final price)

**How to Communicate**:
- "As a valued loyalty member, you earn 2x points"
- "Your exclusive price: $85 (15% off)"
- "Flash sale active! Save $15 for the next 2 hours"
- "Price-match guarantee: We'll beat any competitor's price"

## Advanced Features

### Time-Based Pricing

Adjust prices based on time of day, day of week, or season:

```typescript
// Flash sale hours: 10am-2pm and 6pm-10pm
const hour = new Date().getHours();
if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) {
  adjustedPrice -= flashDiscount;
}
```

### Inventory-Based Pricing

Adjust prices based on inventory levels:

```typescript
// Higher prices for low inventory
if (inventoryLevel < 10) {
  priceMultiplier *= 1.1; // 10% premium for scarcity
}

// Lower prices for excess inventory
if (inventoryLevel > 100) {
  priceMultiplier *= 0.9; // 10% discount to clear stock
}
```

### Competitor-Based Pricing

Adjust prices based on competitor pricing:

```typescript
// Price match or beat competitors
const competitorPrice = await getCompetitorPrice(productId);
if (competitorPrice < adjustedPrice) {
  adjustedPrice = competitorPrice * 0.95; // Beat by 5%
}
```

### Personalized Bundles

Create segment-specific product bundles:

```typescript
// Luxury bundle for premium segment
if (segment.strategy === 'premium') {
  bundle = {
    products: [mainProduct, premiumAccessory, whiteGloveService],
    price: bundlePrice * 1.1,
    savings: calculateSavings(bundle)
  };
}
```

## Troubleshooting

### Issue: Prices Not Updating

**Possible Causes**:
- Cache not cleared
- Pricing rules not saved
- Customer segment not assigned
- API integration error

**Solutions**:
1. Clear browser and server cache
2. Verify pricing rules in database
3. Check customer segment assignment
4. Review API logs for errors

### Issue: Revenue Decrease

**Possible Causes**:
- Discounts too aggressive
- Premium pricing too high
- Wrong segments targeted
- Market conditions changed

**Solutions**:
1. Review pricing multipliers
2. Analyze conversion rates by segment
3. Conduct customer surveys
4. Adjust strategies based on data

### Issue: Customer Complaints

**Possible Causes**:
- Pricing perceived as unfair
- Lack of transparency
- Prices changing unexpectedly
- Poor communication

**Solutions**:
1. Improve pricing transparency
2. Communicate value proposition
3. Implement price guarantees
4. Provide customer support

## Performance Metrics

### Key Performance Indicators (KPIs)

1. **Revenue Per Segment**
   - Target: 10-20% increase with optimized pricing
   - Track: Monthly revenue by segment

2. **Conversion Rate**
   - Target: 5-15% improvement
   - Track: Purchases / Visitors by segment

3. **Average Order Value**
   - Target: 15-25% increase for premium segments
   - Track: Total revenue / Number of orders

4. **Customer Lifetime Value**
   - Target: 20-30% increase
   - Track: Total customer spend over time

5. **Price Elasticity**
   - Measure: % change in demand / % change in price
   - Optimize: Find optimal price points

### Reporting Dashboard

Create a dashboard to monitor:
- Real-time pricing by segment
- Revenue impact comparison
- Conversion rate trends
- Customer satisfaction scores
- Pricing strategy performance

## Conclusion

Dynamic pricing based on customer segmentation is a powerful tool for maximizing revenue while maintaining customer satisfaction. By understanding your customers' psychological profiles and price sensitivities, you can offer personalized pricing that benefits both your business and your customers.

**Key Takeaways**:
- Different segments have different price sensitivities
- Personalized pricing increases revenue and conversion
- Transparency and ethics are essential
- Continuous testing and optimization improve results
- Legal compliance protects your business

**Next Steps**:
1. Review your segment pricing rules
2. Test pricing strategies with A/B tests
3. Monitor performance metrics
4. Optimize based on data
5. Communicate value to customers

---

**Last Updated**: December 1, 2025
**Version**: 1.0.0

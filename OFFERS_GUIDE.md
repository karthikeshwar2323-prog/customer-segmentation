# Personalized Offers System - Complete Guide

## Overview

The Personalized Offers system enables you to create, manage, and send targeted promotional offers to specific customer segments based on their psychological profiles, behaviors, and preferences.

## Key Features

### 1. Segment-Based Targeting
- Target specific customer segments with tailored offers
- Multi-segment campaigns for broader reach
- Automatic customer count calculation

### 2. Offer Types
- **Discount**: Percentage or fixed amount discounts
- **Flash Sale**: Time-limited urgency-driven offers
- **VIP Reward**: Exclusive perks for loyal customers
- **Free Shipping**: Shipping cost elimination
- **Bundle**: Curated product collections
- **Exclusive Access**: Early access to new products

### 3. Psychology-Driven Templates
Pre-built templates optimized for each segment's psychological triggers:

#### Template 1: 24-Hour Flash Sale
- **Best For**: Impulsive Emotional Buyers
- **Psychology Triggers**: Urgency, Scarcity, FOMO
- **Default Discount**: 25% OFF
- **Email Subject**: "⚡ Flash Sale: 25% OFF - Only 24 Hours!"
- **Strategy**: Creates immediate action through time pressure

#### Template 2: Price Match Guarantee
- **Best For**: Price-Sensitive Anxious Buyers
- **Psychology Triggers**: Trust, Security, Value
- **Default Discount**: 15% OFF
- **Email Subject**: "Shop with Confidence: Price Match Guarantee + 15% OFF"
- **Strategy**: Reduces purchase anxiety with guarantees

#### Template 3: VIP Exclusive Access
- **Best For**: Brand-Loyal Confident Buyers
- **Psychology Triggers**: Exclusivity, Recognition, Loyalty
- **Default Discount**: 20% OFF
- **Email Subject**: "VIP Exclusive: Early Access + 20% OFF"
- **Strategy**: Rewards loyalty with exclusive benefits

#### Template 4: First Purchase Welcome
- **Best For**: Curious Browsers
- **Psychology Triggers**: Welcome, Low Risk, Trial
- **Default Discount**: 10% OFF
- **Email Subject**: "Welcome! Here's 10% OFF Your First Order"
- **Strategy**: Converts browsers into first-time buyers

#### Template 5: Premium Bundle Offer
- **Best For**: Luxury Seekers
- **Psychology Triggers**: Luxury, Quality, Prestige
- **Default Discount**: 30% OFF
- **Email Subject**: "Exclusive Premium Collection: 30% OFF Luxury Bundles"
- **Strategy**: Appeals to desire for premium experiences

#### Template 6: We Miss You - Win Back
- **Best For**: Frustrated At-Risk Customers
- **Psychology Triggers**: Apology, Reconciliation, Value
- **Default Discount**: 20% OFF
- **Email Subject**: "We Miss You! Here's 20% OFF to Welcome You Back"
- **Strategy**: Re-engages churning customers

## How to Create Personalized Offers

### Step 1: Access the Offers Page
Navigate to **Offers** from the main navigation menu.

### Step 2: Click "Create Offer"
Click the "Create Offer" button in the top right corner.

### Step 3: Choose a Template (Optional)
- Select from 6 pre-built psychology-driven templates
- Templates automatically populate fields with optimized values
- Or create a custom offer from scratch

### Step 4: Configure Offer Details

#### Basic Information
- **Offer Title**: Clear, compelling title (e.g., "Flash Sale: 25% OFF Everything")
- **Description**: Brief explanation of the offer
- **Offer Type**: Select from 6 offer types
- **Discount Type**: Choose percentage (%) or fixed amount ($)
- **Discount Value**: Enter the discount amount

#### Targeting
- **Target Segments**: Select one or more customer segments
- **Target Customers**: Automatically calculated based on segments

#### Timing
- **Valid From**: Start date of the offer
- **Valid Until**: End date of the offer
- **Status**: Draft, Active, Scheduled, or Expired

#### Conditions (Optional)
- **Minimum Purchase**: Require minimum order value
- **Maximum Uses**: Limit uses per customer
- **First Time Only**: Restrict to first-time buyers

### Step 5: Review and Create
- Review all details
- Click "Create Offer" to save as draft
- Send immediately or schedule for later

## Offer Management

### Offer Status Types

1. **Draft**: Created but not sent
   - Can be edited
   - Can be sent manually
   - No performance metrics yet

2. **Active**: Currently running
   - Being sent to customers
   - Tracking performance metrics
   - Cannot be edited (create new version instead)

3. **Scheduled**: Set to start in the future
   - Will automatically activate on start date
   - Can be edited before activation
   - Customers notified when active

4. **Expired**: Past end date
   - No longer accepting redemptions
   - Performance data available
   - Can be cloned for new campaign

### Performance Metrics

Each offer tracks:
- **Sent Count**: Number of emails delivered
- **Open Rate**: Percentage of emails opened
- **Conversion Rate**: Percentage of recipients who purchased
- **Revenue Generated**: Total sales from the offer

### Filtering Offers

Use the tabs to filter offers by status:
- **All Offers**: View complete offer history
- **Active**: Currently running campaigns
- **Scheduled**: Upcoming offers
- **Drafts**: Unsent offers
- **Expired**: Past campaigns

## Best Practices

### 1. Match Offers to Segment Psychology

**Impulsive Emotional Buyers**
- Use flash sales and limited-time offers
- Create urgency with countdown timers
- Emphasize scarcity ("Only 50 left!")
- Send during peak emotional times

**Price-Sensitive Anxious Buyers**
- Offer price guarantees and protection
- Provide clear value propositions
- Include trust signals (reviews, guarantees)
- Emphasize savings and deals

**Brand-Loyal Confident Buyers**
- Reward with VIP exclusive access
- Offer early product launches
- Provide loyalty points multipliers
- Recognize their status

**Curious Browsers**
- Reduce risk with first-time discounts
- Offer free shipping to lower barriers
- Provide product education content
- Use exit-intent offers

**Luxury Seekers**
- Focus on quality over price
- Offer premium bundles
- Emphasize exclusivity and prestige
- Include white-glove services

**Frustrated At-Risk Customers**
- Send personalized apology offers
- Provide generous win-back discounts
- Include customer service contact
- Ask for feedback

### 2. Timing Strategies

**Flash Sales**: 24-48 hours maximum
**Seasonal Offers**: 1-2 weeks
**Welcome Offers**: 30 days for first purchase
**Win-Back Campaigns**: 7-14 days
**VIP Rewards**: Ongoing with quarterly updates

### 3. Discount Optimization

**High-Frequency Segments**: 15-25% discounts
**Low-Frequency Segments**: 10-15% discounts
**At-Risk Customers**: 20-30% win-back offers
**Luxury Segments**: Focus on value-adds over discounts

### 4. Email Subject Line Tips

- Use emojis for visual appeal (⚡, 👑, 🎁)
- Include discount percentage
- Create urgency when appropriate
- Personalize with segment characteristics
- Keep under 50 characters

### 5. A/B Testing Recommendations

Test different elements:
- Discount amounts (15% vs 20%)
- Offer duration (24h vs 48h)
- Subject lines
- Email send times
- Segment combinations

## Integration with E-commerce Platforms

### Shopify Integration
```javascript
// Generate unique discount codes
const discountCode = `SEGMENT-${segmentId}-${offerId}`;

// Track redemptions via Shopify API
POST /admin/api/2024-01/price_rules.json
{
  "price_rule": {
    "title": offer.title,
    "target_type": "line_item",
    "target_selection": "all",
    "allocation_method": "across",
    "value_type": "percentage",
    "value": `-${offer.discountValue}`,
    "customer_selection": "prerequisite",
    "prerequisite_customer_ids": customerIds,
    "starts_at": offer.validFrom,
    "ends_at": offer.validUntil
  }
}
```

### WooCommerce Integration
```php
// Create coupon code
$coupon = new WC_Coupon();
$coupon->set_code($offer_code);
$coupon->set_discount_type($offer->discountType === 'percentage' ? 'percent' : 'fixed_cart');
$coupon->set_amount($offer->discountValue);
$coupon->set_date_expires($offer->validUntil);
$coupon->set_email_restrictions($customer_emails);
$coupon->save();
```

### Email Service Integration

**SendGrid Example**
```javascript
const sendOffer = async (offer, customers) => {
  const personalizations = customers.map(customer => ({
    to: [{ email: customer.email, name: customer.name }],
    dynamic_template_data: {
      customer_name: customer.name,
      discount_value: offer.discountValue,
      discount_type: offer.discountType,
      offer_title: offer.title,
      valid_until: formatDate(offer.validUntil),
      discount_code: generateCode(customer.id, offer.id)
    }
  }));

  await sendgrid.send({
    from: 'offers@yourstore.com',
    template_id: 'd-xxxxxxxxxxxxx',
    personalizations
  });
};
```

## Performance Tracking

### Key Metrics to Monitor

1. **Open Rate**
   - Industry Average: 15-25%
   - Target: >30% for segmented offers
   - Improve with better subject lines

2. **Click-Through Rate**
   - Industry Average: 2-5%
   - Target: >8% for personalized offers
   - Improve with clear CTAs

3. **Conversion Rate**
   - Industry Average: 1-3%
   - Target: >5% for segment-matched offers
   - Improve with better targeting

4. **Revenue Per Email**
   - Calculate: Total Revenue / Emails Sent
   - Track by segment
   - Optimize high-performing segments

5. **ROI**
   - Calculate: (Revenue - Cost) / Cost
   - Include email costs, discount costs
   - Target: >300% ROI

### Segment Performance Comparison

Track which segments respond best to:
- Different offer types
- Discount levels
- Timing strategies
- Email messaging

## Advanced Strategies

### 1. Sequential Offers
Create offer sequences for customer journeys:
- Day 1: Welcome offer (10% OFF)
- Day 7: Product education + 15% OFF
- Day 14: Last chance 20% OFF
- Day 30: Win-back 25% OFF

### 2. Dynamic Discounts
Adjust discounts based on:
- Customer lifetime value
- Cart abandonment history
- Previous purchase behavior
- Churn risk score

### 3. Cross-Segment Campaigns
Combine segments for broader campaigns:
- "Impulsive + Curious" for new product launches
- "Loyal + Luxury" for premium collections
- "Price-Sensitive + At-Risk" for clearance sales

### 4. Seasonal Optimization
Adjust offers by season:
- Q4: Higher discounts for holiday shopping
- Q1: Win-back campaigns post-holidays
- Q2: New collection launches
- Q3: Back-to-school promotions

## Troubleshooting

### Low Open Rates
- Test different subject lines
- Optimize send times
- Clean email list
- Improve sender reputation

### Low Conversion Rates
- Verify segment targeting
- Increase discount value
- Simplify redemption process
- Add urgency elements

### High Unsubscribe Rates
- Reduce email frequency
- Improve relevance
- Segment more precisely
- Provide preference center

## API Reference

### Get All Offers
```typescript
const offers = await dataService.getOffers({
  status: 'active',
  segmentId: 'seg-1'
});
```

### Create New Offer
```typescript
const newOffer = await dataService.createOffer({
  title: 'Flash Sale: 25% OFF',
  description: '24-hour flash sale',
  type: 'flash_sale',
  segmentIds: ['seg-1'],
  discountValue: 25,
  discountType: 'percentage',
  validFrom: '2025-01-01',
  validUntil: '2025-01-02',
  status: 'draft',
  targetCustomers: 1245
});
```

### Send Offer
```typescript
await dataService.sendOffer(offerId);
```

### Get Offer Templates
```typescript
const templates = await dataService.getOfferTemplates();
```

## Security Considerations

1. **Discount Code Generation**
   - Use cryptographically secure random codes
   - Include offer ID and customer ID
   - Set expiration dates
   - Limit usage per customer

2. **Email Validation**
   - Verify email addresses before sending
   - Use double opt-in for new subscribers
   - Respect unsubscribe requests immediately

3. **Fraud Prevention**
   - Monitor for unusual redemption patterns
   - Limit discount stacking
   - Track IP addresses for redemptions
   - Set maximum discount amounts

## Compliance

### GDPR Compliance
- Obtain explicit consent for marketing emails
- Provide easy unsubscribe options
- Honor data deletion requests
- Document consent timestamps

### CAN-SPAM Compliance
- Include physical address in emails
- Honor opt-out requests within 10 days
- Don't use deceptive subject lines
- Identify messages as advertisements

## Future Enhancements

Planned features:
- AI-powered discount optimization
- Predictive send time optimization
- Automated A/B testing
- Multi-channel campaigns (SMS, push notifications)
- Real-time performance dashboards
- Customer journey automation
- Dynamic content personalization
- Predictive churn prevention

---

## Quick Start Checklist

- [ ] Navigate to Offers page
- [ ] Click "Create Offer"
- [ ] Select a psychology-driven template
- [ ] Review and customize offer details
- [ ] Select target segments
- [ ] Set valid dates
- [ ] Create offer as draft
- [ ] Review performance metrics
- [ ] Send to customers
- [ ] Monitor results
- [ ] Optimize based on data

## Support

For questions or issues with the Offers system:
- Review this guide
- Check the API documentation
- Contact technical support
- Join the community forum

---

**Last Updated**: December 1, 2025
**Version**: 1.0.0

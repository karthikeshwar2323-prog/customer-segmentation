import type { Customer, Segment, DynamicPrice, PricingRule } from '@/types';

export class PricingService {
  /**
   * Calculate personalized price for a customer based on their segment
   */
  static calculatePrice(
    basePrice: number,
    customer: Customer,
    segment: Segment,
    productId: string
  ): DynamicPrice {
    const pricingRule = segment.pricingRule;
    
    if (!pricingRule) {
      return {
        customerId: customer.id,
        productId,
        basePrice,
        adjustedPrice: basePrice,
        discount: 0,
        reason: 'Standard pricing - no segment rule',
        segmentId: segment.id,
        validUntil: this.getValidUntil()
      };
    }

    let adjustedPrice = basePrice * pricingRule.priceMultiplier;
    let discount = 0;
    let reason = '';

    // Apply strategy-specific adjustments
    switch (pricingRule.strategy) {
      case 'premium':
        reason = 'Premium pricing with exclusive benefits';
        break;
      
      case 'discount':
        discount = basePrice - adjustedPrice;
        reason = `${Math.round((discount / basePrice) * 100)}% segment discount applied`;
        break;
      
      case 'loyalty':
        // Loyalty members get standard price but earn rewards
        adjustedPrice = basePrice;
        reason = 'Loyalty member - earn 2x rewards points';
        break;
      
      case 'dynamic':
        // Dynamic pricing with time-based adjustments
        if (pricingRule.conditions.timeBasedAdjustment) {
          const hour = new Date().getHours();
          // Flash sale hours: 10am-2pm and 6pm-10pm
          if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) {
            const flashDiscount = basePrice * 0.1; // Additional 10% off
            adjustedPrice -= flashDiscount;
            discount = basePrice - adjustedPrice;
            reason = `Flash sale active! ${Math.round((discount / basePrice) * 100)}% off`;
          } else {
            discount = basePrice - adjustedPrice;
            reason = `Dynamic pricing - ${Math.round((discount / basePrice) * 100)}% off`;
          }
        }
        break;
      
      case 'standard':
      default:
        adjustedPrice = basePrice;
        reason = 'Standard pricing';
        break;
    }

    // Apply minimum price constraint
    if (adjustedPrice < pricingRule.minPrice) {
      adjustedPrice = pricingRule.minPrice;
      discount = basePrice - adjustedPrice;
      reason += ' (minimum price applied)';
    }

    // Apply maximum discount constraint
    const maxDiscountAmount = basePrice * (pricingRule.maxDiscount / 100);
    if (discount > maxDiscountAmount) {
      discount = maxDiscountAmount;
      adjustedPrice = basePrice - discount;
      reason = `Maximum ${pricingRule.maxDiscount}% discount applied`;
    }

    // Ensure price is never negative
    if (adjustedPrice < 0) {
      adjustedPrice = 0;
      discount = basePrice;
    }

    return {
      customerId: customer.id,
      productId,
      basePrice,
      adjustedPrice: Math.round(adjustedPrice * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      reason,
      segmentId: segment.id,
      validUntil: this.getValidUntil()
    };
  }

  /**
   * Calculate prices for multiple products
   */
  static calculateBulkPrices(
    products: Array<{ id: string; basePrice: number }>,
    customer: Customer,
    segment: Segment
  ): DynamicPrice[] {
    return products.map(product =>
      this.calculatePrice(product.basePrice, customer, segment, product.id)
    );
  }

  /**
   * Get pricing summary for a segment
   */
  static getSegmentPricingSummary(segment: Segment): {
    strategy: string;
    description: string;
    priceAdjustment: string;
    maxDiscount: string;
    conditions: string[];
  } {
    const rule = segment.pricingRule;
    
    if (!rule) {
      return {
        strategy: 'Standard',
        description: 'No special pricing rules',
        priceAdjustment: '0%',
        maxDiscount: '0%',
        conditions: []
      };
    }

    const priceAdjustment = rule.priceMultiplier === 1.0
      ? '0%'
      : rule.priceMultiplier > 1.0
      ? `+${Math.round((rule.priceMultiplier - 1) * 100)}%`
      : `-${Math.round((1 - rule.priceMultiplier) * 100)}%`;

    const conditions: string[] = [];
    if (rule.conditions.minOrderValue) {
      conditions.push(`Minimum order: $${rule.conditions.minOrderValue}`);
    }
    if (rule.conditions.maxOrderValue) {
      conditions.push(`Maximum order: $${rule.conditions.maxOrderValue}`);
    }
    if (rule.conditions.timeBasedAdjustment) {
      conditions.push('Time-based flash sales active');
    }
    if (rule.conditions.inventoryBasedAdjustment) {
      conditions.push('Inventory-based pricing');
    }

    return {
      strategy: this.formatStrategy(rule.strategy),
      description: rule.description,
      priceAdjustment,
      maxDiscount: `${rule.maxDiscount}%`,
      conditions
    };
  }

  /**
   * Compare prices across segments for a product
   */
  static comparePricesAcrossSegments(
    basePrice: number,
    segments: Segment[],
    productId: string = 'sample-product'
  ): Array<{
    segmentName: string;
    segmentId: string;
    basePrice: number;
    adjustedPrice: number;
    discount: number;
    discountPercentage: number;
  }> {
    return segments.map(segment => {
      const rule = segment.pricingRule;
      let adjustedPrice = basePrice;
      
      if (rule) {
        adjustedPrice = basePrice * rule.priceMultiplier;
        
        // Apply minimum price
        if (adjustedPrice < rule.minPrice) {
          adjustedPrice = rule.minPrice;
        }
        
        // Apply maximum discount
        const maxDiscountAmount = basePrice * (rule.maxDiscount / 100);
        const currentDiscount = basePrice - adjustedPrice;
        if (currentDiscount > maxDiscountAmount) {
          adjustedPrice = basePrice - maxDiscountAmount;
        }
      }

      const discount = basePrice - adjustedPrice;
      const discountPercentage = (discount / basePrice) * 100;

      return {
        segmentName: segment.name,
        segmentId: segment.id,
        basePrice,
        adjustedPrice: Math.round(adjustedPrice * 100) / 100,
        discount: Math.round(discount * 100) / 100,
        discountPercentage: Math.round(discountPercentage * 100) / 100
      };
    });
  }

  /**
   * Validate if a customer qualifies for segment pricing
   */
  static validatePricingEligibility(
    customer: Customer,
    segment: Segment,
    orderValue: number
  ): { eligible: boolean; reason: string } {
    const rule = segment.pricingRule;
    
    if (!rule) {
      return { eligible: true, reason: 'No pricing rules to validate' };
    }

    if (rule.conditions.minOrderValue && orderValue < rule.conditions.minOrderValue) {
      return {
        eligible: false,
        reason: `Minimum order value of $${rule.conditions.minOrderValue} required`
      };
    }

    if (rule.conditions.maxOrderValue && orderValue > rule.conditions.maxOrderValue) {
      return {
        eligible: false,
        reason: `Maximum order value of $${rule.conditions.maxOrderValue} exceeded`
      };
    }

    return { eligible: true, reason: 'Customer qualifies for segment pricing' };
  }

  /**
   * Get valid until timestamp (24 hours from now)
   */
  private static getValidUntil(): string {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date.toISOString();
  }

  /**
   * Format strategy name for display
   */
  private static formatStrategy(strategy: string): string {
    return strategy.charAt(0).toUpperCase() + strategy.slice(1);
  }

  /**
   * Calculate potential revenue impact of pricing strategy
   */
  static calculateRevenueImpact(
    segment: Segment,
    averageOrderValue: number,
    estimatedOrders: number
  ): {
    baseRevenue: number;
    adjustedRevenue: number;
    revenueChange: number;
    revenueChangePercentage: number;
  } {
    const rule = segment.pricingRule;
    const baseRevenue = averageOrderValue * estimatedOrders;
    
    if (!rule) {
      return {
        baseRevenue,
        adjustedRevenue: baseRevenue,
        revenueChange: 0,
        revenueChangePercentage: 0
      };
    }

    const adjustedRevenue = baseRevenue * rule.priceMultiplier;
    const revenueChange = adjustedRevenue - baseRevenue;
    const revenueChangePercentage = (revenueChange / baseRevenue) * 100;

    return {
      baseRevenue: Math.round(baseRevenue * 100) / 100,
      adjustedRevenue: Math.round(adjustedRevenue * 100) / 100,
      revenueChange: Math.round(revenueChange * 100) / 100,
      revenueChangePercentage: Math.round(revenueChangePercentage * 100) / 100
    };
  }
}

export default PricingService;

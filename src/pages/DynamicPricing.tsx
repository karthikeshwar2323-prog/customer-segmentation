import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, AlertCircle, Calculator, BarChart3 } from 'lucide-react';
import type { Segment, Customer } from '@/types';
import { dataService } from '@/services/dataService';
import PricingService from '@/services/pricingService';
import SegmentBadge from '@/components/common/SegmentBadge';

export default function DynamicPricing() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [testPrice, setTestPrice] = useState<number>(100);
  const [priceComparison, setPriceComparison] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (segments.length > 0 && testPrice > 0) {
      const comparison = PricingService.comparePricesAcrossSegments(testPrice, segments);
      setPriceComparison(comparison);
    }
  }, [segments, testPrice]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [segmentsData, customersData] = await Promise.all([
        dataService.getSegments(),
        dataService.getCustomers()
      ]);
      setSegments(segmentsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStrategyBadge = (strategy: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      premium: { variant: 'default', icon: TrendingUp },
      discount: { variant: 'secondary', icon: TrendingDown },
      standard: { variant: 'outline', icon: DollarSign },
      dynamic: { variant: 'default', icon: BarChart3 },
      loyalty: { variant: 'secondary', icon: Target }
    };

    const config = variants[strategy] || variants.standard;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dynamic Pricing</h1>
          <p className="text-muted-foreground mt-1">
            Segment-based personalized pricing strategies
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calculator className="h-4 w-4" />
          Pricing Calculator
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{segments.filter(s => s.pricingRule).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {segments.length} segments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Price Adjustment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.filter(s => s.pricingRule).length > 0
                ? Math.round(
                    (segments
                      .filter(s => s.pricingRule)
                      .reduce((sum, s) => sum + ((s.pricingRule?.priceMultiplier || 1) - 1), 0) /
                      segments.filter(s => s.pricingRule).length) *
                      100
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">across all segments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Premium Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.filter(s => s.pricingRule?.strategy === 'premium').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">higher pricing tiers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Discount Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.filter(s => s.pricingRule?.strategy === 'discount').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">reduced pricing tiers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Price Calculator</TabsTrigger>
          <TabsTrigger value="impact">Revenue Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {segments.map(segment => {
              const summary = PricingService.getSegmentPricingSummary(segment);
              const revenueImpact = PricingService.calculateRevenueImpact(
                segment,
                segment.averageValue,
                segment.customerCount
              );

              return (
                <Card key={segment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <SegmentBadge name={segment.name} color={segment.color} />
                        <CardDescription className="mt-2">{segment.description}</CardDescription>
                      </div>
                      {segment.pricingRule && getStrategyBadge(segment.pricingRule.strategy)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {segment.pricingRule ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Price Adjustment</span>
                            <span className="font-medium">{summary.priceAdjustment}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Max Discount</span>
                            <span className="font-medium">{summary.maxDiscount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Min Price</span>
                            <span className="font-medium">
                              {formatCurrency(segment.pricingRule.minPrice)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-2">Strategy Description</p>
                          <p className="text-sm">{summary.description}</p>
                        </div>

                        {summary.conditions.length > 0 && (
                          <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground mb-2">Conditions</p>
                            <div className="space-y-1">
                              {summary.conditions.map((condition, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <AlertCircle className="h-3 w-3 text-muted-foreground" />
                                  <span>{condition}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-3 border-t">
                          <p className="text-sm text-muted-foreground mb-2">Revenue Impact</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Base Revenue</p>
                              <p className="text-sm font-medium">
                                {formatCurrency(revenueImpact.baseRevenue)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Adjusted Revenue</p>
                              <p className="text-sm font-medium">
                                {formatCurrency(revenueImpact.adjustedRevenue)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge
                              variant={revenueImpact.revenueChange >= 0 ? 'default' : 'secondary'}
                              className="gap-1"
                            >
                              {revenueImpact.revenueChange >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {revenueImpact.revenueChange >= 0 ? '+' : ''}
                              {formatCurrency(revenueImpact.revenueChange)} (
                              {revenueImpact.revenueChangePercentage.toFixed(1)}%)
                            </Badge>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No pricing rule configured for this segment
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Comparison Calculator</CardTitle>
              <CardDescription>
                See how a product price varies across different customer segments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testPrice">Base Product Price</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="testPrice"
                    type="number"
                    value={testPrice}
                    onChange={(e) => setTestPrice(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="max-w-xs"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Price by Segment</h3>
                <div className="space-y-2">
                  {priceComparison.map((item) => (
                    <div
                      key={item.segmentId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <SegmentBadge
                          name={item.segmentName}
                          color={
                            segments.find((s) => s.id === item.segmentId)?.color ||
                            'hsl(217 91% 60%)'
                          }
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatCurrency(item.adjustedPrice)}
                          </p>
                          {item.discount !== 0 && (
                            <p className="text-xs text-muted-foreground">
                              {item.discount > 0 ? '-' : '+'}
                              {formatCurrency(Math.abs(item.discount))} (
                              {Math.abs(item.discountPercentage).toFixed(1)}%)
                            </p>
                          )}
                        </div>
                        {item.discount !== 0 && (
                          <Badge variant={item.discount > 0 ? 'secondary' : 'default'}>
                            {item.discount > 0 ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            )}
                            {item.discount > 0 ? 'Discount' : 'Premium'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Lowest Price</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(Math.min(...priceComparison.map((p) => p.adjustedPrice)))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Price</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(
                        priceComparison.reduce((sum, p) => sum + p.adjustedPrice, 0) /
                          priceComparison.length
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Highest Price</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(Math.max(...priceComparison.map((p) => p.adjustedPrice)))}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Impact Analysis</CardTitle>
              <CardDescription>
                Projected revenue changes based on segment pricing strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segments.map((segment) => {
                  const impact = PricingService.calculateRevenueImpact(
                    segment,
                    segment.averageValue,
                    segment.customerCount
                  );

                  return (
                    <div key={segment.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <SegmentBadge name={segment.name} color={segment.color} />
                        {segment.pricingRule && getStrategyBadge(segment.pricingRule.strategy)}
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Customers</p>
                          <p className="text-sm font-medium">{segment.customerCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg Order Value</p>
                          <p className="text-sm font-medium">{formatCurrency(segment.averageValue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Base Revenue</p>
                          <p className="text-sm font-medium">{formatCurrency(impact.baseRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Adjusted Revenue</p>
                          <p className="text-sm font-medium">
                            {formatCurrency(impact.adjustedRevenue)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Revenue Change</span>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                impact.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {impact.revenueChange >= 0 ? '+' : ''}
                              {formatCurrency(impact.revenueChange)}
                            </span>
                            <Badge
                              variant={impact.revenueChange >= 0 ? 'default' : 'secondary'}
                              className="gap-1"
                            >
                              {impact.revenueChange >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {impact.revenueChangePercentage.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Total Base Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            segments.reduce((sum, s) => {
                              const impact = PricingService.calculateRevenueImpact(
                                s,
                                s.averageValue,
                                s.customerCount
                              );
                              return sum + impact.baseRevenue;
                            }, 0)
                          )}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Total Adjusted Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            segments.reduce((sum, s) => {
                              const impact = PricingService.calculateRevenueImpact(
                                s,
                                s.averageValue,
                                s.customerCount
                              );
                              return sum + impact.adjustedRevenue;
                            }, 0)
                          )}
                        </p>
                        <Badge
                          variant="default"
                          className="mt-2 gap-1"
                        >
                          <TrendingUp className="h-3 w-3" />
                          {(
                            ((segments.reduce((sum, s) => {
                              const impact = PricingService.calculateRevenueImpact(
                                s,
                                s.averageValue,
                                s.customerCount
                              );
                              return sum + impact.adjustedRevenue;
                            }, 0) -
                              segments.reduce((sum, s) => {
                                const impact = PricingService.calculateRevenueImpact(
                                  s,
                                  s.averageValue,
                                  s.customerCount
                                );
                                return sum + impact.baseRevenue;
                              }, 0)) /
                              segments.reduce((sum, s) => {
                                const impact = PricingService.calculateRevenueImpact(
                                  s,
                                  s.averageValue,
                                  s.customerCount
                                );
                                return sum + impact.baseRevenue;
                              }, 0)) *
                            100
                          ).toFixed(2)}
                          % change
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

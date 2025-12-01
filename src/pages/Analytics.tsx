import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricCard from '@/components/common/MetricCard';
import EmotionTrendChart from '@/components/charts/EmotionTrendChart';
import SegmentDistributionChart from '@/components/charts/SegmentDistributionChart';
import RevenueBySegmentChart from '@/components/charts/RevenueBySegmentChart';
import { dataService } from '@/services/dataService';
import type { Segment, AnalyticsData } from '@/types';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [segmentsData, analyticsData] = await Promise.all([
          dataService.getSegments(),
          dataService.getAnalyticsData()
        ]);
        setSegments(segmentsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">Detailed insights and trends</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-96 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return <div>Failed to load analytics data</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">Detailed insights and trends</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Customers"
              value={analytics.totalCustomers.toLocaleString()}
              icon={Users}
              trend={{ value: 12.5, isPositive: true }}
            />
            <MetricCard
              title="Total Revenue"
              value={`$${(analytics.totalRevenue / 1000).toFixed(0)}k`}
              icon={DollarSign}
              trend={{ value: 8.3, isPositive: true }}
            />
            <MetricCard
              title="Avg Order Value"
              value={`$${analytics.averageOrderValue}`}
              icon={TrendingUp}
              trend={{ value: 3.2, isPositive: true }}
            />
            <MetricCard
              title="Active Segments"
              value={segments.length}
              icon={BarChart3}
              description="AI-generated segments"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SegmentDistributionChart segments={segments} />
            <RevenueBySegmentChart segments={segments} revenueData={analytics.revenueBySegment} />
          </div>

          <EmotionTrendChart data={analytics.emotionTrends} />
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SegmentDistributionChart segments={segments} />
            <RevenueBySegmentChart segments={segments} revenueData={analytics.revenueBySegment} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Segment Performance Metrics</CardTitle>
              <CardDescription>Detailed breakdown of each customer segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segments.map((segment) => {
                  const revenue = analytics.revenueBySegment.find(r => r.segmentId === segment.id)?.revenue || 0;
                  const percentage = analytics.segmentDistribution.find(d => d.segmentId === segment.id)?.percentage || 0;
                  
                  return (
                    <div key={segment.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="h-10 w-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: segment.color }}
                          >
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{segment.name}</h4>
                            <p className="text-sm text-muted-foreground">{segment.customerCount} customers ({percentage}%)</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Value</p>
                          <p className="font-medium">${segment.averageValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Dominant Emotion</p>
                          <p className="font-medium">{segment.emotionalProfile.dominant}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue/Customer</p>
                          <p className="font-medium">${(revenue / segment.customerCount).toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emotions" className="space-y-6">
          <EmotionTrendChart data={analytics.emotionTrends} />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Emotional Distribution by Segment</CardTitle>
                <CardDescription>Dominant emotions across customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div key={segment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-8 w-8 rounded flex items-center justify-center"
                          style={{ backgroundColor: segment.color }}
                        >
                          <span className="text-white text-xs font-bold">
                            {segment.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-sm">{segment.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm font-semibold">{segment.emotionalProfile.dominant}</span>
                        <span className="text-sm text-muted-foreground">/ {segment.emotionalProfile.secondary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotion Insights</CardTitle>
                <CardDescription>Key findings from emotional analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <h4 className="font-semibold text-sm mb-2 text-success">Positive Trend</h4>
                  <p className="text-sm text-muted-foreground">
                    Joy levels have increased by 15% over the past month, indicating improved customer satisfaction.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-semibold text-sm mb-2 text-warning">Attention Needed</h4>
                  <p className="text-sm text-muted-foreground">
                    Anger levels in the "Frustrated At-Risk" segment are 40% higher than average, requiring immediate intervention.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-sm mb-2 text-primary">Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    High surprise levels in "Curious Browsers" suggest they're discovering new products but need conversion nudges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Impulsive Buyers</span>
                  <span className="font-semibold">High Frequency</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price-Sensitive</span>
                  <span className="font-semibold">Low Frequency</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Brand-Loyal</span>
                  <span className="font-semibold">Consistent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Luxury Seekers</span>
                  <span className="font-semibold">High Value</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">High Risk</span>
                  <span className="font-semibold text-destructive">423 customers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Medium Risk</span>
                  <span className="font-semibold text-warning">892 customers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Low Risk</span>
                  <span className="font-semibold text-success">4,180 customers</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Highly Engaged</span>
                  <span className="font-semibold">1,812 customers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Moderately Engaged</span>
                  <span className="font-semibold">2,560 customers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Low Engagement</span>
                  <span className="font-semibold">1,123 customers</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Behavioral Insights</CardTitle>
              <CardDescription>Key patterns identified by AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Cart Abandonment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Price-sensitive customers abandon carts 3x more frequently than other segments
                  </p>
                  <div className="text-2xl font-bold text-warning">38%</div>
                  <p className="text-xs text-muted-foreground">Average abandonment rate</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Repeat Purchase Rate</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Brand-loyal customers have the highest repeat purchase rate
                  </p>
                  <div className="text-2xl font-bold text-success">72%</div>
                  <p className="text-xs text-muted-foreground">Within 90 days</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Average Session Duration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Curious browsers spend the most time on site but convert least
                  </p>
                  <div className="text-2xl font-bold text-primary">8.5 min</div>
                  <p className="text-xs text-muted-foreground">Per session</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Response to Promotions</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Impulsive buyers respond best to time-limited offers
                  </p>
                  <div className="text-2xl font-bold text-primary">45%</div>
                  <p className="text-xs text-muted-foreground">Conversion rate with urgency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp, AlertTriangle, Brain, Target } from 'lucide-react';
import MetricCard from '@/components/common/MetricCard';
import EmotionTrendChart from '@/components/charts/EmotionTrendChart';
import SegmentDistributionChart from '@/components/charts/SegmentDistributionChart';
import RevenueBySegmentChart from '@/components/charts/RevenueBySegmentChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { dataService } from '@/services/dataService';
import type { Segment, AnalyticsData } from '@/types';

export default function Dashboard() {
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
        console.error('Failed to load dashboard data:', error);
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">AI-powered customer insights and segmentation</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">AI-powered customer insights and segmentation</p>
      </div>

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
          title="Churn Rate"
          value={`${(analytics.churnRate * 100).toFixed(1)}%`}
          icon={AlertTriangle}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SegmentDistributionChart segments={segments} />
        <RevenueBySegmentChart segments={segments} revenueData={analytics.revenueBySegment} />
      </div>

      <EmotionTrendChart data={analytics.emotionTrends} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>Key findings from psychological analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Dominant Emotional Pattern</h4>
              <p className="text-sm text-muted-foreground">
                Joy is the dominant emotion across all segments, indicating high customer satisfaction. 
                However, the "Frustrated At-Risk" segment shows elevated anger levels requiring immediate attention.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Personality Insights</h4>
              <p className="text-sm text-muted-foreground">
                High-value customers show strong conscientiousness and agreeableness traits, 
                suggesting they value reliability and positive brand relationships.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Behavioral Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Impulsive buyers respond best to time-limited offers, while price-sensitive customers 
                require trust signals and guarantees to complete purchases.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Recommended next steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Address At-Risk Customers</h4>
                <p className="text-xs text-muted-foreground">423 customers showing churn signals</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-warning mt-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Convert Curious Browsers</h4>
                <p className="text-xs text-muted-foreground">2,134 engaged visitors with low conversion</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-success mt-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Launch VIP Program</h4>
                <p className="text-xs text-muted-foreground">567 loyal customers ready for premium tier</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Optimize Flash Sales</h4>
                <p className="text-xs text-muted-foreground">1,245 impulsive buyers respond to urgency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Lightbulb, TrendingUp, Users, ShoppingCart, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SegmentBadge from '@/components/common/SegmentBadge';
import { dataService } from '@/services/dataService';
import type { Recommendation, Segment } from '@/types';

export default function Recommendations() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [recsData, segmentsData] = await Promise.all([
          dataService.getRecommendations(),
          dataService.getSegments()
        ]);
        setRecommendations(recsData);
        setSegments(segmentsData);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getSegment = (segmentId: string) => {
    return segments.find(s => s.id === segmentId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'marketing':
        return Target;
      case 'retention':
        return Users;
      case 'upsell':
        return TrendingUp;
      case 'cross-sell':
        return ShoppingCart;
      default:
        return Lightbulb;
    }
  };

  const filteredRecommendations = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.type === activeTab);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground mt-2">Actionable insights for each customer segment</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Recommendations</h1>
        <p className="text-muted-foreground mt-2">Actionable insights for each customer segment</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="upsell">Upsell</TabsTrigger>
          <TabsTrigger value="cross-sell">Cross-sell</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredRecommendations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No recommendations found for this category
              </CardContent>
            </Card>
          ) : (
            filteredRecommendations.map((rec) => {
              const segment = getSegment(rec.segmentId);
              const TypeIcon = getTypeIcon(rec.type);
              
              return (
                <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <TypeIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority} priority
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {rec.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{rec.title}</CardTitle>
                          <CardDescription className="mt-2">{rec.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Target Segment:</span>
                      {segment && (
                        <SegmentBadge name={segment.name} color={segment.color} />
                      )}
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-sm font-semibold">Expected Impact</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.expectedImpact}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        Action Items
                      </h4>
                      <ul className="space-y-2">
                        {rec.actionItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                            </div>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

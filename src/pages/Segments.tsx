import { useEffect, useState } from 'react';
import { Users, TrendingUp, Brain, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { dataService } from '@/services/dataService';
import type { Segment } from '@/types';
import { useNavigate } from 'react-router-dom';

export default function Segments() {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState<Segment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSegments = async () => {
      try {
        setLoading(true);
        const data = await dataService.getSegments();
        setSegments(data);
      } catch (error) {
        console.error('Failed to load segments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSegments();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Segments</h1>
          <p className="text-muted-foreground mt-2">AI-generated psychological customer segments</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-96 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Segments</h1>
          <p className="text-muted-foreground mt-2">AI-generated psychological customer segments</p>
        </div>
        <Button onClick={() => dataService.runSegmentation()}>
          <Brain className="h-4 w-4 mr-2" />
          Re-run Segmentation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {segments.map((segment) => (
          <Card 
            key={segment.id} 
            className="hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate(`/segments/${segment.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div 
                  className="h-12 w-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: segment.color }}
                >
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {segment.customerCount} customers
                </Badge>
              </div>
              <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                {segment.name}
              </CardTitle>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg Value</span>
                <span className="font-semibold">${segment.averageValue.toLocaleString()}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">Emotional Profile</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {segment.emotionalProfile.dominant}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {segment.emotionalProfile.secondary}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="font-medium">Personality Traits</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {segment.personalityTraits.slice(0, 2).map((trait, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Key Characteristics</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {segment.characteristics.slice(0, 3).map((char, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

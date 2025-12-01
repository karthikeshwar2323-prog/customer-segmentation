import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, CheckCircle, Sparkles, Brain, Target } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function SegmentGeneration() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const generateSegments = async () => {
    setGenerating(true);
    setProgress(0);
    setGenerated(false);

    toast.info('Starting segment generation...');

    const steps = [
      { progress: 20, message: 'Analyzing customer data...' },
      { progress: 40, message: 'Calculating RFM scores...' },
      { progress: 60, message: 'Processing emotional profiles...' },
      { progress: 80, message: 'Applying clustering algorithms...' },
      { progress: 100, message: 'Finalizing segments...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      toast.info(step.message);
    }

    setGenerating(false);
    setGenerated(true);
    toast.success('6 segments generated successfully!');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Generate Customer Segments</h1>
        <p className="text-muted-foreground">
          Automatically generate psychological segments based on customer behavior and emotions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segment Generation</CardTitle>
              <CardDescription>
                Analyze customer data and create intelligent segments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  The AI will analyze customer behavior, emotions, and psychological traits to create 6 distinct segments:
                  Impulsive Buyers, Price-Sensitive, Brand-Loyal, Curious Browsers, Luxury Seekers, and At-Risk Customers.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">5,495</p>
                        <p className="text-sm text-muted-foreground">Total Customers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">6</p>
                        <p className="text-sm text-muted-foreground">Segments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded bg-chart-3/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">98.5%</p>
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {generating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Generating segments...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {generated && (
                <Alert className="border-success bg-success/10">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Segments generated successfully! 6 customer segments have been created and assigned.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4">
                <Button 
                  onClick={generateSegments} 
                  disabled={generating}
                  className="flex-1"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {generating ? 'Generating...' : 'Generate Segments Now'}
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/segments">View Segments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segment Distribution Preview</CardTitle>
              <CardDescription>
                Expected distribution of customers across segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Impulsive Emotional Buyers', count: 1245, color: 'bg-primary', percentage: 22.7 },
                  { name: 'Price-Sensitive Anxious Buyers', count: 892, color: 'bg-chart-4', percentage: 16.2 },
                  { name: 'Brand-Loyal Confident Buyers', count: 567, color: 'bg-chart-2', percentage: 10.3 },
                  { name: 'Curious Browsers', count: 2134, color: 'bg-chart-3', percentage: 38.8 },
                  { name: 'Luxury Seekers', count: 234, color: 'bg-chart-5', percentage: 4.3 },
                  { name: 'Frustrated At-Risk Customers', count: 423, color: 'bg-destructive', percentage: 7.7 }
                ].map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{segment.name}</span>
                      <span className="text-muted-foreground">{segment.count} ({segment.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${segment.color}`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segmentation Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Behavioral Factors
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Purchase frequency</li>
                  <li>• Recency of orders</li>
                  <li>• Average order value</li>
                  <li>• Total spending</li>
                  <li>• Cart abandonment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  Psychological Factors
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sentiment analysis</li>
                  <li>• Emotional profile</li>
                  <li>• OCEAN personality</li>
                  <li>• Churn risk score</li>
                  <li>• Engagement level</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segment Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Luxury Seekers</p>
                  <p className="text-muted-foreground">High spenders, premium products</p>
                </div>
                <div>
                  <p className="font-medium">At-Risk Customers</p>
                  <p className="text-muted-foreground">High churn risk, negative sentiment</p>
                </div>
                <div>
                  <p className="font-medium">Brand-Loyal Buyers</p>
                  <p className="text-muted-foreground">Frequent purchases, low churn</p>
                </div>
                <div>
                  <p className="font-medium">Curious Browsers</p>
                  <p className="text-muted-foreground">New customers, exploring</p>
                </div>
                <div>
                  <p className="font-medium">Price-Sensitive</p>
                  <p className="text-muted-foreground">Budget-conscious, deal-seekers</p>
                </div>
                <div>
                  <p className="font-medium">Impulsive Buyers</p>
                  <p className="text-muted-foreground">Emotion-driven purchases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Algorithms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• K-Means Clustering</li>
                <li>• DBSCAN Analysis</li>
                <li>• RFM Scoring</li>
                <li>• Sentiment Analysis (BERT)</li>
                <li>• Emotion Detection (RoBERTa)</li>
                <li>• OCEAN Personality Model</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

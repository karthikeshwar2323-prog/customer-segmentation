import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface EmotionTrendData {
  date: string;
  joy: number;
  anger: number;
  sadness: number;
  fear: number;
  surprise: number;
}

interface EmotionTrendChartProps {
  data: EmotionTrendData[];
}

export default function EmotionTrendChart({ data }: EmotionTrendChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotional Trends Over Time</CardTitle>
        <CardDescription>Customer emotion analysis from reviews and feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 1]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="joy" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Joy"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="anger" 
              stroke="hsl(var(--chart-5))" 
              strokeWidth={2}
              name="Anger"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="sadness" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Sadness"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="fear" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2}
              name="Fear"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="surprise" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              name="Surprise"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Segment } from '@/types';

interface SegmentDistributionChartProps {
  segments: Segment[];
}

export default function SegmentDistributionChart({ segments }: SegmentDistributionChartProps) {
  const data = segments.map(segment => ({
    name: segment.name,
    value: segment.customerCount,
    color: segment.color
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segment Distribution</CardTitle>
        <CardDescription>Distribution of customers across psychological segments</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

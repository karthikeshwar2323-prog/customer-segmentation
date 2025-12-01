import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { MoodEntry } from '../types.ts';

type Props = {
  entries: MoodEntry[];
};

const moodToNumber = {
  'very-sad': 1,
  'sad': 2,
  'neutral': 3,
  'happy': 4,
  'very-happy': 5,
};

const moodLabels = {
  1: '非常难过',
  2: '难过',
  3: '一般',
  4: '开心',
  5: '非常开心'
};

export default function MoodChart({ entries }: Props) {
  const data = entries.map(entry => ({
    date: format(new Date(entry.date), 'MM/dd'),
    mood: moodToNumber[entry.mood],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="text-sm font-medium">{`日期: ${label}`}</p>
          <p className="text-sm text-blue-600">
            {`心情: ${moodLabels[payload[0].value]}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[calc(100%-2rem)]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => moodLabels[value as keyof typeof moodLabels]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
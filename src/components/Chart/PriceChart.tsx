import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PricePoint } from '@/types/price';

export default function PriceChart({ data }: { data: PricePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
        />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleString()}
          formatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Line type="monotone" dataKey="price" stroke="#5c6bc0" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

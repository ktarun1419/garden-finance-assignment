// src/components/Chart/CombinedChart.tsx
import React, { useRef, useState, useEffect } from 'react';
import screenfull from 'screenfull';
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
} from 'recharts';
import type { PricePoint } from '@/types/price';
import {
  ChartWrapper,
  FullscreenButton,
  StyledResponsiveContainer as Container,
} from './CombinedChart.styles';
import ChartControls from './ChartControls';
import { Toolbar } from './Chart.styles';

interface Props {
  data: PricePoint[];
}

export default function CombinedChart({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    if (!screenfull.isEnabled) return;
    const onChange = () => setIsFull(screenfull.isFullscreen);
    screenfull.on('change', onChange);
    return () => void screenfull.off('change', onChange);
  }, []);

  const toggleFull = () => {
    if (ref.current && screenfull.isEnabled) {
      screenfull.toggle(ref.current);
    }
  };

  const last = data[data.length - 1];

  return (
    <ChartWrapper ref={ref} isFull={isFull}>
      <Toolbar>
        <ChartControls />
        <FullscreenButton onClick={toggleFull}>
          {isFull ? 'Exit Fullscreen' : 'Fullscreen'}
        </FullscreenButton>
      </Toolbar>

      <Container isFull={isFull}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {/* gradient for area */}
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5c6bc0" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#5c6bc0" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#eee" vertical={false} />

          <XAxis
            dataKey="timestamp"
            axisLine={true}
            tickLine={false}
            tick={isFull}
            tickFormatter={isFull ? (ts) => new Date(ts).toLocaleTimeString() : undefined}
          />
          <YAxis
            yAxisId="price"
            axisLine={true}
            tickLine={false}
            tick={isFull}
            tickFormatter={isFull ? (n) => `$${n.toFixed(0)}` : undefined}
            domain={['auto','auto']}
          />
          <YAxis
            yAxisId="volume"
            orientation="right"
            axisLine={false}
            tick={false}
            domain={[0,'auto']}
          />

          <Tooltip
            formatter={(val, name) =>
              name === 'price'
                ? [`$${(val as number).toFixed(2)}`, 'Price']
                : [`${val}`, 'Volume']
            }
            labelFormatter={(ts) => new Date(ts as number).toLocaleString()}
          />

          {/* volume bars */}
          
          <Bar yAxisId="volume" dataKey="volume" barSize={20} fill="#413ea0" />

          {/* shaded area under price */}
          <Area
            yAxisId="price"
            type="monotone"
            dataKey="price"
            stroke="none"
            fill="url(#priceGrad)"
          />

          {/* price line */}
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="price"
            stroke="#5c6bc0"
            dot={false}
            strokeWidth={2}
          />

          <ReferenceLine
            yAxisId="price"
            y={last.price}
            stroke="#888"
            strokeDasharray="3 3"
          />

          <ReferenceDot
            yAxisId="price"
            x={last.timestamp}
            y={last.price}
            r={6}
            fill="#5c6bc0"
            stroke="none"
            label={() => {
              const text = `$${last.price.toFixed(2)}`;
              const pad = 6, fs = 12;
              const w = text.length * fs * 0.6 + pad * 2;
              const h = fs + pad;
              return (
                <g transform={`translate(8,-${h})`}>
                  <rect width={w} height={h} rx={4} fill="#5c6bc0" />
                  <text
                    x={pad}
                    y={h / 2}
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize={fs}
                    fontFamily="Circular Std, sans-serif"
                  >
                    {text}
                  </text>
                </g>
              );
            }}
          />
        </ComposedChart>
      </Container>
    </ChartWrapper>
  );
}

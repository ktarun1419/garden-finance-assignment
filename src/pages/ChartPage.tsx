import React, { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import CombinedChart from '@/components/Chart/CombinedChart';
import ChartControls from '@/components/Chart/ChartControls';

export default function ChartPage() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData) return <p>Loading chart…</p>;

  return (
    <div>
      <ChartControls />
      <CombinedChart data={chartData} />
    </div>
  );
}

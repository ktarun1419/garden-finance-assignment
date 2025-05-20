import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';

export default function Statistics() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData) return <p>Loading statistics…</p>;

  const prices = chartData.map((p) => p.price);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <div>
      <h1>Statistics</h1>
      <ul>
        <li>High: ${high.toFixed(2)}</li>
        <li>Low: ${low.toFixed(2)}</li>
        <li>Average: ${avg.toFixed(2)}</li>
      </ul>
    </div>
  );
}

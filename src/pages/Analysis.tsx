import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import PriceChart from '@/components/Chart/PriceChart';

export default function Analysis() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData) return <p>Loading analysis…</p>;

  const first = chartData[0].price;
  const last = chartData[chartData.length - 1].price;
  const trend = last > first ? 'upward' : last < first ? 'downward' : 'flat';
  const changePct = ((last - first) / first) * 100;

  return (
    <div>
      <h1>Analysis</h1>
      <PriceChart data={chartData} />
      <p>The overall trend for this period is {trend} with a {changePct.toFixed(2)}% change.</p>
    </div>
  );
}

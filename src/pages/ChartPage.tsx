import React, { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import CombinedChart from '@/components/Chart/CombinedChart';
import ChartControls from '@/components/Chart/ChartControls';
import Skeleton from '@/components/Skeleton';
import { ControlsWrapper } from '@/components/Chart/Chart.styles';

export default function ChartPage() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData)
    return (
      <div>
        <ControlsWrapper>
          <Skeleton width="40px" height="32px" />
          <Skeleton width="40px" height="32px" />
          <Skeleton width="40px" height="32px" />
        </ControlsWrapper>
        <Skeleton height="450px" />
      </div>
    );

  return (
    <div>
      <ChartControls />
      <CombinedChart data={chartData} />
    </div>
  );
}

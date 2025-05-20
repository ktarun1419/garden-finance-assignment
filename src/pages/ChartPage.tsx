import React, { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import CombinedChart from '@/components/Chart/CombinedChart';
import Skeleton from '@/components/Skeleton';
import { ControlsWrapper, Toolbar } from '@/components/Chart/Chart.styles';

export default function ChartPage() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData)
    return (
      <div>
        <Toolbar>
          <ControlsWrapper>
            <Skeleton width="40px" height="32px" />
            <Skeleton width="40px" height="32px" />
            <Skeleton width="40px" height="32px" />
          </ControlsWrapper>
          <Skeleton width="80px" height="32px" />
        </Toolbar>
        <Skeleton height="450px" />
      </div>
    );

  return (
    <div>
      <CombinedChart data={chartData} />
    </div>
  );
}

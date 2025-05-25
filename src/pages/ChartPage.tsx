import React, { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import Skeleton from '@/components/Skeleton';
import { ControlsWrapper, Toolbar, ToolbarRight } from '@/components/Chart/Chart.styles';

import CombinedChartECharts from '@/components/Chart/CombinedChart1';
import { ChartWrapper } from '@/components/Chart/CombinedChart.styles';

export default function ChartPage() {
  const { chartData, isLoading } = useContext(PriceContext);
  console.log({isLoading , chartData})

  if (isLoading || !chartData)
    return (
      <ChartWrapper isFull={false}>
        <Toolbar isFull={false}>
          <ToolbarRight>
            <Skeleton width="80px" height="32px" />
            <Skeleton width="80px" height="32px" />
          </ToolbarRight>

          <ControlsWrapper>
            <Skeleton width="40px" height="32px" />
            <Skeleton width="40px" height="32px" />
            <Skeleton width="40px" height="32px" />
          </ControlsWrapper>
        </Toolbar>
        <Skeleton height="450px" width="80%" />
      </ChartWrapper>
    );

  return (
    <div>
      <CombinedChartECharts data={chartData} />
    </div>
  );
}

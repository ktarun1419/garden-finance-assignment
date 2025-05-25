import React, { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import CombinedChart from '@/components/Chart/CombinedChart';
import Skeleton from '@/components/Skeleton';
import { ControlsWrapper, Toolbar, ToolbarRight } from '@/components/Chart/Chart.styles';
import CombinedChartRecreated from '@/components/Chart/CombinedChart1';
import CombinedChartECharts from '@/components/Chart/CombinedChart1';
import { ChartWrapper } from '@/components/Chart/CombinedChart.styles';

export default function ChartPage() {
  const { chartData, isLoading } = useContext(PriceContext);

  if (isLoading || !chartData)
    return (
      <ChartWrapper>
        <Toolbar>
         
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
        <Skeleton height="450px" width='80%' />
      </ChartWrapper>
    );

  return (
    <div>
      <CombinedChartECharts data={chartData} />
    </div>
  );
}

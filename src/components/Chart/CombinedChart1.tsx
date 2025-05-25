import React, { useRef, useState, useEffect, useMemo } from 'react';
import screenfull from 'screenfull';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import type { PricePoint } from '@/types/price';

import {
  ChartWrapper,
  FullscreenButton,
  StyledResponsiveContainer as Container,
  CompareButton,
} from './CombinedChart.styles';
import ChartControls from './ChartControls';
import { FullscreenIcon } from '@/assets/fullscreen';
import { CompareIcon } from '@/assets/compare';
import { Toolbar, ToolbarRight } from './Chart.styles';

interface Props {
  data: PricePoint[];
}

export default function CombinedChartECharts({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chartRef   = useRef<ReactECharts>(null);
  const [isFull, setIsFull] = useState(false);

  // track fullscreen and force a resize on the chart
  useEffect(() => {
    if (!screenfull.isEnabled) return;
    const onChange = () => {
      setIsFull(screenfull.isFullscreen);
      // give ECharts a moment to layout its container
      setTimeout(() => chartRef.current?.getEchartsInstance().resize(), 100);
    };
    screenfull.on('change', onChange);
    return () => void screenfull.off('change', onChange);
  }, []);

  const toggleFull = () => {
    if (wrapperRef.current && screenfull.isEnabled) {
      screenfull.toggle(wrapperRef.current);
    }
  };

  const option = useMemo<echarts.EChartsOption>(() => {
    const ts = data.map(d => d.timestamp);
    const ps = data.map(d => d.price);
    const vs = data.map(d => d.volume);
    const first = Math.min(...ts);
    const last  = Math.max(...ts);
    const minP  = Math.min(...ps);
    const maxP  = Math.max(...ps);
    const pad   = (maxP - minP) * 0.05;
    const maxV  = Math.max(...vs) * 1.1;

    return {
      grid: [
        { left: 0, right: 0, top: 40,    height: '90%' },  // price panel
        { left: 0, right: 0, bottom: 10, height: '10%' },  // volume panel
      ],
      xAxis: [
        {
          gridIndex: 0,
          type: 'time',
          min: first,
          max: last,
          splitLine: {
            show: true,
            lineStyle: { color: '#E2E4E7' },
          },
          splitNumber: 5,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        {
          gridIndex: 1,
          type: 'time',
          min: first,
          max: last,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
      ],
      yAxis: [
        {
            gridIndex: 0,
            type: 'value',
            position: 'right',   
            min: minP - pad,
            max: maxP + pad,
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
        
            axisPointer: {
              show: true,
              label: {
                show: true,
                margin: 8,
                backgroundColor: '#1A243A',
                color: '#fff',
                padding: [8, 12],
                borderRadius: 4,
                formatter: '${value}',    // display the current value
              }
            }
          },
        {
          gridIndex: 1,
          type: 'value',
          min: 0,
          max: maxV,
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderColor: '#E2E4E7',
        textStyle: { color: '#333' },
        
        position: (point, params, dom, rect, size) => {
          const [mouseX, mouseY] = point as [number, number];
          const boxWidth  = size.contentSize[0];
          const viewWidth = size.viewSize[0];
        
          const x = mouseX + boxWidth + 10 < viewWidth
            ? mouseX + 10
            : mouseX - boxWidth - 10;
          const y = mouseY + 10;
          return [x, y];
        },
        formatter: items => {
          const pts = items as any[];
          const t   = new Date(pts[0].value[0]).toLocaleString();
          const p   = pts.find(p => p.seriesName === 'Price')?.value[1];
          const v   = pts.find(p => p.seriesName === 'Volume')?.value[1];
          return `
            <div style="padding:8px">
              <div><strong>${t}</strong></div>
              <div>Price: $${(p as number).toFixed(2)}</div>
              <div>Volume: ${(v as number / 1e7).toFixed(2)}M</div>
            </div>
          `;
        },
      },
      series: [
        // 1) Gradient area
        {
            name: 'Price',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: { opacity: 0 },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0.65, color: '#E8E7FF' }, 
                    { offset: 0.95, color: '#FFFFFF00' },
                ]
              ),
            },
            data: data.map(d => [d.timestamp, d.price]),
          },
        // 2) Outline line
        {
          name: 'Price',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: { color: '#4B40EE', width: 2 },
          data: data.map(d => [d.timestamp, d.price]),
        },
        
        {
          name: 'Last Price',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 0,
          showSymbol: false,
          data: [
            [first, ps[ps.length - 1]],
            [last,  ps[ps.length - 1]],
          ],
          lineStyle: { type: 'dashed', color: '#999999' , width:1 },
          markPoint: {
           symbol: false,
           symbolSize: 0,
            data: [{
              coord: [last, ps[ps.length - 1]],
              value: `$${ps[ps.length - 1].toFixed(2)}`,
              itemStyle: { color: '#4B40EE' },
              label: {
                show: true,
                position: 'left',
                offset: [5, 4], 
                color: '#fff',
                backgroundColor: '#4B40EE',
                borderRadius: 4,
                padding: [8, 12],
                
              },
            }],
            silent: true,
          },
        },
        // 4) Volume bars (bottom panel)
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: 2,
          itemStyle: { color: '#E2E4E7' },
          emphasis: { disabled: true },
          data: data.map(d => [d.timestamp, d.volume]),
        },
      ],
      padding: 0,
    };
  }, [data]);

  return (
    <ChartWrapper ref={wrapperRef} isFull={isFull}>
      {/* toolbar */}
      <Toolbar isFull={isFull}>
        <ToolbarRight>
          <FullscreenButton onClick={toggleFull}>
            <FullscreenIcon />
            {isFull ? 'Exit Fullscreen' : 'Fullscreen'}
          </FullscreenButton>
          <CompareButton>
            <CompareIcon />
            Compare
          </CompareButton>
        </ToolbarRight>

        <ChartControls />
      </Toolbar>

      {/* chart */}
      <Container isFull={isFull}>
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ width: '100%', height: isFull ? '100%' : 350 }}
          notMerge={true}
        />
      </Container>
    </ChartWrapper>
  );
}

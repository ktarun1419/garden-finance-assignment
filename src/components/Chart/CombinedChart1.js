import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect, useMemo } from 'react';
import screenfull from 'screenfull';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { ChartWrapper, FullscreenButton, StyledResponsiveContainer as Container, CompareButton, } from './CombinedChart.styles';
import ChartControls from './ChartControls';
import { FullscreenIcon } from '@/assets/fullscreen';
import { CompareIcon } from '@/assets/compare';
import { Toolbar, ToolbarRight } from './Chart.styles';
export default function CombinedChartECharts({ data }) {
    const wrapperRef = useRef(null);
    const chartRef = useRef(null);
    const [isFull, setIsFull] = useState(false);
    // track fullscreen and force a resize on the chart
    useEffect(() => {
        if (!screenfull.isEnabled)
            return;
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
    const option = useMemo(() => {
        const ts = data.map(d => d.timestamp);
        const ps = data.map(d => d.price);
        const vs = data.map(d => d.volume);
        const first = Math.min(...ts);
        const last = Math.max(...ts);
        const minP = Math.min(...ps);
        const maxP = Math.max(...ps);
        const pad = (maxP - minP) * 0.05;
        const maxV = Math.max(...vs) * 1.1;
        const lastPrice = ps[ps.length - 1];
        return {
            grid: [
                { left: 0, right: 0, top: 40, height: '90%' },
                { left: 0, right: 0, bottom: 10, height: '10%' },
            ],
            xAxis: [
                {
                    gridIndex: 0, type: 'time', min: first, max: last,
                    splitLine: { show: true, lineStyle: { color: '#E2E4E7' } },
                    splitNumber: 5, axisLine: { show: false },
                    axisTick: { show: false }, axisLabel: { show: false },
                },
                {
                    gridIndex: 1, type: 'time', min: first, max: last,
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
                            formatter: '{value}',
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
                position: (point, _, dom, _1, size) => {
                    const [x, y] = point;
                    const w = size.contentSize[0];
                    const vw = size.viewSize[0];
                    return [
                        x + w + 10 < vw ? x + 10 : x - w - 10,
                        y + 10
                    ];
                },
                formatter: items => {
                    const pts = items;
                    const t = new Date(pts[0].value[0]).toLocaleString();
                    const p = pts.find(p => p.seriesName === 'Price')?.value[1];
                    const v = pts.find(p => p.seriesName === 'Volume')?.value[1];
                    return `
            <div style="padding:8px">
              <div><strong>${t}</strong></div>
              <div>Price: $${p.toFixed(2)}</div>
              <div>Volume: ${(v / 1e7).toFixed(2)}M</div>
            </div>
          `;
                },
            },
            series: [
                {
                    name: 'Price',
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: { opacity: 0 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0.65, color: '#E8E7FF' },
                            { offset: 0.95, color: '#FFFFFF00' },
                        ]),
                    },
                    data: data.map(d => [d.timestamp, d.price]),
                },
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
                        [first, lastPrice],
                        [last, lastPrice],
                    ],
                    lineStyle: { type: 'dashed', color: '#999999', width: 1 },
                    markPoint: {
                        symbol: 'none', // hide balloon/pin
                        silent: true,
                        data: [{
                                name: 'Last Price', // required by TS
                                coord: [last, lastPrice],
                                value: lastPrice,
                                label: {
                                    show: true,
                                    position: 'top',
                                    offset: [0, -8],
                                    color: '#fff',
                                    backgroundColor: '#4B40EE',
                                    borderRadius: 4,
                                    padding: [8, 12],
                                    formatter: `$${lastPrice.toFixed(2)}`, // draw only the tag
                                },
                            }],
                    },
                },
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
    return (_jsxs(ChartWrapper, { ref: wrapperRef, isFull: isFull, children: [_jsxs(Toolbar, { isFull: isFull, children: [_jsxs(ToolbarRight, { children: [_jsxs(FullscreenButton, { onClick: toggleFull, children: [_jsx(FullscreenIcon, {}), isFull ? 'Exit Fullscreen' : 'Fullscreen'] }), _jsxs(CompareButton, { children: [_jsx(CompareIcon, {}), "Compare"] })] }), _jsx(ChartControls, {})] }), _jsx(Container, { isFull: isFull, children: _jsx(ReactECharts, { ref: chartRef, option: option, style: { width: '100%', height: isFull ? '100%' : 350 }, notMerge: true }) })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import Skeleton from '@/components/Skeleton';
import { ControlsWrapper, Toolbar, ToolbarRight } from '@/components/Chart/Chart.styles';
import CombinedChartECharts from '@/components/Chart/CombinedChart1';
import { ChartWrapper } from '@/components/Chart/CombinedChart.styles';
export default function ChartPage() {
    const { chartData, isLoading } = useContext(PriceContext);
    console.log({ isLoading, chartData });
    if (isLoading || !chartData)
        return (_jsxs(ChartWrapper, { isFull: false, children: [_jsxs(Toolbar, { isFull: false, children: [_jsxs(ToolbarRight, { children: [_jsx(Skeleton, { width: "80px", height: "32px" }), _jsx(Skeleton, { width: "80px", height: "32px" })] }), _jsxs(ControlsWrapper, { children: [_jsx(Skeleton, { width: "40px", height: "32px" }), _jsx(Skeleton, { width: "40px", height: "32px" }), _jsx(Skeleton, { width: "40px", height: "32px" })] })] }), _jsx(Skeleton, { height: "450px", width: "80%" })] }));
    return (_jsx("div", { children: _jsx(CombinedChartECharts, { data: chartData }) }));
}

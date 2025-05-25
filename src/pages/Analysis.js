import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import PriceChart from '@/components/Chart/PriceChart';
import styled from 'styled-components';
export default function Analysis() {
    const { chartData, isLoading } = useContext(PriceContext);
    if (isLoading || !chartData)
        return _jsx("p", { children: "Loading analysis\u2026" });
    const first = chartData[0].price;
    const last = chartData[chartData.length - 1].price;
    const trend = last > first ? 'upward' : last < first ? 'downward' : 'flat';
    const changePct = ((last - first) / first) * 100;
    const color = trend === 'upward' ? '#67BF6B' : trend === 'downward' ? '#de5e60' : '#6f7177';
    return (_jsxs(Wrapper, { children: [_jsx(Title, { children: "Analysis" }), _jsx(PriceChart, { data: chartData }), _jsxs(TrendText, { style: { color }, children: ["The overall trend for this period is ", trend, " with a ", changePct.toFixed(2), "% change."] })] }));
}
const Wrapper = styled.div `
  padding: 1rem;
`;
const Title = styled.h1 `
  margin-bottom: 1rem;
`;
const TrendText = styled.p `
  margin-top: 1rem;
  font-size: 1.2rem;
`;

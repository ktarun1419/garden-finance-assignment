import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { PriceContext } from '@/context/PriceContext';
import styled from 'styled-components';
export default function Statistics() {
    const { chartData, isLoading } = useContext(PriceContext);
    if (isLoading || !chartData)
        return _jsx("p", { children: "Loading statistics\u2026" });
    const prices = chartData.map((p) => p.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    return (_jsxs(Wrapper, { children: [_jsx("h1", { children: "Statistics" }), _jsxs(StatList, { children: [_jsxs(StatItem, { children: [_jsx(Label, { children: "High:" }), " ", high.toFixed(2)] }), _jsxs(StatItem, { children: [_jsx(Label, { children: "Low:" }), " ", low.toFixed(2)] }), _jsxs(StatItem, { children: [_jsx(Label, { children: "Average:" }), " ", avg.toFixed(2)] })] })] }));
}
const Wrapper = styled.div `
  padding: 1rem;
`;
const StatList = styled.ul `
  list-style: none;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const StatItem = styled.li `
  font-size: 1.25rem;
  color: #1a243a;
`;
const Label = styled.span `
  color: #6f7177;
  margin-right: 0.25rem;
`;

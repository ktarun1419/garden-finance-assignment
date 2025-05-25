import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext } from 'react';
import usePriceData from '@/hooks/usePriceData';
export const PriceContext = createContext({
    summary: undefined,
    chartData: undefined,
    isLoading: false,
    range: '1d',
    setRange: () => { },
});
export function PriceProvider({ children }) {
    const [range, setRange] = React.useState('1w');
    const { summary, chartData, isLoading } = usePriceData(range);
    return (_jsx(PriceContext.Provider, { value: {
            summary: summary,
            chartData: chartData,
            isLoading,
            range,
            setRange,
        }, children: children }));
}

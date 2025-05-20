import React, { createContext, ReactNode } from 'react';
import usePriceData from '@/hooks/usePriceData';
import type { PriceSummary, PricePoint, PriceRange } from '@/types/price';

type PriceContextType = {
  summary?: PriceSummary;
  chartData?: PricePoint[];
  isLoading: boolean;
  range: PriceRange;
  setRange: (r: PriceRange) => void;
};

export const PriceContext = createContext<PriceContextType>({} as any);

export function PriceProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = React.useState<PriceRange>('1w');
  const { summary, chartData, isLoading } = usePriceData(range);

  return (
    <PriceContext.Provider
      value={{
        summary: summary,
        chartData: chartData,
        isLoading,
        range,
        setRange,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}

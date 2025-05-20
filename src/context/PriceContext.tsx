import React, { createContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSummary, fetchChart } from '@/services/api';
import type { PriceSummary, PricePoint } from '@/types/price';

type ChartRange = '1h' | '1d' | '1m';

type PriceContextType = {
  summary?: PriceSummary;
  chartData?: PricePoint[];
  isLoading: boolean;
  range: ChartRange;
  setRange: (r: ChartRange) => void;
};

export const PriceContext = createContext<PriceContextType>({} as any);

export function PriceProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = React.useState<ChartRange>('1d');
  const summaryQuery = useQuery<PriceSummary>({
    queryKey: ['summary'],
    queryFn: fetchSummary,
  });

  const chartQuery = useQuery<PricePoint[]>({
    queryKey: ['chart', range],
    queryFn: () => fetchChart(range),
  });

  const isLoading = summaryQuery.isLoading || chartQuery.isLoading;

  return (
    <PriceContext.Provider
      value={{
        summary: summaryQuery.data,
        chartData: chartQuery.data,
        isLoading,
        range,
        setRange,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}

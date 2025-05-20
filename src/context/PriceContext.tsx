import React, { createContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSummary, fetchChart } from '@/services/api';
import type { PriceSummary, PricePoint } from '@/types/price';

type PriceContextType = {
  summary?: PriceSummary;
  chartData?: PricePoint[];
  isLoading: boolean;
  range: string;
  setRange: (r: string) => void;
};

export const PriceContext = createContext<PriceContextType>({} as any);

export function PriceProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = React.useState<'1d'|'3d'|'1w'|'1m'|'6m'|'1y'|'max'>('1w');
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

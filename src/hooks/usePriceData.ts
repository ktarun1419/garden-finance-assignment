import { useQuery } from '@tanstack/react-query';
import { fetchSummary, fetchChart } from '@/services/api';
import type { PriceSummary, PricePoint, PriceRange } from '@/types/price';

export default function usePriceData(range: PriceRange) {
  const summaryQuery = useQuery<PriceSummary>({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  const chartQuery = useQuery<PricePoint[]>({
    queryKey: ['chart', range],
    queryFn: () => fetchChart(range),
    staleTime: 60 * 1000, // cache for 1 minute
  });

  return {
    summary: summaryQuery.data,
    chartData: chartQuery.data,
    isLoading: summaryQuery.isLoading || chartQuery.isLoading,
  } as const;
}

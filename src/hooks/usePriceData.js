import { useQuery } from '@tanstack/react-query';
import { fetchSummary, fetchChart } from '@/services/api';
export default function usePriceData(range) {
    const summaryQuery = useQuery({
        queryKey: ['summary'],
        queryFn: fetchSummary,
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });
    const chartQuery = useQuery({
        queryKey: ['chart', range],
        queryFn: () => fetchChart(range),
        staleTime: 60 * 1000, // cache for 1 minute
    });
    return {
        summary: summaryQuery.data,
        chartData: chartQuery.data,
        isLoading: summaryQuery.isLoading || chartQuery.isLoading,
    };
}

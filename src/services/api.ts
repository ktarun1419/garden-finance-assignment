// import axios from 'axios';
import type { PricePoint, PriceSummary } from '@/types/price';

// const client = axios.create({
//   baseURL: 'https://api.example.com', // replace when you have real API
//   timeout: 5000,
// });

export const fetchSummary = async (): Promise<PriceSummary> => {
  // dummy until real API arrives:
  return { current: 63179.71, change: 2161.42, changePct: 3.54 };
};

export const fetchChart = async (
  range: '1h' | '1d' | '1m',
): Promise<PricePoint[]> => {
  const endpoints = {
    '1h': '/chart/1h',
    '1d': '/chart/1d',
    '1m': '/chart/1m',
  } as const;

  // Uncomment the following lines when a real API is available
  // const response = await client.get(endpoints[range]);
  // return response.data;

  // Fallback: generate dummy sine chart
  const now = Date.now();
  const length = range === '1h' ? 60 : range === '1d' ? 24 : 30;
  const interval = 3600 * 1000;
  return Array.from({ length }).map((_, i) => ({
    timestamp: now - (length - i) * interval,
    price: 63000 + 500 * Math.sin((i / length) * Math.PI * 2),
  }));
};

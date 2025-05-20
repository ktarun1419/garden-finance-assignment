// import axios from 'axios';
import type { PricePoint, PriceSummary, PriceRange } from '@/types/price';

// const client = axios.create({
//   baseURL: 'https://api.example.com', // replace when you have real API
//   timeout: 5000,
// });

export const fetchSummary = async (): Promise<PriceSummary> => {
  // dummy until real API arrives:
  return { current: 63179.71, change: 2161.42, changePct: 3.54 };
};

export const fetchChart = async (
  range: PriceRange,
): Promise<PricePoint[]> => {
  // generate dummy sine chart:
  console.log({range})
  const now = Date.now();
  return Array.from({ length: 50 }).map((_, i) => ({
    timestamp: now - (50 - i) * 3600 * 1000,
    price: 63000 + 500 * Math.sin((i / 50) * Math.PI * 2),
  }));
};

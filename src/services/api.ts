import axios from 'axios';
import type { PricePoint, PriceSummary } from '@/types/price';

const client = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 5000,
});

export const fetchSummary = async (): Promise<PriceSummary> => {
  try {
    const { data } = await client.get('/coins/bitcoin', {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    const current = data.market_data.current_price.usd as number;
    const change =
      data.market_data.price_change_24h_in_currency.usd as number;
    const changePct =
      data.market_data.price_change_percentage_24h_in_currency
        .usd as number;

    return { current, change, changePct };
  } catch (err) {
    console.error('Failed to fetch summary', err);
    throw new Error('Failed to fetch summary');
  }
};

export const fetchChart = async (
  range: '1d' | '3d' | '1w' | '1m' | '6m' | '1y' | 'max',
): Promise<PricePoint[]> => {
  const dayMap = {
    '1d': 1,
    '3d': 3,
    '1w': 7,
    '1m': 30,
    '6m': 180,
    '1y': 365,
    max: 'max',
  } as const;

  try {
    const { data } = await client.get('/coins/bitcoin/market_chart', {
      params: {
        vs_currency: 'usd',
        days: dayMap[range],
      },
    });

    return (data.prices as [number, number][]).map(([timestamp, price]) => ({
      timestamp,
      price,
    }));
  } catch (err) {
    console.error('Failed to fetch chart', err);
    throw new Error('Failed to fetch chart');
  }
};

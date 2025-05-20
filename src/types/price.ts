export type PriceRange = '1d' | '3d' | '1w' | '1m' | '6m' | '1y' | 'max';

export interface PriceSummary {
    current: number;
    change: number;
    changePct: number;
}
  
export interface PricePoint {
    timestamp: number;
    price: number;
}
  
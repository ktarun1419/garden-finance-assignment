export interface PriceSummary {
    current: number;
    change: number;
    changePct: number;
  }
  
export interface PricePoint {
    timestamp: number;
    price: number;
    volume: number;
}
  
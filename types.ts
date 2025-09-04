export enum MarketType {
  US = 'US Stocks',
  Indian = 'Indian Stocks',
  Crypto = 'Cryptocurrency',
  IPOs = 'Upcoming IPOs',
}

export interface AnalysisResult {
  prediction: {
    title: string;
    direction: 'UP' | 'DOWN' | 'NEUTRAL';
  };
  summary: string;
  pros: string[];
  cons: string[];
  stats: {
    potentialRoi: string;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Very High';
    marketSentiment: 'Bullish' | 'Bearish' | 'Neutral';
    confidence: number; // Percentage
  };
}

export interface MarketMoverItem {
  name: string;
  symbol: string;
  price: string;
  change: string; // e.g., "+5.2%" or "-3.1%"
}

export interface IPOItem {
  name: string;
  date: string; // e.g., "Oct 25, 2024"
  valuation: string; // e.g., "$1.5B"
}

export interface MarketMoversResult {
  gainers: MarketMoverItem[];
  losers: MarketMoverItem[];
  ipos: IPOItem[];
}

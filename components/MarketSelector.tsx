
import React from 'react';
import { MarketType } from '../types';

interface MarketSelectorProps {
  selectedMarket: MarketType;
  onSelectMarket: (market: MarketType) => void;
}

const MarketSelector: React.FC<MarketSelectorProps> = ({ selectedMarket, onSelectMarket }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
      {(Object.values(MarketType) as Array<MarketType>).map((market) => (
        <button
          key={market}
          onClick={() => onSelectMarket(market)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
            selectedMarket === market
              ? 'bg-cyan-500 text-white shadow-md'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {market}
        </button>
      ))}
    </div>
  );
};

export default MarketSelector;

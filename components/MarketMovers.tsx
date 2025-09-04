import React from 'react';
import { type MarketMoversResult, MarketType } from '../types';
import MoversList from './MoversList';
import IPOList from './IPOList';

interface MarketMoversProps {
  data: MarketMoversResult;
  market: MarketType;
}

const MarketMovers: React.FC<MarketMoversProps> = ({ data, market }) => {
    const lastUpdated = new Date().toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="mt-12">
            <div className="text-center mb-6">
                 <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-indigo-400 text-transparent bg-clip-text">
                    Market Snapshot
                </h2>
                <p className="text-slate-400 mt-1">{market} - Last Updated: {lastUpdated}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.gainers && data.gainers.length > 0 && (
                    <MoversList title="Top Gainers" items={data.gainers} type="gainer" />
                )}
                {data.losers && data.losers.length > 0 && (
                    <MoversList title="Top Losers" items={data.losers} type="loser" />
                )}
                {data.ipos && data.ipos.length > 0 && (
                    <div className="md:col-span-2 lg:col-span-1">
                         <IPOList items={data.ipos} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketMovers;

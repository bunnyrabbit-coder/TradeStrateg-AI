import React from 'react';
import { type MarketMoverItem } from '../types';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { TrendingDownIcon } from './icons/TrendingDownIcon';

interface MoversListProps {
  title: string;
  items: MarketMoverItem[];
  type: 'gainer' | 'loser';
}

const MoversList: React.FC<MoversListProps> = ({ title, items, type }) => {
    const isGainer = type === 'gainer';
    const Icon = isGainer ? TrendingUpIcon : TrendingDownIcon;
    const textColor = isGainer ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 w-full">
            <div className="flex items-center gap-3 mb-4">
                <Icon className={`w-6 h-6 ${textColor}`} />
                <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg">
                        <div>
                            <p className="font-bold text-white">{item.symbol}</p>
                            <p className="text-xs text-slate-400 truncate max-w-[120px]">{item.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-white">{item.price}</p>
                            <p className={`font-semibold ${textColor}`}>{item.change}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoversList;

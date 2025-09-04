import React from 'react';
import { type IPOItem } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface IPOListProps {
    items: IPOItem[];
}

const IPOList: React.FC<IPOListProps> = ({ items }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700 w-full">
            <div className="flex items-center gap-3 mb-4">
                <SparklesIcon className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold text-slate-200">Upcoming IPOs</h3>
            </div>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="bg-slate-900/50 p-3 rounded-lg">
                        <div className="flex justify-between items-baseline">
                           <p className="font-bold text-white truncate pr-2">{item.name}</p>
                           <p className="text-sm font-medium text-cyan-400 flex-shrink-0">{item.date}</p>
                        </div>
                        <p className="text-sm text-slate-300 mt-1">Est. Valuation: <span className="font-semibold text-slate-200">{item.valuation}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IPOList;

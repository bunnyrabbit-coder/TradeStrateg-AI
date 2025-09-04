
import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <ChartBarIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
          TradeStrateg AI
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">AI-Powered Strategy Evaluation & Prediction</p>
    </header>
  );
};

export default Header;

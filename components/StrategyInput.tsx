
import React from 'react';

interface StrategyInputProps {
  strategy: string;
  onStrategyChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const StrategyInput: React.FC<StrategyInputProps> = ({ strategy, onStrategyChange, onSubmit, isLoading }) => {
  return (
    <div className="mt-6">
      <textarea
        value={strategy}
        onChange={(e) => onStrategyChange(e.target.value)}
        placeholder="e.g., Invest in renewable energy ETFs and hold for 5 years..."
        className="w-full h-28 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300 placeholder-slate-500 text-gray-200"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !strategy.trim()}
        className="w-full mt-4 py-3 px-6 text-lg font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/50 hover:shadow-cyan-700/50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Strategy'
        )}
      </button>
    </div>
  );
};

export default StrategyInput;

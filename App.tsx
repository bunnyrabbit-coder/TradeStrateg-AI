import React, { useState, useCallback, useEffect } from 'react';
import { MarketType, type AnalysisResult, type MarketMoversResult } from './types';
import { analyzeStrategy, fetchMarketMovers } from './services/geminiService';
import Header from './components/Header';
import StrategyInput from './components/StrategyInput';
import MarketSelector from './components/MarketSelector';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import Disclaimer from './components/Disclaimer';
import MarketMovers from './components/MarketMovers';

const App: React.FC = () => {
  const [strategy, setStrategy] = useState<string>('');
  const [market, setMarket] = useState<MarketType>(MarketType.US);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [marketMovers, setMarketMovers] = useState<MarketMoversResult | null>(null);
  const [isMoversLoading, setIsMoversLoading] = useState<boolean>(true);
  const [moversError, setMoversError] = useState<string | null>(null);

  useEffect(() => {
    const getMarketMovers = async () => {
      setIsMoversLoading(true);
      setMoversError(null);
      setMarketMovers(null);
      try {
        const result = await fetchMarketMovers(market);
        setMarketMovers(result);
      } catch (err) {
        console.error('Error fetching market movers:', err);
        setMoversError('Could not load live market data. Please refresh.');
      } finally {
        setIsMoversLoading(false);
      }
    };
    getMarketMovers();
  }, [market]);


  const handleAnalysis = useCallback(async () => {
    if (!strategy.trim()) {
      setError('Please enter a trading strategy to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeStrategy(strategy, market);
      setAnalysis(result);
    } catch (err) {
      console.error('Error during analysis:', err);
      setError('Failed to analyze the strategy. The AI may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [strategy, market]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4">Describe Your Trading Strategy</h2>
            <p className="text-slate-400 mb-6">Enter the details of your strategy below. Be as specific as possible for the best results, e.g., "Buying tech stocks like AAPL and MSFT after a 10% dip and holding for 3 months."</p>
            
            <MarketSelector selectedMarket={market} onSelectMarket={setMarket} />
            <StrategyInput 
              strategy={strategy} 
              onStrategyChange={setStrategy}
              onSubmit={handleAnalysis}
              isLoading={isLoading}
            />
          </div>

          <div className="mt-8">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center mb-8">
                <p>{error}</p>
              </div>
            )}
            {analysis && !isLoading && (
              <div className="animate-fade-in">
                <AnalysisDisplay result={analysis} />
              </div>
            )}
          </div>
          
          <div className="mt-8">
            {isMoversLoading && !isLoading && <Loader />}
            {moversError && !isMoversLoading && (
              <div className="mt-6 bg-yellow-500/20 border border-yellow-500 text-yellow-300 px-4 py-3 rounded-lg text-center animate-fade-in">
                <p>{moversError}</p>
              </div>
            )}
            {marketMovers && !isMoversLoading && (
              <div className="animate-fade-in">
                <MarketMovers data={marketMovers} market={market} />
              </div>
            )}
          </div>
          
          <Disclaimer />
        </main>
      </div>
    </div>
  );
};

export default App;

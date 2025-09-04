
import React from 'react';
import { type AnalysisResult } from '../types';

interface StatsGridProps {
  stats: AnalysisResult['stats'];
}

const StatItem: React.FC<{ label: string; value: string | number; valueColor?: string }> = ({ label, value, valueColor = 'text-cyan-400' }) => (
  <div className="bg-slate-800 p-4 rounded-lg text-center">
    <p className="text-sm text-slate-400">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{typeof value === 'number' ? `${value}%` : value}</p>
  </div>
);

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Very High': return 'text-red-500';
      default: return 'text-cyan-400';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish': return 'text-green-400';
      case 'Bearish': return 'text-red-400';
      case 'Neutral': return 'text-yellow-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
      <h4 className="text-xl font-semibold text-slate-200 mb-4 text-center">Key Metrics</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatItem label="Potential ROI" value={stats.potentialRoi} />
        <StatItem label="Risk Level" value={stats.riskLevel} valueColor={getRiskColor(stats.riskLevel)} />
        <StatItem label="Market Sentiment" value={stats.marketSentiment} valueColor={getSentimentColor(stats.marketSentiment)} />
        <StatItem label="AI Confidence" value={stats.confidence} />
      </div>
    </div>
  );
};

export default StatsGrid;

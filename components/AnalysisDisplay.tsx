
import React from 'react';
import { type AnalysisResult } from '../types';
import PredictionCard from './PredictionCard';
import ProsCons from './ProsCons';
import StatsGrid from './StatsGrid';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <PredictionCard prediction={result.prediction} summary={result.summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProsCons title="Potential Upsides" items={result.pros} type="pros" />
        <ProsCons title="Potential Downsides" items={result.cons} type="cons" />
      </div>
      <StatsGrid stats={result.stats} />
    </div>
  );
};

export default AnalysisDisplay;

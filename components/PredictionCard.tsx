
import React from 'react';
import { type AnalysisResult } from '../types';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { TrendingDownIcon } from './icons/TrendingDownIcon';
import { MinusCircleIcon } from './icons/MinusCircleIcon';

interface PredictionCardProps {
  prediction: AnalysisResult['prediction'];
  summary: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, summary }) => {
  const { title, direction } = prediction;

  const directionConfig = {
    UP: {
      icon: <TrendingUpIcon className="w-8 h-8 text-green-400" />,
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    DOWN: {
      icon: <TrendingDownIcon className="w-8 h-8 text-red-400" />,
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    NEUTRAL: {
      icon: <MinusCircleIcon className="w-8 h-8 text-yellow-400" />,
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
  };

  const config = directionConfig[direction];

  return (
    <div className={`p-6 rounded-2xl shadow-2xl border ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{config.icon}</div>
        <div>
          <h3 className={`text-2xl font-bold ${config.textColor}`}>{title}</h3>
          <p className="mt-2 text-slate-300">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;

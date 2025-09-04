
import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface ProsConsProps {
  title: string;
  items: string[];
  type: 'pros' | 'cons';
}

const ProsCons: React.FC<ProsConsProps> = ({ title, items, type }) => {
  const isPros = type === 'pros';
  const Icon = isPros ? CheckCircleIcon : XCircleIcon;
  const iconColor = isPros ? 'text-green-400' : 'text-red-400';
  const borderColor = isPros ? 'border-green-500/30' : 'border-red-500/30';
  const bgColor = isPros ? 'bg-green-500/10' : 'bg-red-500/10';

  return (
    <div className={`p-6 rounded-2xl shadow-lg border ${borderColor} ${bgColor} h-full`}>
      <h4 className="text-xl font-semibold text-slate-200 mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <span className="text-slate-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProsCons;

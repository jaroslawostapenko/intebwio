import React from 'react';
import { KeyStatsSection } from '../../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatsSection: React.FC<{ data: KeyStatsSection }> = ({ data }) => {
  return (
    <div className="mb-8">
      {data.title && <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              {stat.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500 mb-1" />}
              {stat.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500 mb-1" />}
              {stat.trend === 'neutral' && <Minus className="w-5 h-5 text-gray-400 mb-1" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
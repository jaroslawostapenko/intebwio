import React from 'react';
import { TECH_STACK, SYSTEM_METRICS } from '../../data/aboutData';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-12">
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(SYSTEM_METRICS).map(([key, value], idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-lg font-bold text-indigo-600 font-mono">{value}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TECH_STACK.map((category, idx) => {
          const Icon = category.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between group">
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <div className="px-2 py-1 bg-gray-50 rounded text-xs font-mono text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {item.version}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { TimelineSection as TimelineType } from '../../types';
import { Calendar } from 'lucide-react';

export const TimelineSection: React.FC<{ data: TimelineType }> = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
      {data.title && (
        <div className="flex items-center gap-2 mb-8">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
        </div>
      )}
      <div className="relative border-l-2 border-blue-100 ml-3 space-y-8">
        {data.events.map((event, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-sm" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-1">
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                {event.date}
              </span>
              <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mt-1">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
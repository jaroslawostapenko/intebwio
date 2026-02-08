import React, { useState } from 'react';
import { FAQSection as FAQType } from '../../types';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC<{ data: FAQType }> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl mb-8">
      {data.title && (
         <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
        </div>
      )}
      <div className="space-y-3">
        {data.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-indigo-100/50">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800 pr-4">{item.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-indigo-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openIndex === idx && (
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                <div className="mt-4">{item.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
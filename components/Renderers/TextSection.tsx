import React from 'react';
import { TextBlockSection } from '../../types';

export const TextSection: React.FC<{ data: TextBlockSection }> = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
      {data.title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
          {data.title}
        </h2>
      )}
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
        {/* In a real app, use a Markdown parser like react-markdown here */}
        {data.content}
      </div>
    </div>
  );
};
import React from 'react';
import { LinksSection as LinksType } from '../../types';
import { ExternalLink } from 'lucide-react';

export const LinksSection: React.FC<{ data: LinksType }> = ({ data }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 mb-8">
      {data.title && <h2 className="text-xl font-bold text-gray-900 mb-6">{data.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.links.map((link, idx) => (
          <a 
            key={idx} 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{link.title}</h3>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
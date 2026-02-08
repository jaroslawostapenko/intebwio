import React from 'react';
import { Loader2, Hammer, Search, Layout } from 'lucide-react';

export const Loader: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
        <div className="bg-white p-4 rounded-full shadow-xl border border-blue-100 relative z-10">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">Constructing Page</h3>
        <p className="text-gray-500 max-w-xs mx-auto text-sm">{status}</p>
      </div>

      <div className="flex space-x-8 text-gray-400">
        <div className="flex flex-col items-center space-y-2">
          <Search className={`w-5 h-5 ${status.includes('Searching') ? 'text-blue-500 animate-bounce' : ''}`} />
          <span className="text-xs">Research</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Layout className={`w-5 h-5 ${status.includes('Structure') ? 'text-blue-500 animate-bounce' : ''}`} />
          <span className="text-xs">Drafting</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Hammer className={`w-5 h-5 ${status.includes('Building') ? 'text-blue-500 animate-bounce' : ''}`} />
          <span className="text-xs">Building</span>
        </div>
      </div>
    </div>
  );
};
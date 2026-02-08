import React from 'react';
import { Search, Sparkles, Clock, Compass, Layers, Zap } from 'lucide-react';
import { INITIAL_SUGGESTIONS } from '../../constants';
import { HistoryItem } from '../../types';

interface Props {
  onSearch: (query: string) => void;
  history: HistoryItem[];
}

export const HomePage: React.FC<Props> = ({ onSearch, history }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 animate-in fade-in duration-700 bg-gradient-to-b from-transparent to-white/50">
      
      {/* Brand Hero */}
      <div className="mb-10 text-center relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 blur-[100px] rounded-full -z-10" />
        <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200 transform rotate-3">
                <Sparkles className="w-8 h-8 text-white" />
            </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Intebwio</h1>
        <p className="text-lg text-gray-500 font-medium">The browser that builds the web for you.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-16 relative z-10">
        <div className="relative group transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white border border-gray-200 group-hover:border-blue-300 rounded-full shadow-xl shadow-blue-900/5 flex items-center p-2">
            <Search className="ml-4 w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none outline-none text-lg px-4 py-3 text-gray-800 placeholder-gray-400"
                autoFocus
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg shadow-blue-600/20">
                <ArrowRightIcon />
            </button>
          </div>
        </div>
      </form>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Discover */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-indigo-600 text-sm font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Discover Ideas
          </div>
          <div className="flex flex-wrap gap-2">
            {INITIAL_SUGGESTIONS.map((topic, i) => (
              <button
                key={i}
                onClick={() => onSearch(topic)}
                className="px-3 py-2 bg-gray-50 hover:bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-md rounded-lg text-sm text-gray-600 hover:text-indigo-600 transition-all text-left"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-blue-600 text-sm font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" /> Jump Back In
            </div>
            {history.length > 0 ? (
                <div className="space-y-2">
                {history.slice(0, 4).map((item, i) => (
                    <button
                    key={i}
                    onClick={() => onSearch(item.query)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl text-sm text-gray-700 transition-all group"
                    >
                        <span className="truncate font-medium">{item.query}</span>
                        <Zap className="w-3 h-3 text-gray-300 group-hover:text-yellow-500" />
                    </button>
                ))}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                    <Layers className="w-8 h-8 mb-2" />
                    <p className="text-sm">No history yet</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
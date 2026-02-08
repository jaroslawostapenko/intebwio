import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Home, Star, Search } from 'lucide-react';
import { Bookmark } from '../../types';

interface Props {
  currentQuery: string;
  isLoading: boolean;
  isBookmarked: boolean;
  onNavigate: (query: string) => void;
  onReload: () => void;
  onHome: () => void;
  onToggleBookmark: () => void;
}

export const AddressBar: React.FC<Props> = ({ 
  currentQuery, 
  isLoading, 
  isBookmarked,
  onNavigate, 
  onReload, 
  onHome,
  onToggleBookmark
}) => {
  const [input, setInput] = useState(currentQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInput(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onNavigate(input.trim());
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 shadow-sm z-20 relative">
      <div className="flex gap-1 text-gray-500">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50" disabled><ArrowLeft className="w-4 h-4" /></button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50" disabled><ArrowRight className="w-4 h-4" /></button>
        <button 
            onClick={isLoading ? () => {} : onReload}
            className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isLoading ? 'animate-spin text-blue-500' : ''}`}
        >
            <RotateCw className="w-4 h-4" />
        </button>
        <button 
            onClick={onHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
            <Home className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 max-w-5xl mx-auto">
        <div className={`
            relative flex items-center w-full transition-all duration-200
            ${isFocused ? 'ring-2 ring-blue-100 border-blue-400' : 'hover:border-gray-300 border-gray-200'}
            bg-gray-100 border rounded-full
        `}>
          <div className="pl-4 text-gray-400">
             <Lock className="w-3.5 h-3.5 text-green-600" />
          </div>
          
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search or type a topic..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 px-3 py-2.5 outline-none"
          />

          {currentQuery && (
              <button 
                type="button"
                onClick={onToggleBookmark}
                className="pr-3 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </button>
          )}
        </div>
      </form>

      <div className="flex items-center justify-end w-[120px]">
        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white shadow-md">
            <span className="text-xs font-bold tracking-wide">Intebwio</span>
        </div>
      </div>
    </div>
  );
};
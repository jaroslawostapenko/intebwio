import React from 'react';
import { Bookmark } from '../../types';
import { Star, X } from 'lucide-react';

interface Props {
  bookmarks: Bookmark[];
  onNavigate: (query: string) => void;
  onRemove: (query: string) => void;
}

export const BookmarksBar: React.FC<Props> = ({ bookmarks, onNavigate, onRemove }) => {
  if (bookmarks.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-white border-b border-gray-200 overflow-x-auto no-scrollbar">
      {bookmarks.map((bm) => (
        <div 
            key={bm.id} 
            className="group flex items-center gap-2 px-2 py-1 rounded-md text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all cursor-pointer whitespace-nowrap"
        >
            <div 
                className="flex items-center gap-2"
                onClick={() => onNavigate(bm.query)}
            >
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="max-w-[120px] truncate font-medium">{bm.title}</span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); onRemove(bm.query); }}
                className="p-0.5 rounded-sm hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
            </button>
        </div>
      ))}
    </div>
  );
};
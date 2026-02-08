import React from 'react';
import { X, Plus, Globe } from 'lucide-react';
import { Tab } from '../../types';

interface Props {
  tabs: Tab[];
  activeTabId: string;
  onSwitch: (id: string) => void;
  onClose: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
}

export const Tabs: React.FC<Props> = ({ tabs, activeTabId, onSwitch, onClose, onNewTab }) => {
  return (
    <div className="flex items-end h-10 bg-gray-200/80 px-2 pt-2 gap-1 overflow-x-auto no-scrollbar select-none">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSwitch(tab.id)}
            className={`
              group relative flex items-center gap-2 px-3 py-2 min-w-[160px] max-w-[240px] h-full rounded-t-lg text-xs font-medium cursor-pointer transition-all border-t border-l border-r
              ${isActive 
                ? 'bg-white text-gray-800 border-gray-300 shadow-sm z-10' 
                : 'bg-gray-200 text-gray-500 border-transparent hover:bg-gray-300/50'
              }
            `}
          >
            {tab.isLoading ? (
               <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
                <Globe className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            )}
            
            <span className="truncate flex-1">{tab.title || 'New Tab'}</span>
            
            <button
              onClick={(e) => onClose(tab.id, e)}
              className={`
                p-0.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all
                ${isActive ? 'text-gray-500' : 'text-gray-400'}
              `}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
      
      <button 
        onClick={onNewTab}
        className="p-1.5 ml-1 rounded-md hover:bg-gray-300 text-gray-500 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
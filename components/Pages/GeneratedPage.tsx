import React from 'react';
import { GeneratedPage, SectionType } from '../../types';
import { HeroSection } from '../Renderers/HeroSection';
import { TextSection } from '../Renderers/TextSection';
import { StatsSection } from '../Renderers/StatsSection';
import { ChartSection } from '../Renderers/ChartSection';
import { TableSection } from '../Renderers/TableSection';
import { GallerySection } from '../Renderers/GallerySection';
import { LinksSection } from '../Renderers/LinksSection';
import { TimelineSection } from '../Renderers/TimelineSection';
import { FAQSection } from '../Renderers/FAQSection';
import { formatDate } from '../../lib/utils';
import { Clock, RefreshCw, Bookmark, BookmarkCheck } from 'lucide-react';

interface Props {
  page: GeneratedPage;
  onNavigate: (query: string) => void;
  onRefresh: (query: string) => void;
  onBookmarkToggle: () => void;
  isBookmarked: boolean;
}

export const GeneratedPageView: React.FC<Props> = ({ page, onNavigate, onRefresh, onBookmarkToggle, isBookmarked }) => {
  
  const renderSection = (section: any) => {
    switch (section.type) {
      case SectionType.HERO: return <HeroSection key={section.id} data={section} />;
      case SectionType.TEXT_BLOCK: return <TextSection key={section.id} data={section} />;
      case SectionType.KEY_STATS: return <StatsSection key={section.id} data={section} />;
      case SectionType.CHART: return <ChartSection key={section.id} data={section} />;
      case SectionType.DATA_TABLE: return <TableSection key={section.id} data={section} />;
      case SectionType.GALLERY: return <GallerySection key={section.id} data={section} />;
      case SectionType.LINKS: return <LinksSection key={section.id} data={section} />;
      case SectionType.TIMELINE: return <TimelineSection key={section.id} data={section} />;
      case SectionType.FAQ: return <FAQSection key={section.id} data={section} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* Meta Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">Intebwio Page</span>
            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md"><Clock className="w-3 h-3" /> Updated {formatDate(page.lastUpdated)}</span>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mt-2">{page.description}</p>
        </div>
        
        <div className="flex gap-2">
           <button 
            onClick={() => onRefresh(page.query)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button 
            onClick={onBookmarkToggle}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors shadow-sm ${
                isBookmarked 
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Content Render */}
      <div className="space-y-4">
        {page.sections.map(section => renderSection(section))}
      </div>

      {/* Related Topics Footer */}
      {page.relatedTopics && page.relatedTopics.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Discover More with Intebwio</h3>
          <div className="flex flex-wrap gap-2">
            {page.relatedTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => onNavigate(topic)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Credits */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center">
         <p className="text-xs text-gray-400">Intebwio • Created by Yaroslav Ostapenko</p>
      </div>
    </div>
  );
};
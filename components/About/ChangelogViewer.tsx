import React from 'react';
import { CHANGELOG } from '../../data/aboutData';
import { GitCommit, Tag, Calendar, CheckCircle, PlusCircle, AlertCircle } from 'lucide-react';

export const ChangelogViewer: React.FC = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feat': return <PlusCircle className="w-4 h-4 text-green-500" />;
      case 'fix': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'perf': return <ZapIcon />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  );

  return (
    <div className="space-y-12 relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
      
      {CHANGELOG.map((release, idx) => (
        <div key={idx} className="relative pl-20 group">
          {/* Timeline Dot */}
          <div className="absolute left-[26px] top-1 w-3 h-3 rounded-full bg-white border-[3px] border-blue-600 z-10 group-hover:scale-125 transition-transform shadow-sm"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full w-fit">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="font-mono font-bold text-gray-800 text-sm">v{release.version}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{release.date}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">{release.title}</h3>
          
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <ul className="space-y-3">
              {release.changes.map((change, cIdx) => (
                <li key={cIdx} className="flex items-start gap-3">
                  <div className="mt-0.5">{getTypeIcon(change.type)}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

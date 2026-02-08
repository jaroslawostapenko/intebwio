import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from './components/Browser/Tabs';
import { AddressBar } from './components/Browser/AddressBar';
import { BookmarksBar } from './components/Browser/BookmarksBar';
import { HomePage } from './components/Pages/HomePage';
import { GeneratedPageView } from './components/Pages/GeneratedPage';
import { Loader } from './components/UI/Loader';
import { GeneratedPage, HistoryItem, Tab, Bookmark } from './types';
import { storageService } from './services/storageService';
import { generatePageContent } from './services/geminiService';
import { normalizeQuery, generateId } from './lib/utils';
import { AlertCircle, Key, ExternalLink } from 'lucide-react';

// Helper to create a fresh tab
const createNewTab = (): Tab => ({
  id: generateId(),
  query: '',
  title: 'New Tab',
  isLoading: false,
  lastActive: Date.now()
});

const App: React.FC = () => {
  // --- State ---
  const [tabs, setTabs] = useState<Tab[]>([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  
  // Cache active page data in memory
  const [pageCache, setPageCache] = useState<Record<string, GeneratedPage>>({});

  // --- Effects ---
  useEffect(() => {
    setHistory(storageService.getHistory());
    setBookmarks(storageService.getBookmarks());
  }, []);

  // --- Derived State ---
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const activePage = activeTab.query ? (pageCache[normalizeQuery(activeTab.query)] || storageService.getPage(activeTab.query)) : null;
  const isCurrentBookmarked = activeTab.query ? storageService.isBookmarked(activeTab.query) : false;

  // --- Actions ---

  // 1. Tab Management
  const handleNewTab = () => {
    const newTab = createNewTab();
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      setTabs([{ ...tabs[0], query: '', title: 'New Tab', isLoading: false, error: undefined }]);
      return;
    }
    
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    
    if (activeTabId === id) {
      const index = tabs.findIndex(t => t.id === id);
      const nextTab = newTabs[index - 1] || newTabs[index] || newTabs[0];
      setActiveTabId(nextTab.id);
    }
  };

  const handleSwitchTab = (id: string) => {
    setActiveTabId(id);
    setTabs(prev => prev.map(t => t.id === id ? { ...t, lastActive: Date.now() } : t));
  };

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
  };

  // 2. Navigation & Generation
  const handleNavigate = useCallback(async (query: string, forceRefresh = false, useFlash = false) => {
    if (!query) return;

    setIsQuotaExceeded(false);
    updateActiveTab({ query: query, title: query, error: undefined });

    const normalizedId = normalizeQuery(query);
    const cachedPage = storageService.getPage(query);

    if (cachedPage && !forceRefresh) {
      setPageCache(prev => ({ ...prev, [normalizedId]: cachedPage }));
      storageService.addToHistory(query);
      setHistory(storageService.getHistory());
      updateActiveTab({ title: cachedPage.title });
      return;
    }

    updateActiveTab({ isLoading: true, loadingStatus: 'Connecting to Intebwio Engine...' });
    
    const timers = [
      setTimeout(() => updateActiveTab({ loadingStatus: 'Researching topic...' }), 1000),
      setTimeout(() => updateActiveTab({ loadingStatus: 'Designing layout...' }), 2500),
      setTimeout(() => updateActiveTab({ loadingStatus: 'Finalizing content...' }), 4000)
    ];

    try {
      const newPage = await generatePageContent(query, useFlash);
      
      storageService.savePage(newPage);
      storageService.addToHistory(query);
      
      setPageCache(prev => ({ ...prev, [normalizedId]: newPage }));
      setHistory(storageService.getHistory());
      
      setTabs(currentTabs => currentTabs.map(t => 
        t.id === activeTabId 
        ? { ...t, isLoading: false, title: newPage.title, loadingStatus: undefined } 
        : t
      ));

    } catch (err: any) {
      if (err.message === "QUOTA_EXHAUSTED") {
        setIsQuotaExceeded(true);
      }
      setTabs(currentTabs => currentTabs.map(t => 
        t.id === activeTabId 
        ? { ...t, isLoading: false, error: err.originalMessage || err.message || "Failed to generate", loadingStatus: undefined } 
        : t
      ));
    } finally {
      timers.forEach(clearTimeout);
    }
  }, [activeTabId]);

  const handleSelectKey = async () => {
    try {
      const win = window as any;
      if (win.aistudio && win.aistudio.openSelectKey) {
          await win.aistudio.openSelectKey();
          // After selecting key, we assume success as per instructions and retry
          handleNavigate(activeTab.query, true);
      } else {
        console.warn("AI Studio API Key selection not available in this environment.");
      }
    } catch (e) {
      console.error("Failed to open key selection", e);
    }
  };

  const handleHome = () => {
    updateActiveTab({ query: '', title: 'New Tab', isLoading: false, error: undefined });
    setIsQuotaExceeded(false);
  };

  // 3. Bookmarks
  const toggleBookmark = () => {
    if (!activeTab.query) return;
    
    if (isCurrentBookmarked) {
      storageService.removeBookmark(activeTab.query);
    } else {
      storageService.addBookmark(activeTab.query, activePage?.title || activeTab.query);
    }
    setBookmarks(storageService.getBookmarks());
  };

  const removeBookmark = (query: string) => {
    storageService.removeBookmark(query);
    setBookmarks(storageService.getBookmarks());
  };

  // --- Render ---

  const renderContent = () => {
    if (activeTab.isLoading) {
      return <Loader status={activeTab.loadingStatus || 'Loading...'} />;
    }

    if (activeTab.error) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white border border-gray-200 p-10 rounded-3xl max-w-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            
            <h3 className="font-extrabold text-2xl text-gray-900 mb-2">
              {isQuotaExceeded ? "Usage Limit Reached" : "Generation Failed"}
            </h3>
            
            <p className="mb-8 text-gray-500 leading-relaxed">
              {isQuotaExceeded 
                ? "The current API key has exceeded its quota limits. You can switch to a lighter model or provide your own paid API key to continue building."
                : activeTab.error}
            </p>
            
            <div className="flex flex-col gap-3">
              {isQuotaExceeded && (
                <>
                  <button 
                    onClick={handleSelectKey}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    <Key className="w-5 h-5" />
                    Select Custom API Key
                  </button>
                  
                  <button 
                    onClick={() => handleNavigate(activeTab.query, true, true)}
                    className="px-6 py-3 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl font-bold hover:bg-indigo-100 transition-all"
                  >
                    Try with Flash Model (Higher Quota)
                  </button>
                </>
              )}
              
              {!isQuotaExceeded && (
                <button 
                  onClick={() => handleNavigate(activeTab.query, true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Retry Building
                </button>
              )}
              
              <div className="mt-4 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                <a 
                  href="https://ai.google.dev/gemini-api/docs/billing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Billing Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!activeTab.query) {
      return <HomePage onSearch={handleNavigate} history={history} />;
    }

    if (activePage) {
      return (
        <GeneratedPageView 
          page={activePage} 
          onNavigate={(q) => handleNavigate(q)} 
          onRefresh={(q) => handleNavigate(q, true)}
          onBookmarkToggle={toggleBookmark}
          isBookmarked={isCurrentBookmarked}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-browser-bg font-sans text-gray-900 overflow-hidden">
      
      {/* Chrome */}
      <div className="flex flex-col bg-gray-200 border-b border-gray-300 shadow-sm">
        <Tabs 
          tabs={tabs} 
          activeTabId={activeTabId} 
          onSwitch={handleSwitchTab} 
          onClose={handleCloseTab}
          onNewTab={handleNewTab}
        />
        <AddressBar 
          currentQuery={activeTab.query} 
          isLoading={activeTab.isLoading}
          isBookmarked={isCurrentBookmarked}
          onNavigate={handleNavigate}
          onReload={() => handleNavigate(activeTab.query, true)}
          onHome={handleHome}
          onToggleBookmark={toggleBookmark}
        />
        <BookmarksBar 
          bookmarks={bookmarks} 
          onNavigate={(q) => {
            if (!activeTab.query) {
              handleNavigate(q);
            } else {
              handleNavigate(q);
            }
          }}
          onRemove={removeBookmark}
        />
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto relative bg-browser-bg scroll-smooth">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
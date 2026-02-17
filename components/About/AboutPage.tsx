import React, { useState } from 'react';
import { MANIFESTO, CREATOR_PROFILE, PRIVACY_POLICY, ROADMAP } from '../../data/aboutData';
import { ArchitectureVisualizer } from './ArchitectureVisualizer';
import { ChangelogViewer } from './ChangelogViewer';
import { TechnicalSpecs } from './TechnicalSpecs';
import { BookOpen, Box, GitBranch, Shield, Zap, User, Github, Globe, Twitter, Layout } from 'lucide-react';

interface Props {
  onNavigate: (query: string) => void;
}

type TabType = 'manifesto' | 'tech' | 'changelog' | 'privacy' | 'roadmap';

export const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('manifesto');

  const renderContent = () => {
    switch (activeTab) {
      case 'manifesto':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-3xl mb-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{MANIFESTO.title}</h2>
                <p className="text-xl md:text-2xl text-blue-100 font-light">{MANIFESTO.subtitle}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  {MANIFESTO.content.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                
                {/* Creator Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg h-fit">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                             <User className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{CREATOR_PROFILE.name}</h3>
                            <p className="text-blue-600 font-medium">{CREATOR_PROFILE.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-500 mb-6 text-sm leading-relaxed">{CREATOR_PROFILE.bio}</p>
                    <div className="flex gap-3">
                        {CREATOR_PROFILE.links.map((link, i) => (
                            <a 
                                key={i} 
                                href={link.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
                            >
                                {link.label === 'GitHub' && <Github className="w-4 h-4" />}
                                {link.label === 'Website' && <Globe className="w-4 h-4" />}
                                {link.label === 'Twitter' && <Twitter className="w-4 h-4" />}
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-slate-300">
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white m-0">Powered by Gemini</h3>
                </div>
                <p className="mb-6">Intebwio is not just a UI wrapper. It is a sophisticated orchestration layer that communicates with Google's most advanced AI models to synthesize information in real-time.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <div className="font-bold text-white mb-1">Reasoning</div>
                        <div className="text-xs text-slate-400">Gemini 1.5 Pro analyzes intent and structure.</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <div className="font-bold text-white mb-1">Speed</div>
                        <div className="text-xs text-slate-400">Gemini Flash handles rapid text generation.</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <div className="font-bold text-white mb-1">Grounding</div>
                        <div className="text-xs text-slate-400">Real-time search grounding for accuracy.</div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Technical Specifications</h2>
                <p className="text-gray-500">A deep dive into the architecture and dependencies powering Intebwio.</p>
            </div>
            <ArchitectureVisualizer />
            <div className="my-12 w-full h-px bg-gray-200"></div>
            <TechnicalSpecs />
          </div>
        );
      case 'changelog':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Version History</h2>
                <p className="text-gray-500">Track the evolution of the project from inception to today.</p>
            </div>
            <ChangelogViewer />
          </div>
        );
      case 'privacy':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-3xl mx-auto">
             <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h2>
                <p className="text-gray-500">Your data belongs to you. Period.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-slate max-w-none whitespace-pre-line">
                {PRIVACY_POLICY}
            </div>
          </div>
        );
      case 'roadmap':
        return (
           <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Roadmap</h2>
                <p className="text-gray-500">The future of generative browsing.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {ROADMAP.map((phase, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${phase.status === 'active' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-white border-gray-200'} relative`}>
                        {phase.status === 'active' && (
                            <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                In Progress
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-2">{phase.phase}</h3>
                        <ul className="space-y-3">
                            {phase.items.map((item, ii) => (
                                <li key={ii} className="flex items-center gap-2 text-sm text-gray-700">
                                    <div className={`w-1.5 h-1.5 rounded-full ${phase.status === 'completed' ? 'bg-green-500' : phase.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
           </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">About Intebwio</div>
                <nav className="space-y-1">
                    <button onClick={() => setActiveTab('manifesto')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'manifesto' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <BookOpen className="w-4 h-4" /> Manifesto
                    </button>
                    <button onClick={() => setActiveTab('tech')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'tech' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Box className="w-4 h-4" /> Tech Stack
                    </button>
                    <button onClick={() => setActiveTab('roadmap')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'roadmap' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Layout className="w-4 h-4" /> Roadmap
                    </button>
                    <button onClick={() => setActiveTab('changelog')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'changelog' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <GitBranch className="w-4 h-4" /> Changelog
                    </button>
                    <button onClick={() => setActiveTab('privacy')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Shield className="w-4 h-4" /> Privacy
                    </button>
                </nav>

                <div className="mt-8 px-3 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-2">Version 1.0.0</p>
                    <button onClick={() => onNavigate('Intebwio architecture')} className="text-xs text-blue-600 hover:underline">
                        Check for updates
                    </button>
                </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
             {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
};

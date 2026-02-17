import React, { useEffect, useState } from 'react';

export const ArchitectureVisualizer: React.FC = () => {
  const [packetPos, setPacketPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPos((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Calculate position along a path for animation
  // Path: User (100, 150) -> App (300, 150) -> AI (500, 150) -> App (300, 150) -> Renderer (300, 350)
  
  const getDotPosition = (progress: number) => {
    // Simple linear interpolation between nodes for demo
    // 0-25: User -> App
    // 25-50: App -> AI
    // 50-75: AI -> App
    // 75-100: App -> Renderer
    
    let x = 0, y = 0;
    
    if (progress < 25) {
      const p = progress / 25;
      x = 100 + (200 * p);
      y = 150;
    } else if (progress < 50) {
      const p = (progress - 25) / 25;
      x = 300 + (200 * p);
      y = 150;
    } else if (progress < 75) {
      const p = (progress - 50) / 25;
      x = 500 - (200 * p);
      y = 150;
    } else {
      const p = (progress - 75) / 25;
      x = 300;
      y = 150 + (200 * p);
    }
    return { x, y };
  };

  const dot = getDotPosition(packetPos);

  return (
    <div className="w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 p-8 flex flex-col items-center">
      <h3 className="text-slate-300 font-mono mb-4 text-sm uppercase tracking-wider">System Architecture Data Flow</h3>
      <div className="relative w-full max-w-2xl aspect-[16/9]">
        <svg viewBox="0 0 600 400" className="w-full h-full drop-shadow-lg">
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connections */}
          <path d="M100,150 L300,150" stroke="url(#connectionGradient)" strokeWidth="4" />
          <path d="M300,150 L500,150" stroke="url(#connectionGradient)" strokeWidth="4" />
          <path d="M300,150 L300,350" stroke="url(#connectionGradient)" strokeWidth="4" />

          {/* Nodes */}
          
          {/* User Node */}
          <g transform="translate(100, 150)">
            <circle r="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
            <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">USER</text>
            <text x="0" y="20" textAnchor="middle" fill="#94a3b8" fontSize="10">Input</text>
          </g>

          {/* Core Engine Node */}
          <g transform="translate(300, 150)">
            <rect x="-50" y="-40" width="100" height="80" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="3" />
            <text x="0" y="-5" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">ENGINE</text>
            <text x="0" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">Orchestrator</text>
          </g>

          {/* AI Model Node */}
          <g transform="translate(500, 150)">
            <path d="M-40,-30 L40,-30 L50,0 L40,30 L-40,30 L-50,0 Z" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
            <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">GEMINI AI</text>
          </g>

          {/* Renderer Node */}
          <g transform="translate(300, 350)">
            <rect x="-60" y="-30" width="120" height="60" rx="5" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
            <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace">REACT DOM</text>
          </g>

          {/* Animated Packet */}
          <circle cx={dot.x} cy={dot.y} r="8" fill="#fff" filter="url(#glow)">
            <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Labels for flows */}
          <text x="200" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Query</text>
          <text x="400" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Prompt Construction</text>
          <text x="340" y="250" textAnchor="start" fill="#64748b" fontSize="10">JSON Structure</text>

        </svg>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
        <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 font-mono">15ms</div>
            <div className="text-xs text-slate-400">Input Latency</div>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400 font-mono">~2.5s</div>
            <div className="text-xs text-slate-400">Inference Time</div>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-2xl font-bold text-amber-400 font-mono">60fps</div>
            <div className="text-xs text-slate-400">Render Rate</div>
        </div>
      </div>
    </div>
  );
};

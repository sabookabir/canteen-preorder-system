import React, { useState, useEffect } from 'react';
import { Activity, Globe, Cpu, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const SystemStatus = () => {
  const [latency, setLatency] = useState(24);
  const [load, setLoad] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(15, Math.min(60, prev + (Math.random() - 0.5) * 5)));
      setLoad(prev => Math.max(20, Math.min(85, prev + (Math.random() - 0.5) * 10)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-[var(--bg-primary)] border-t border-[var(--border-color)] flex items-center px-4 justify-between backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Node: LINK_ESTABLISHED</span>
        </div>
        
        <div className="hidden md:flex items-center gap-4 border-l border-[var(--border-color)] pl-4">
          <div className="flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-indigo-500" />
            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest leading-none">Latency: {latency.toFixed(1)}ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="h-3 w-3 text-indigo-500" />
            <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest leading-none">Throughput: 852 MB/s</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 border-r border-[var(--border-color)] pr-4">
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">MEM_UTILIZATION</span>
          <div className="w-24 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden border border-[var(--border-color)]">
             <motion.div 
               animate={{ width: `${load}%` }}
               className="h-full bg-indigo-500"
             />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-indigo-500">
          <Globe className="h-3 w-3" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">SECURE_TUNNEL_v4.2</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;

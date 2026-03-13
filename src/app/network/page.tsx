"use client";

import { useNodeMonitor } from "@/hooks/useNodeMonitor";
import { useEffect, useState } from "react";

interface NetworkEvent {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export default function NetworkPage() {
  const { networkMetrics, loading } = useNodeMonitor();
  const [events, setEvents] = useState<NetworkEvent[]>([]);

  useEffect(() => {
    if (loading) return;
    
    setEvents(prev => {
      const isAnomalous = networkMetrics.packetLoss >= 0.3 || networkMetrics.latency > 80;
      
      const newEvent: NetworkEvent = {
        id: Math.random().toString(36).substring(2, 9),
        time: new Date().toLocaleTimeString(),
        message: `Global traffic update: Latency at ${networkMetrics.latency}ms, Packet Loss at ${networkMetrics.packetLoss}%`,
        type: isAnomalous ? 'warning' : 'info'
      };
      
      const updated = [newEvent, ...prev];
      return updated.slice(0, 15); // Keep the last 15 events
    });
  }, [networkMetrics, loading]);

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <header className="mb-10 md:mb-16">
        <h1 className="text-base font-medium text-zinc-100 placeholder-transparent">
          Network
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Traffic and latency stats</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Global Latency</h3>
          <p className="text-3xl font-light text-zinc-100">
             {loading ? '--' : networkMetrics.latency}<span className="text-base text-zinc-500 ml-1">ms</span>
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Packet Loss</h3>
          <p className="text-3xl font-light text-zinc-100">
             {loading ? '--' : networkMetrics.packetLoss}<span className="text-base text-zinc-500 ml-1">%</span>
          </p>
        </div>
      </div>

      <div className="border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden p-6">
        <h3 className="text-sm font-medium text-zinc-200 mb-6">Network Events Log</h3>
        
        <div className="space-y-4">
           {loading && (
              <div className="animate-pulse space-y-4">
                 <div className="h-10 bg-zinc-900 rounded-lg w-full"></div>
                 <div className="h-10 bg-zinc-900 rounded-lg w-full"></div>
                 <div className="h-10 bg-zinc-900 rounded-lg w-full"></div>
              </div>
           )}
           {!loading && events.map(event => (
             <div 
               key={event.id} 
               className={`p-3 rounded-lg border text-sm flex items-center justify-between transition-all duration-300
                 ${event.type === 'warning' ? 'border-amber-500/20 bg-amber-500/5 text-amber-200' : 'border-zinc-800/50 bg-zinc-900/30 text-zinc-400'}
               `}
             >
               <span>{event.message}</span>
               <span className="text-xs opacity-60 ml-4 whitespace-nowrap">{event.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

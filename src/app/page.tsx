"use client";

import { useNodeMonitor } from "@/hooks/useNodeMonitor";
import { StatusCard, SkeletonCard } from "@/components/StatusCard";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardOverview() {
  const { nodes, chartData, loading, selectedNodeId, setSelectedNodeId } = useNodeMonitor();

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <header className="mb-10 md:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-base font-medium text-zinc-100 placeholder-transparent">
            Infrastructure Overview
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Real-time dynamic metrics</p>
        </div>
        
        {!loading && (
           <select
             value={selectedNodeId || ""}
             onChange={(e) => setSelectedNodeId(e.target.value || null)}
             className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg focus:ring-zinc-700 focus:border-zinc-700 block p-2 outline-none transition-colors w-full sm:w-auto sm:max-w-[200px]"
           >
             <option value="">Global Average (All Nodes)</option>
             {nodes.map(node => (
               <option key={node.id} value={node.id}>
                 {node.name} {node.status === "offline" ? "(Offline)" : ""}
               </option>
             ))}
           </select>
        )}
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-16">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : nodes.map((node) => (
              <StatusCard 
                key={node.id} 
                node={node} 
                onClick={(id) => setSelectedNodeId(id === selectedNodeId ? null : id)}
                isSelected={node.id === selectedNodeId}
              />
            ))}
      </div>

      {/* Chart Area */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-400">
            {selectedNodeId 
              ? `Performance: ${nodes.find(n => n.id === selectedNodeId)?.name || ''}` 
              : "Global Cluster Performance"}
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-500">CPU Usage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-zinc-500">Memory Usage</span>
            </div>
          </div>
        </div>
        
        <div className="w-full h-80 rounded-xl border border-zinc-800 bg-zinc-950 p-4 relative overflow-hidden">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
             </div>
          ) : (
            <div className="w-full h-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#09090b',
                      borderColor: '#27272a',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#e4e4e7'
                    }}
                    itemStyle={{ color: '#e4e4e7' }}
                    cursor={{ stroke: '#3f3f46', strokeWidth: 1, strokeDasharray: "4 4" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cpu"
                    name="CPU"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCpu)"
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    name="Memory"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMem)"
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

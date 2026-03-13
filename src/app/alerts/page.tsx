"use client";

import { useNodeMonitor } from "@/hooks/useNodeMonitor";
import { NodeStatus } from "@/lib/data";

const AlertBadge = ({ status }: { status: NodeStatus }) => {
  const styles = {
    online: "",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    offline: "bg-red-500/10 text-red-500 border-red-500/20",
  }[status];

  return (
    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${styles} tracking-widest`}>
      {status === 'offline' ? 'CRITICAL' : 'WARNING'}
    </span>
  );
};

export default function AlertsPage() {
  const { nodes, loading } = useNodeMonitor();
  const alerts = nodes.filter(n => n.status === 'warning' || n.status === 'offline');

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <header className="mb-10 md:mb-16">
        <h1 className="text-base font-medium text-zinc-100 placeholder-transparent">
          Alerts
        </h1>
        <p className="text-sm text-zinc-500 mt-1">System logs and incident history</p>
      </header>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-zinc-900/50 rounded-xl border border-zinc-800"></div>
          <div className="h-20 bg-zinc-900/50 rounded-xl border border-zinc-800"></div>
        </div>
      ) : alerts.length === 0 ? (
        <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex flex-col items-center justify-center mb-4 border border-emerald-500/20">
            <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
          </div>
          <h3 className="text-emerald-400 font-medium mb-1">Sistema estable</h3>
          <p className="text-sm text-emerald-500/70">No active alerts. All systems are operating within normal parameters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(node => (
            <div 
              key={node.id} 
              className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300
                ${node.status === 'offline' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}
              `}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-zinc-200 font-medium">{node.name}</h3>
                  <AlertBadge status={node.status} />
                </div>
                <p className="text-sm text-zinc-400">
                  {node.status === 'offline' 
                    ? `Node is completely unreachable and failing health checks.` 
                    : `Node is experiencing high load (CPU: ${node.cpuUsage}%, Memory: ${node.memoryUsage}%).`}
                </p>
              </div>
              <button 
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap
                  ${node.status === 'offline' 
                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' 
                    : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'}
                `}
              >
                Acknowledge
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

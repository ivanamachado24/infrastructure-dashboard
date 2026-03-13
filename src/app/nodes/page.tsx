"use client";

import { useNodeMonitor } from "@/hooks/useNodeMonitor";
import { NodeStatus } from "@/lib/data";
import { AnimatedNumber } from "@/components/AnimatedNumber";

const StatusBadge = ({ status }: { status: NodeStatus }) => {
  const styles = {
    online: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    offline: "bg-red-500/10 text-red-400 border-red-500/20",
  }[status];

  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${styles} capitalize tracking-wide transition-colors duration-500`}>
      {status}
    </span>
  );
};

export default function NodesPage() {
  const { nodes, loading } = useNodeMonitor();

  return (
    <div className="animate-in fade-in duration-1000 ease-out">
      <header className="mb-10 md:mb-16">
        <h1 className="text-base font-medium text-zinc-100 placeholder-transparent">
          Nodes
        </h1>
        <p className="text-sm text-zinc-500 mt-1">Detailed list of all clusters</p>
      </header>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500 border-b border-zinc-800">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">Node Name</th>
              <th scope="col" className="px-6 py-4 font-medium">CPU Usage</th>
              <th scope="col" className="px-6 py-4 font-medium">Memory</th>
              <th scope="col" className="px-6 py-4 font-medium">Latency</th>
              <th scope="col" className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-800 last:border-0 animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-24"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-12"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-5 bg-zinc-800 rounded-full w-16"></div></td>
                </tr>
              ))
            ) : (
              nodes.map((node) => (
                <tr key={node.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors last:border-0">
                  <td className="px-6 py-4 font-medium text-zinc-200">{node.name}</td>
                  <td className="px-6 py-4 text-zinc-300">
                    <span className="transition-all duration-500">
                      {node.status === 'offline' ? '--' : <AnimatedNumber value={node.cpuUsage} />}
                      {node.status !== 'offline' && '%'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    <span className="transition-all duration-500">
                      {node.status === 'offline' ? '--' : <AnimatedNumber value={node.memoryUsage} />}
                      {node.status !== 'offline' && '%'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <span className="transition-all duration-500">
                      {node.status === 'offline' ? '--' : <AnimatedNumber value={node.latency} />}
                      {node.status !== 'offline' && 'ms'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={node.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

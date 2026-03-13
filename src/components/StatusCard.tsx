"use client";

import { NodeData } from "@/lib/data";
import { AnimatedNumber } from "./AnimatedNumber";

interface StatusCardProps {
  node: NodeData;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export const StatusCard = ({ node, onClick, isSelected }: StatusCardProps) => {
  const statusConfig = {
    online: {
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    warning: {
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    offline: {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  };

  const config = statusConfig[node.status];

  return (
    <button
      onClick={() => onClick(node.id)}
      className={`border bg-zinc-950 rounded-xl p-5 flex flex-col justify-between h-40 transition-all duration-300 hover:border-zinc-700 text-left w-full
        ${isSelected ? "border-zinc-500 ring-1 ring-zinc-500/50" : "border-zinc-800"}`}
    >
      <div className="flex justify-between items-center mb-4 w-full">
        <h3 className="text-sm font-medium text-zinc-200 truncate pr-2">
          {node.name}
        </h3>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${config.border} ${config.bg} ${config.color} capitalize tracking-wide transition-colors duration-500`}
        >
          {node.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto w-full">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 mb-1 font-medium">CPU</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-light text-zinc-100 transition-all duration-500">
              {node.status === "offline" ? "--" : <AnimatedNumber value={node.cpuUsage} />}
            </span>
            {node.status !== "offline" && (
              <span className="text-sm text-zinc-500">%</span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 mb-1 font-medium">Memory</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-light text-zinc-100 transition-all duration-500">
              {node.status === "offline" ? "--" : <AnimatedNumber value={node.memoryUsage} />}
            </span>
            {node.status !== "offline" && (
              <span className="text-sm text-zinc-500">%</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export const SkeletonCard = () => (
  <div className="border border-zinc-800 bg-zinc-950 rounded-xl p-5 flex flex-col justify-between h-40 animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-4 bg-zinc-800 rounded w-24"></div>
      <div className="h-4 bg-zinc-800 rounded-full w-12"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-auto">
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-zinc-800 rounded w-8"></div>
        <div className="h-8 bg-zinc-800 rounded w-16"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-zinc-800 rounded w-12"></div>
        <div className="h-8 bg-zinc-800 rounded w-16"></div>
      </div>
    </div>
  </div>
);

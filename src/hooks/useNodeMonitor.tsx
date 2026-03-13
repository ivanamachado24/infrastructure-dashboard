"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import { NodeData, NodeStatus, initialNodes, generateMockMetrics } from "@/lib/data";

export interface ChartDataPoint {
  time: string;
  cpu: number;
  memory: number;
}

export interface NetworkMetrics {
  latency: number;
  packetLoss: number;
}

interface NodeMonitorContextType {
  nodes: NodeData[];
  chartData: ChartDataPoint[];
  loading: boolean;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  networkMetrics: NetworkMetrics;
}

const NodeMonitorContext = createContext<NodeMonitorContextType | undefined>(undefined);

const generateInitialChartData = (): ChartDataPoint[] => {
  const data = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2000);
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpu: Math.floor(Math.random() * 30) + 40,
      memory: Math.floor(Math.random() * 20) + 50,
    });
  }
  return data;
};

export const NodeMonitorProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics>({ latency: 45, packetLoss: 0.1 });

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      setNodes(initialNodes);
      setChartData(generateInitialChartData());
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const updateMetrics = useCallback(() => {
    let currentNodesState: NodeData[] = [];

    setNodes((currentNodes) => {
      currentNodesState = currentNodes.map((node) => {
        const metrics = generateMockMetrics();
        let newStatus: NodeStatus = 'online';

        if (metrics.cpu >= 90) {
          newStatus = 'offline';
        } else if (metrics.cpu >= 70) {
          newStatus = 'warning';
        }

        return {
          ...node,
          cpuUsage: newStatus === 'offline' ? 0 : metrics.cpu,
          memoryUsage: newStatus === 'offline' ? 0 : metrics.memory,
          latency: newStatus === 'offline' ? 0 : metrics.latency,
          status: newStatus,
        };
      });
      return currentNodesState;
    });

    setChartData((prev) => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      let newCpu = 0;
      let newMem = 0;

      if (selectedNodeId) {
        const selectedNode = currentNodesState.find(n => n.id === selectedNodeId);
        if (selectedNode && selectedNode.status !== "offline") {
           newCpu = selectedNode.cpuUsage;
           newMem = selectedNode.memoryUsage;
        }
      } else {
        const onlineNodes = currentNodesState.filter(n => n.status !== "offline");
        if (onlineNodes.length > 0) {
          newCpu = Math.round(onlineNodes.reduce((acc, curr) => acc + curr.cpuUsage, 0) / onlineNodes.length);
          newMem = Math.round(onlineNodes.reduce((acc, curr) => acc + curr.memoryUsage, 0) / onlineNodes.length);
        }
      }
      
      return [...prev.slice(1), { time: newTime, cpu: newCpu, memory: newMem }];
    });

    setNetworkMetrics({
      latency: Math.floor(Math.random() * 80) + 20,
      packetLoss: Number((Math.random() * 0.5).toFixed(2)),
    });
  }, [selectedNodeId]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, [loading, updateMetrics]);

  const value = useMemo(() => ({
    nodes,
    chartData,
    loading,
    selectedNodeId,
    setSelectedNodeId,
    networkMetrics,
  }), [nodes, chartData, loading, selectedNodeId, networkMetrics]);

  return (
    <NodeMonitorContext.Provider value={value}>
      {children}
    </NodeMonitorContext.Provider>
  );
};

export const useNodeMonitor = () => {
  const context = useContext(NodeMonitorContext);
  if (context === undefined) {
    throw new Error("useNodeMonitor must be used within a NodeMonitorProvider");
  }
  return context;
};

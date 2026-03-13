export type NodeStatus = 'online' | 'warning' | 'offline';

export interface NodeData {
  id: string;
  name: string;
  cpuUsage: number;
  memoryUsage: number;
  latency: number;
  status: NodeStatus;
}

export const initialNodes: NodeData[] = [
  { id: 'node-1', name: 'api-server-01', cpuUsage: 45, memoryUsage: 60, latency: 45, status: 'online' },
  { id: 'node-2', name: 'db-primary', cpuUsage: 88, memoryUsage: 92, latency: 120, status: 'warning' },
  { id: 'node-3', name: 'worker-a', cpuUsage: 12, memoryUsage: 35, latency: 30, status: 'online' },
  { id: 'node-4', name: 'cache-redis', cpuUsage: 0, memoryUsage: 0, latency: 0, status: 'offline' },
  { id: 'node-5', name: 'api-server-02', cpuUsage: 55, memoryUsage: 65, latency: 50, status: 'online' },
  { id: 'node-6', name: 'search-elastic', cpuUsage: 82, memoryUsage: 78, latency: 80, status: 'warning' },
];

export const generateMockMetrics = () => {
  return {
    cpu: Math.floor(Math.random() * 101),
    memory: Math.floor(Math.random() * 101),
    latency: Math.floor(Math.random() * 300) + 10,
  };
};

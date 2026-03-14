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

export const generateMockMetrics = (currentCpu?: number, currentMem?: number, currentLatency?: number) => {
  const walk = (val: number, max: number, maxStep: number) => {
    // Current value plus a random step between -maxStep and +maxStep
    let newVal = val + (Math.random() * maxStep * 2 - maxStep);
    
    // Bounds checking to make it bounce back instead of sticking to edges
    if (newVal < 0) newVal = Math.abs(newVal); 
    if (newVal > max) newVal = max - (newVal - max);
    
    return Math.floor(newVal);
  };

  return {
    cpu: walk(currentCpu ?? Math.floor(Math.random() * 101), 100, 15), 
    memory: walk(currentMem ?? Math.floor(Math.random() * 101), 100, 8),
    latency: walk(currentLatency ?? (Math.floor(Math.random() * 100) + 20), 500, 20),
  };
};

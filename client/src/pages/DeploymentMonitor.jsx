import React from 'react';
import { 
  Cloud, 
  Activity, 
  ShieldCheck, 
  RefreshCcw, 
  ChevronRight, 
  Cpu, 
  Database, 
  Globe 
} from 'lucide-react';

const ServiceNode = ({ name, status, type, latency }) => (
  <div className="glass-card flex items-center justify-between group">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${
        status === 'Healthy' ? 'bg-devops-green/10 text-devops-green' : 'bg-devops-red/10 text-devops-red'
      }`}>
        {type === 'api' ? <Cpu size={20} /> : type === 'db' ? <Database size={20} /> : <Globe size={20} />}
      </div>
      <div>
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{type}</p>
      </div>
    </div>
    <div className="text-right">
      <div className="flex items-center gap-2 justify-end">
        <span className="text-[10px] font-bold text-gray-400">{latency}ms</span>
        <div className={`w-2 h-2 rounded-full ${status === 'Healthy' ? 'bg-devops-green' : 'bg-devops-red'} animate-pulse`}></div>
      </div>
      <p className={`text-[10px] font-bold uppercase mt-1 ${status === 'Healthy' ? 'text-devops-green' : 'text-devops-red'}`}>
        {status}
      </p>
    </div>
  </div>
);

const PipelineStep = ({ name, status, time, active }) => (
  <div className={`flex flex-col items-center relative ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 ${
      status === 'success' ? 'bg-devops-green/20 border-devops-green text-devops-green' :
      status === 'failed' ? 'bg-devops-red/20 border-devops-red text-devops-red' :
      'bg-dark-700 border-white/10 text-gray-500'
    }`}>
      {status === 'success' ? <ShieldCheck size={20} /> : <Activity size={20} />}
    </div>
    <span className="text-[10px] font-bold text-gray-400 uppercase text-center">{name}</span>
    {time && <span className="text-[9px] text-gray-600 font-mono mt-1">{time}</span>}
  </div>
);

const DeploymentMonitor = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-gray-500 text-sm">Real-time telemetry for <span className="text-primary-500">production-cluster-01</span></p>
        </div>
        <button className="btn-primary">
          <RefreshCcw size={18} />
          Force Sync
        </button>
      </div>

      {/* CI/CD Pipeline Visualizer */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Cloud className="text-primary-500" size={24} />
            <h2 className="font-bold">Active Deployment: <span className="terminal-text text-xs ml-2">v2.4.1-rc3</span></h2>
          </div>
          <span className="bg-primary-600/10 text-primary-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-primary-500/20">
            Running: Build #412
          </span>
        </div>

        <div className="flex items-center justify-between px-10 relative">
          <div className="absolute top-5 left-20 right-20 h-0.5 bg-dark-700 -z-10"></div>
          <PipelineStep name="Initialize" status="success" time="12s" active />
          <PipelineStep name="Test Suite" status="success" time="1m 4s" active />
          <PipelineStep name="Build" status="success" time="2m 12s" active />
          <PipelineStep name="Deploy" status="running" active />
          <PipelineStep name="Verify" status="pending" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Service Health */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-primary-500" />
            Service Nodes
          </h3>
          <ServiceNode name="Auth Gateway" type="api" status="Healthy" latency="24" />
          <ServiceNode name="Product Catalog" type="api" status="Healthy" latency="45" />
          <ServiceNode name="User Database" type="db" status="Healthy" latency="12" />
          <ServiceNode name="Media Proxy" type="api" status="Healthy" latency="156" />
          <ServiceNode name="Inventory DB" type="db" status="Degraded" latency="1200" />
        </div>

        {/* Infrastructure Stats */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-6">Cluster Utilization</h3>
            <div className="space-y-6">
              {[
                { label: 'CPU Usage', value: 68, color: 'primary' },
                { label: 'Memory', value: 84, color: 'yellow' },
                { label: 'Storage', value: 42, color: 'green' }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="text-gray-200">{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${stat.color === 'primary' ? 'primary-500' : stat.color === 'yellow' ? 'devops-yellow' : 'devops-green'} transition-all duration-1000`} 
                      style={{ width: `${stat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <button className="w-full py-2 flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors group">
              <span>View detailed metrics in Grafana</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentMonitor;

import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  TrendingUp, 
  Zap,
  MoreVertical,
  Download,
  Eye,
  Bot,
  Terminal,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const BentoCard = ({ title, value, icon: Icon, color, trend, trendValue, description }) => (
  <div className="glass-card flex flex-col justify-between group hover:border-primary-500/50 transition-all duration-500">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold ${trend === 'up' ? 'text-devops-green' : 'text-devops-red'} flex items-center gap-1`}>
          <TrendingUp size={12} className={trend === 'down' ? 'rotate-180' : ''} />
          {trendValue}%
        </span>
      )}
    </div>
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black tracking-tighter text-white">{value}</h3>
      {description && <p className="text-gray-600 text-[10px] mt-2 font-medium">{description}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    const data = {
      timestamp: new Date().toISOString(),
      systemStatus: 'Optimal',
      metrics: {
        activeIssues: 24,
        healthScore: '98%',
        uptime: '99.99%',
        aiPrecision: '94.2%'
      }
    };
    
    setTimeout(() => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nexus-report-${new Date().getTime()}.json`;
      link.click();
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Command Center
          </h1>
          <p className="text-gray-500 text-sm mt-1">System status: <span className="text-devops-green font-bold uppercase tracking-widest text-[10px] bg-devops-green/10 px-2 py-0.5 rounded">Operational</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary"
          >
            {isExporting ? <Zap size={18} className="animate-spin" /> : <Download size={18} />}
            {isExporting ? 'Processing...' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BentoCard 
          title="Active Issues" 
          value="24" 
          icon={AlertTriangle} 
          color="yellow" 
          trend="up" 
          trendValue="12"
          description="Requires immediate triage"
        />
        <BentoCard 
          title="Health Score" 
          value="98%" 
          icon={ShieldCheck} 
          color="primary" 
          description="All systems nominal"
        />
        <BentoCard 
          title="Neural Uptime" 
          value="99.99%" 
          icon={Zap} 
          color="green" 
          description="Last reset 42 days ago"
        />
        <BentoCard 
          title="AI Precision" 
          value="94.2%" 
          icon={Bot} 
          color="blue" 
          trend="up" 
          trendValue="3"
          description="Classifier performance"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-primary-500" />
                Network Throughput
              </h2>
              <div className="flex gap-2">
                {['1H', '24H', '7D'].map(period => (
                  <button key={period} className={`px-3 py-1 text-[10px] font-bold rounded-lg ${period === '24H' ? 'bg-primary-600 text-white' : 'bg-dark-800 text-gray-500'}`}>
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 w-full bg-dark-800/50 rounded-2xl border border-white/5 flex items-end justify-between p-6 gap-2 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent"></div>
              {[45, 60, 40, 80, 55, 90, 70, 85, 40, 65, 50, 75].map((h, i) => (
                <div 
                  key={i} 
                  className="w-full bg-primary-600/40 rounded-t-lg relative group transition-all hover:bg-primary-500"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-dark-950 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}ms
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Critical Deployments</h2>
              <button className="text-primary-500 text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Core Gateway v2.4', status: 'Success', time: '12m ago', color: 'devops-green' },
                { name: 'Payment Processor', status: 'Failed', time: '45m ago', color: 'devops-red' },
                { name: 'User Auth Module', status: 'Running', time: 'Just now', color: 'primary-500' }
              ].map((dep, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full bg-${dep.color} animate-pulse`}></div>
                    <div>
                      <h4 className="font-bold text-sm">{dep.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{dep.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase bg-${dep.color}/10 text-${dep.color}`}>
                      {dep.status}
                    </span>
                    <ChevronRight size={16} className="text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <div className="glass-card border-primary-500/20 bg-primary-500/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full group-hover:bg-primary-600/40 transition-all"></div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg text-white">
                <Bot size={20} />
              </div>
              <h3 className="font-bold">Neural Insights</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              "Detected a latency spike in <span className="text-primary-500 font-mono italic">auth-v2</span>. Regression analysis suggests potential database lock in thread #42."
            </p>
            <button 
              onClick={() => setShowAnalysis(true)}
              className="w-full py-3 bg-white text-dark-950 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Terminal size={18} />
              View Full Analysis
            </button>
          </div>

          <div className="glass-card">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Clock size={18} className="text-devops-yellow" />
              Incident Timeline
            </h3>
            <div className="space-y-6 relative ml-2">
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-dark-700"></div>
              {[
                { time: '14:20', text: 'API rate limit exceeded', status: 'resolved' },
                { time: '12:05', text: 'Staging build failed #901', status: 'critical' },
                { time: '09:30', text: 'Security patch applied', status: 'info' }
              ].map((log, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full ${
                    log.status === 'critical' ? 'bg-devops-red' : log.status === 'resolved' ? 'bg-devops-green' : 'bg-primary-500'
                  }`}></div>
                  <span className="text-[10px] font-bold text-gray-600">{log.time}</span>
                  <p className="text-xs text-gray-400 font-medium mt-1">{log.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-2xl border-primary-500/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-devops-green"></div>
            <div className="flex justify-between items-start mb-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600/20 rounded-2xl flex items-center justify-center text-primary-500">
                  <Cpu size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Root Cause Analysis</h2>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Case ID: <span className="text-primary-500 font-mono">ARC-9901-DELTA</span></p>
                </div>
              </div>
              <button 
                onClick={() => setShowAnalysis(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <MoreVertical size={24} />
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-dark-800/50 p-4 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-3">AI Verdict</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The system detected a 300% increase in database wait times coinciding with the latest deployment of the Auth Module. The anomaly pattern matches a "Deadlock" signature caused by a missing index on the `session_id` field.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-devops-red/10 rounded-xl border border-devops-red/20">
                  <h4 className="text-[10px] font-bold text-devops-red uppercase tracking-widest mb-1">Impact Level</h4>
                  <p className="text-lg font-black italic">CRITICAL</p>
                </div>
                <div className="p-4 bg-devops-green/10 rounded-xl border border-devops-green/20">
                  <h4 className="text-[10px] font-bold text-devops-green uppercase tracking-widest mb-1">Confidence Score</h4>
                  <p className="text-lg font-black italic">92.4%</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recommended Actions</h4>
                {[
                  'Apply index to `sessions.session_id`',
                  'Rollback Auth Gateway to v2.3.9',
                  'Increase connection pool to 200'
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <CheckCircle2 size={16} className="text-devops-green" />
                    <span className="text-xs font-medium text-gray-300">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
              <button 
                onClick={() => setShowAnalysis(false)}
                className="flex-1 py-3 bg-dark-800 text-white rounded-xl font-bold hover:bg-dark-700 transition-all"
              >
                Close Report
              </button>
              <button className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20">
                Execute Fix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

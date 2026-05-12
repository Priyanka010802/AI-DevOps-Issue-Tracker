import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plus, Filter, MoreHorizontal, MessageSquare, Tag, Zap } from 'lucide-react';

const IssueCard = ({ issue }) => (
  <div className="bg-dark-700/50 border border-white/5 p-4 rounded-xl hover:border-primary-500/30 transition-all cursor-move group">
    <div className="flex justify-between items-start mb-2">
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
        issue.priority === 'Critical' ? 'bg-red-500/20 text-red-500' :
        issue.priority === 'High' ? 'bg-orange-500/20 text-orange-500' :
        'bg-blue-500/20 text-blue-500'
      }`}>
        {issue.priority}
      </span>
      <button className="text-gray-500 hover:text-white transition-colors">
        <MoreHorizontal size={16} />
      </button>
    </div>
    
    <h4 className="font-medium text-gray-200 mb-2 group-hover:text-primary-400 transition-colors">
      {issue.title}
    </h4>
    
    <div className="flex items-center gap-3 mt-4 text-gray-500">
      <div className="flex items-center gap-1 text-[11px]">
        <Tag size={12} />
        {issue.labels?.[0] || 'Bug'}
      </div>
      <div className="flex items-center gap-1 text-[11px]">
        <MessageSquare size={12} />
        3
      </div>
      {issue.aiSummary && (
        <div className="ml-auto text-primary-500 animate-pulse">
          <Zap size={14} />
        </div>
      )}
    </div>
  </div>
);

const Column = ({ title, status, issues }) => (
  <div className="flex flex-col gap-4 w-80 shrink-0">
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest">{title}</h3>
        <span className="bg-dark-700 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
          {issues.length}
        </span>
      </div>
      <button className="text-gray-500 hover:text-white transition-colors">
        <Plus size={18} />
      </button>
    </div>
    
    <div className="flex flex-col gap-3 min-h-[500px]">
      {issues.map(issue => (
        <IssueCard key={issue._id} issue={issue} />
      ))}
      <button className="w-full py-3 border-2 border-dashed border-white/5 rounded-xl text-gray-600 hover:text-gray-400 hover:border-white/10 transition-all text-sm font-medium">
        + Add Card
      </button>
    </div>
  </div>
);

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data if API fails or for demo
  const mockIssues = [
    { _id: '1', title: 'Fix auth-service latency', status: 'Open', priority: 'High', aiSummary: 'Detected bottleneck in JWT verification', labels: ['Backend'] },
    { _id: '2', title: 'Update Docker base image', status: 'In Progress', priority: 'Medium', labels: ['DevOps'] },
    { _id: '3', title: 'Kubernetes pod crashing', status: 'Open', priority: 'Critical', aiSummary: 'OOM Killer triggered in gateway pod', labels: ['Infrastructure'] },
    { _id: '4', title: 'UI alignment on mobile', status: 'Resolved', priority: 'Low', labels: ['UI/UX'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Board</h1>
          <p className="text-gray-500 text-sm">Managing <span className="text-primary-500 font-medium">Nexus Core v2.0</span></p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 glass hover:bg-white/10 transition-all">
            <Filter size={18} />
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            Create Issue
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        <Column 
          title="Backlog" 
          status="Open" 
          issues={mockIssues.filter(i => i.status === 'Open')} 
        />
        <Column 
          title="In Progress" 
          status="In Progress" 
          issues={mockIssues.filter(i => i.status === 'In Progress')} 
        />
        <Column 
          title="Validation" 
          status="In Progress" 
          issues={[]} 
        />
        <Column 
          title="Resolved" 
          status="Resolved" 
          issues={mockIssues.filter(i => i.status === 'Resolved')} 
        />
      </div>
    </div>
  );
};

export default Issues;

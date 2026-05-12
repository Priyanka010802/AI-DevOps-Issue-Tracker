import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Folder, 
  Users, 
  Calendar, 
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock
} from 'lucide-react';
import API from '../api';

const ProjectCard = ({ project }) => (
  <div className="glass-card group hover:border-primary-500/50 transition-all duration-500">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
        <Folder size={24} />
      </div>
      <button className="text-gray-600 hover:text-white transition-colors">
        <MoreVertical size={20} />
      </button>
    </div>
    
    <h3 className="text-lg font-bold mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
    <p className="text-gray-500 text-sm line-clamp-2 mb-6">
      {project.description || 'No description provided for this neural grid project.'}
    </p>
    
    <div className="flex items-center gap-4 mb-6">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-900 bg-dark-700 flex items-center justify-center text-[10px] font-bold">
            U{i}
          </div>
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-dark-900 bg-primary-600 flex items-center justify-center text-[10px] font-bold">
          +5
        </div>
      </div>
      <span className="text-xs text-gray-600 flex items-center gap-1 font-bold uppercase tracking-widest">
        <Users size={12} />
        {project.members?.length || 0} Members
      </span>
    </div>
    
    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <Clock size={14} className="text-primary-500" />
        Updated 2h ago
      </div>
      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
        project.status === 'Active' ? 'bg-devops-green/10 text-devops-green' : 'bg-devops-yellow/10 text-devops-yellow'
      }`}>
        {project.status}
      </span>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/projects', newProject);
      setProjects([...projects, res.data]);
      setShowModal(false);
      setNewProject({ title: '', description: '' });
    } catch (err) {
      console.error('Failed to create project');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Registry</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and monitor all active neural nodes</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter nodes..." 
              className="bg-dark-800 border border-dark-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            />
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <Plus size={20} />
            New Node
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card h-64 animate-pulse">
              <div className="w-12 h-12 bg-dark-700 rounded-xl mb-6"></div>
              <div className="h-6 bg-dark-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-dark-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-dark-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
          
          {/* Empty State / Call to Action */}
          <button 
            onClick={() => setShowModal(true)}
            className="border-2 border-dashed border-dark-700 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary-500/50 hover:bg-primary-500/5 transition-all group min-h-[300px]"
          >
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={32} className="text-gray-600 group-hover:text-primary-500" />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Initialize New Node</p>
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg border-primary-500/30">
            <h2 className="text-xl font-bold mb-6">Initialize New Project Node</h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Node Identifier</label>
                <input 
                  type="text" 
                  required
                  className="input-field" 
                  placeholder="e.g. Project Phoenix"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mission Parameters</label>
                <textarea 
                  rows="4"
                  className="input-field resize-none" 
                  placeholder="Describe the scope of this project node..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl font-bold transition-all"
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20"
                >
                  Execute Initialization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Terminal, 
  Activity, 
  Settings, 
  ChevronLeft, 
  Folder 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        isActive 
          ? 'bg-primary-600/10 text-primary-500' 
          : 'text-gray-500 hover:bg-white/5 hover:text-white'
      }`
    }
  >
    <Icon size={20} className="transition-transform group-hover:scale-110" />
    <span className="font-bold text-sm">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="w-64 bg-dark-900 border-r border-white/5 flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
            <span className="text-white font-black italic text-xl">N</span>
          </div>
          <div>
            <h1 className="text-white font-black text-xl tracking-tighter">NEXUS</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">DevOps Neural OS</p>
          </div>
        </div>

        <nav className="space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={Folder} label="Projects" to="/projects" />
          <SidebarItem icon={Layers} label="Issue Board" to="/issues" />
          <SidebarItem icon={Terminal} label="AI Console" to="/ai-chat" />
          <SidebarItem icon={Activity} label="System Monitor" to="/monitor" />
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2">
        <div className="glass-card p-4 mb-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">System Load</p>
          <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden mb-1">
            <div className="w-[64%] h-full bg-devops-green animate-pulse"></div>
          </div>
          <div className="flex justify-between text-[8px] font-bold text-gray-600 uppercase">
            <span>Core A: 42%</span>
            <span>Core B: 89%</span>
          </div>
        </div>
        <SidebarItem icon={Settings} label="Settings" to="/settings" />
      </div>
    </aside>
  );
};

export default Sidebar;

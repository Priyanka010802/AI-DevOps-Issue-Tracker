import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Bell, Search, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-dark-800/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search issues, projects or logs..."
          className="w-full bg-dark-700/50 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="flex items-center gap-3 group cursor-pointer relative">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-200">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-blue-400 p-0.5">
            <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center">
              <User size={20} className="text-primary-500" />
            </div>
          </div>
          
          {/* Dropdown would go here */}
          <button 
            onClick={() => dispatch(logout())}
            className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

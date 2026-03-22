import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart2, Map, Clipboard, Settings, Bug, DollarSign, Users,
  Leaf, ChevronRight, Monitor, LogOut
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
    { name: 'My Fields', path: '/fields', icon: Map },
    { name: 'Inventory', path: '/inventory', icon: Clipboard },
    { name: 'Market', path: '/market', icon: DollarSign },
    { name: 'Forum', path: '/forum', icon: Users },
  ];

  const subItems = [
    { name: 'AI Pest ID', path: '/pest-id', icon: Bug },
    { name: 'Profile', path: '/profile', icon: Monitor },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="h-screen w-[280px] xl:w-[300px] min-w-[280px] bg-[#0b1e15] flex flex-col p-8 overflow-hidden relative z-50 shadow-[40px_0_100px_rgba(0,0,0,0.5)] border-r border-white/5 shrink-0">
      {/* 1. LAYER 1: HARVESTA BRANDING (DITTO MOCKUP 1) */}
      <div className="flex items-center gap-4 mb-12 px-2 group cursor-pointer">
         <div className="bg-[#1a3a2a] p-3 rounded-2xl group-hover:bg-emerald-600 transition-all duration-500 shadow-xl border border-white/10 group-hover:-rotate-12">
            <Leaf className="w-7 h-7 text-[#7be3a6] group-hover:text-white" />
         </div>
         <h1 className="text-2xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors uppercase italic">Harvesta</h1>
      </div>

      {/* 2. LAYER 2: NAVIGATION CATEGORIES */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 space-y-8">
        
        <div className="space-y-2">
          <p className="text-[#3e5a4a] text-[8px] font-black uppercase tracking-[0.4em] mb-4 pl-4 opacity-40">Management Center</p>
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group sidebar-link !px-5 !py-3 ${isActive ? 'active' : 'hover:bg-emerald-950/40 hover:text-emerald-50'}`
                }
              >
                <div className="flex items-center gap-3 flex-1">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="tracking-[0.15em] font-black text-[9px]">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[#3e5a4a] text-[8px] font-black uppercase tracking-[0.4em] mb-4 pl-4 opacity-40">Professional Modules</p>
          <div className="space-y-2">
            {subItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group sidebar-link !px-5 !py-3 ${isActive ? 'active' : 'hover:bg-emerald-950/40 hover:text-emerald-50'}`
                }
              >
                <div className="flex items-center gap-4 pl-2">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="tracking-[0.15em] font-black text-[9px] uppercase">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* 3. LAYER 3: PREMUIM PROFILE & CONNECTIVITY (BOTTOM) */}
      <div className="mt-auto pt-8 border-t border-white/5">
        <div className="glass-card !bg-[#152e22]/30 !rounded-2xl p-5 border border-white/5 hover:!bg-[#152e22]/50 transition-all cursor-pointer group flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="relative">
                 <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                    alt="Premium User" 
                    className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500/20 group-hover:border-emerald-400 transition-colors shadow-lg"
                 />
                 <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0b1e15] shadow-lg animate-pulse"></div>
               </div>
               <div className="flex flex-col">
                  <p className="font-black text-white text-xs tracking-tight uppercase italic underline underline-offset-2 decoration-emerald-500/30">
                    {user?.name || 'Harvesta User'}
                  </p>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1 truncate max-w-[145px]">
                    {user?.email || 'No Email'}
                  </p>
               </div>
            </div>
            <Settings className="w-5 h-5 text-[#3e5a4a] group-hover:text-emerald-400 group-hover:rotate-45 transition-all" />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full mt-4 bg-[#1a3a2a] hover:bg-[#2e5e40] text-white py-3 px-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        {/* Global Grid Status like Mockup 1 Bottom Sidebar */}
        <div className="mt-8 flex items-center justify-between text-[11px] font-bold text-[#3e5a4a] px-5 opacity-40 tracking-widest uppercase">
           <div className="flex items-center gap-3">
              <Monitor className="w-4 h-4" />
              <span>Global Node Connected</span>
           </div>
           <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Sidebar background abstract effect */}
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
    </aside>
  );
};

export default Sidebar;

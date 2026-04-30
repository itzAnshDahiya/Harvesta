import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, Package, TrendingUp, Users, Bug, User,
  Leaf, LogOut, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'My Fields', path: '/fields', icon: Map },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Market', path: '/market', icon: TrendingUp },
  { name: 'Forum', path: '/forum', icon: Users },
  { name: 'AI Pest ID', path: '/pest-id', icon: Bug },
  { name: 'Profile', path: '/profile', icon: User },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <Motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen flex flex-col py-6 px-3 relative z-50 shrink-0 overflow-hidden border-r"
      style={{ background: 'rgba(5,13,10,0.95)', borderColor: 'rgba(74,222,128,0.08)' }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shrink-0 shadow-lg shadow-green-900/30">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <Motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-lg font-bold tracking-tight text-white whitespace-nowrap"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Harvesta
            </Motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <Motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                  className="whitespace-nowrap text-[13px]"
                >
                  {item.name}
                </Motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* User Card */}
      <div className="mt-auto pt-4 border-t space-y-3" style={{ borderColor: 'rgba(74,222,128,0.08)' }}>
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'H'}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Farmer'}</p>
                <p className="text-[10px] text-emerald-400/60 truncate">{user?.email || ''}</p>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-medium transition-all hover:bg-red-500/10 text-red-400/60 hover:text-red-400"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button onClick={() => setCollapsed(!collapsed)}
        className="absolute top-7 -right-3 w-6 h-6 rounded-full bg-[#0a1a12] border flex items-center justify-center hover:bg-emerald-900/40 transition-colors z-50"
        style={{ borderColor: 'rgba(74,222,128,0.15)' }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3 text-emerald-400" /> : <ChevronLeft className="w-3 h-3 text-emerald-400" />}
      </button>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
    </Motion.aside>
  );
};

export default Sidebar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/common/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import MarketPrices from './pages/MarketPrices';
import CommunityForum from './pages/CommunityForum';
import PestId from './pages/PestId';
import DroneMap from './pages/DroneMap';
import Profile from './pages/Profile';
import useAuthStore from './store/authStore';

/* Floating particles background */
const Particles = () => (
  <div className="aurora-bg">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="particle" style={{
        left: `${Math.random() * 100}%`,
        animationDuration: `${8 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 10}s`,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
      }} />
    ))}
  </div>
);

function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  if (!token || !user) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const hasFetched = React.useRef(false);
  const showSidebar = token && user && location.pathname !== '/login';

  React.useEffect(() => {
    if (token && !user && !hasFetched.current) {
      hasFetched.current = true;
      fetchMe();
    }
    if (!token) hasFetched.current = false;
  }, [token, user, fetchMe]);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Particles />
      {showSidebar && <Sidebar />}
      <main className="relative flex-1 min-w-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={token && user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/fields" element={<ProtectedRoute><DroneMap /></ProtectedRoute>} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/market" element={<ProtectedRoute><MarketPrices /></ProtectedRoute>} />
            <Route path="/forum" element={<ProtectedRoute><CommunityForum /></ProtectedRoute>} />
            <Route path="/pest-id" element={<ProtectedRoute><PestId /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

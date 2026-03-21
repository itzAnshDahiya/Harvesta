import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import MarketPrices from './pages/MarketPrices';
import CommunityForum from './pages/CommunityForum';
import PestId from './pages/PestId';
import DroneMap from './pages/DroneMap';
import Profile from './pages/Profile';
import useAuthStore from './store/authStore';

function AppLayout() {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const hasRequestedUser = React.useRef(false);
  const showSidebar = token && user && location.pathname !== '/login';

  React.useEffect(() => {
    if (!token) {
      hasRequestedUser.current = false;
      return;
    }

    if (!user && !hasRequestedUser.current) {
      hasRequestedUser.current = true;
      fetchMe();
    }
  }, [token, user, fetchMe]);

  return (
    <div className="flex min-h-screen w-full bg-[#051109] text-[#1a3a2a] font-sans overflow-hidden">
      {showSidebar ? <Sidebar /> : null}

      <div className="relative min-w-0 flex-1 overflow-y-auto no-scrollbar">
        <Routes>
          <Route path="/login" element={token && user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/" element={token && user ? <Dashboard /> : <Login />} />
          <Route
            path="/dashboard"
            element={token && user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/inventory"
            element={token && user ? <Inventory /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/market"
            element={token && user ? <MarketPrices /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/forum"
            element={token && user ? <CommunityForum /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/pest-id"
            element={token && user ? <PestId /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/fields"
            element={token && user ? <DroneMap /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={token && user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to={token && user ? '/' : '/login'} replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

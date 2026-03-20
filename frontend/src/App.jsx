import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import MarketPrices from './pages/MarketPrices';
import CommunityForum from './pages/CommunityForum';
import PestId from './pages/PestId';
import DroneMap from './pages/DroneMap';
import useAuthStore from './store/authStore';

function AppLayout() {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const showSidebar = token && location.pathname !== '/login';

  React.useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token, fetchMe]);

  return (
    <div className="flex h-screen bg-[#051109] text-[#1a3a2a] font-sans overflow-hidden w-screen">
      {showSidebar ? <Sidebar /> : null}

      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <CommunityForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pest-id"
            element={
              <ProtectedRoute>
                <PestId />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fields"
            element={
              <ProtectedRoute>
                <DroneMap />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
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

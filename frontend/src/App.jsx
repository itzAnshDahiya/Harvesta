import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import MarketPrices from './pages/MarketPrices';
import CommunityForum from './pages/CommunityForum';
import PestId from './pages/PestId';
import DroneMap from './pages/DroneMap';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#051109] text-[#1a3a2a] font-sans overflow-hidden h-screen w-screen">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/market" element={<MarketPrices />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/pest-id" element={<PestId />} />
            <Route path="/fields" element={<DroneMap />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

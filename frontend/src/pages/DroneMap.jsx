import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, Eye, Battery, Navigation } from 'lucide-react';

const DroneMap = () => {
  return (
    <div className="relative z-10 w-full h-full p-4 overflow-y-auto custom-scrollbar">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-emerald-50 tracking-tight">Drone Mapping</h1>
          <p className="text-emerald-200/80 mt-2">Live feed and field topographical analysis</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl transition shadow-lg flex items-center gap-2">
          <Navigation className="w-5 h-5"/> Launch Drone
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Main Map Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-panel p-2 bg-black/40 border-emerald-500/20 rounded-2xl relative overflow-hidden h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1590496735165-4be4b611dbfb?q=80&w=1200&auto=format&fit=crop" 
            alt="Drone Map" 
            className="w-full h-full object-cover rounded-xl opacity-80"
          />
          {/* Mock Overlays */}
          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur border border-white/10 p-3 rounded-lg text-white font-mono text-sm flex gap-4">
            <span className="flex items-center gap-2 text-emerald-400"><Battery className="w-4 h-4"/> 87%</span>
            <span className="flex items-center gap-2 text-blue-400"><Eye className="w-4 h-4"/> 4K Feed</span>
            <span>ALT: 120m</span>
          </div>
          
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="w-48 h-48 border border-emerald-500/50 rounded-full animate-ping opacity-20"></div>
          </div>
        </motion.div>

        {/* Info Area */}
        <div className="space-y-6 flex flex-col h-full">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 bg-emerald-900/40 border-emerald-500/20 flex-1"
          >
            <h3 className="text-xl font-bold text-emerald-50 mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-400" /> Waypoints
            </h3>
            <div className="space-y-3">
              <div className="bg-black/30 p-3 rounded-lg text-emerald-100 flex justify-between">
                <span>Sector A (Corn)</span>
                <span className="text-emerald-400 text-sm">Scanned</span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg text-emerald-100 flex justify-between border border-emerald-500">
                <span>Sector B (Wheat)</span>
                <span className="text-yellow-400 text-sm animate-pulse">Scanning...</span>
              </div>
              <div className="bg-black/30 p-3 rounded-lg text-emerald-100 flex justify-between opacity-50">
                <span>Sector C (Soybean)</span>
                <span className="text-white text-sm">Queued</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DroneMap;

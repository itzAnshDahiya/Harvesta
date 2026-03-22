import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Package, Plus, Search, Filter, ArrowUpRight, ArrowDownRight, Droplets, Sprout, Hammer } from 'lucide-react';

const Inventory = () => {
  const inventoryItems = [
    { id: 'I-1024', name: 'Organic NPK Fertilizer', category: 'Fertilizers', stock: '850kg', status: 'Optimal', trend: 'up', icon: Droplets, color: 'emerald' },
    { id: 'I-1025', name: 'Arctic Lettuce Seeds', category: 'Seeds', stock: '12,000 units', status: 'Warning', trend: 'down', icon: Sprout, color: 'orange' },
    { id: 'I-1026', name: 'Irrigation Pump v2', category: 'Equipment', stock: '4 units', status: 'In Repair', trend: 'none', icon: Hammer, color: 'blue' },
    { id: 'I-1027', name: 'Potassium Booster', category: 'Supplements', stock: '200kg', status: 'Optimal', trend: 'up', icon: Droplets, color: 'emerald' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#051109] text-[#1a3a2a] p-6 font-sans overflow-y-auto no-scrollbar">
      <div className="fixed inset-0 z-0 topo-pattern opacity-10 pointer-events-none" />

         <Motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6"
      >
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">Inventory Control</h1>
          <p className="text-[#a3b8ad] text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Asset & Stock Management System</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1e15] py-3 px-8 rounded-full font-black uppercase text-[9px] tracking-widest shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Register New Asset
        </button>
      </Motion.header>

      <div className="relative z-10 grid grid-cols-12 gap-6 items-start pb-12">
        
        {/* Left Stats Block */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
                <Motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glass-card !bg-white/95 p-8 shadow-2xl !rounded-2xl"
           >
              <div className="relative mb-8">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5a4a] opacity-40" />
                 <input 
                   type="text" 
                   placeholder="SEARCH ASSET" 
                   className="w-full bg-[#f2f6f3] border-none rounded-2xl py-3 pl-12 pr-4 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none"
                 />
              </div>

              <div className="space-y-6">
                 <p className="text-[9px] font-black uppercase text-[#3e5a4a] opacity-40 tracking-[0.4em] border-b border-black/5 pb-3">Real-time Stock Health</p>
                 <div className="flex gap-3">
                    <div className="flex-1 bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center gap-2">
                       <Package className="w-6 h-6 text-emerald-600 mb-1" />
                       <span className="text-2xl font-black text-[#1a3a2a]">1,420</span>
                       <span className="text-[8px] font-black uppercase text-emerald-700">Active SKU</span>
                    </div>
                    <div className="flex-1 bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col items-center gap-2">
                       <Filter className="w-6 h-6 text-orange-600 mb-1" />
                       <span className="text-2xl font-black text-[#1a3a2a]">12</span>
                       <span className="text-[8px] font-black uppercase text-orange-700">Low Stock</span>
                    </div>
                 </div>
              </div>
           </Motion.div>
        </div>

        {/* Assets table */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                <Motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="glass-card !bg-white/95 p-8 shadow-2xl !rounded-2xl"
           >
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black text-[#1a3a2a] uppercase italic tracking-tighter">Current Stock Assets</h2>
                 <div className="bg-[#f2f6f3] py-2 px-6 rounded-2xl text-[9px] font-black flex items-center gap-2 border border-black/5 text-[#1a3a2a] cursor-pointer hover:bg-white transition shadow-sm">
                    <Filter className="w-3 h-3" /> <span>FILTER BY: CATEGORY</span>
                 </div>
              </div>

              <div className="space-y-4">
                 {inventoryItems.map((item, i) => (
                   <div key={i} className="flex flex-col sm:flex-row justify-between items-center group cursor-pointer p-6 hover:bg-[#f2f6f3] rounded-[2.5rem] transition-all border border-transparent hover:border-black/5 gap-8">
                      <div className="flex items-center gap-8 flex-1 min-w-0">
                         <div className={`p-5 rounded-2xl bg-white shadow-xl border border-black/5 shrink-0 group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                         </div>
                         <div className="min-w-0 truncate">
                            <p className="text-[10px] font-black text-emerald-400 mb-1">{item.id}</p>
                            <p className="text-xl font-black text-[#1a3a2a] truncate uppercase">{item.name}</p>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-16 pr-8">
                         <div className="text-right">
                            <p className="text-[9px] font-black uppercase text-[#3e5a4a] opacity-30 mb-1">Stock Level</p>
                            <p className="text-2xl font-black text-[#1a3a2a]">{item.stock}</p>
                         </div>
                         <div className="flex flex-col items-center sm:items-end min-w-[100px]">
                            <p className="text-[9px] font-black uppercase text-[#3e5a4a] opacity-30 mb-1">Status</p>
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${item.status === 'Optimal' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]'}`}></div>
                               <span className="text-[11px] font-black text-[#1a3a2a] uppercase tracking-widest">{item.status}</span>
                            </div>
                         </div>
                      </div>

                      <div className="bg-[#1a3a2a] p-4 rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shrink-0">
                         {item.trend === 'up' ? <ArrowUpRight className="w-5 h-5 text-emerald-400" /> : <ArrowDownRight className="w-5 h-5 text-orange-400" />}
                      </div>
                   </div>
                 ))}
              </div>
                </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

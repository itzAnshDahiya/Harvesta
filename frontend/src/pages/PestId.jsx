import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Bug, Camera, Zap, ShieldAlert, Eye } from 'lucide-react';

const PestId = () => {
  const recentDetections = [
    { name: 'Downy Mildew (Lettuce)', confidence: '99.4%', status: 'Infected', action: 'Immediate fungicide needed' },
    { name: 'Common Aphid', confidence: '82.1%', status: 'Minor', action: 'Biocontrol release recommended' },
    { name: 'Tomato Early Blight', confidence: '94.2%', status: 'Warning', action: 'Isolate affected rows' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#051109] text-[#1a3a2a] p-6 font-sans overflow-y-auto no-scrollbar">
      <div className="fixed inset-0 z-0 topo-pattern opacity-10 pointer-events-none" />

         <Motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col gap-3 mb-8"
      >
         <div className="flex items-center gap-3 text-emerald-400 font-black text-[10px] tracking-[0.5em] uppercase opacity-60">
            <Zap className="w-4 h-4" /> AI Diagnostic Neural Lab
         </div>
         <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase italic leading-none">Pest & Pathogen Analysis</h1>
         <p className="text-[#a3b8ad] text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Automated Visual Recognition & Treatment Protocols</p>
      </Motion.header>

      <div className="relative z-10 grid grid-cols-12 gap-6 items-start pb-12">
        
        {/* Main Scanner Section */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
                <Motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="glass-card !bg-white/95 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col"
           >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-black/5 pb-6">
                 <h2 className="text-xl font-black text-[#1a3a2a] uppercase italic tracking-tighter">Diagnostic Scanner</h2>
                 <div className="bg-[#1a3a2a] py-2 px-5 rounded-2xl text-[8px] font-black text-white flex items-center gap-2 uppercase shadow-lg shrink-0">
                    <ShieldAlert className="w-3 h-3 text-emerald-400" />
                    <span>Model v3.04 (Active)</span>
                 </div>
              </div>
              
              <div className="flex-1 border-[3px] border-dashed border-[#1a3a2a]/10 rounded-[3rem] flex flex-col items-center justify-center p-10 sm:p-20 bg-[#f8faf8] group hover:border-emerald-500/40 transition-all cursor-pointer relative overflow-hidden">
                 <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="bg-[#1a3a2a] p-8 rounded-full text-white shadow-2xl group-hover:scale-110 transition-transform">
                       <Camera className="w-12 h-12" />
                    </div>
                    <div className="text-center space-y-2">
                       <h3 className="text-xl sm:text-2xl font-black text-[#1a3a2a] uppercase italic tracking-tighter">Drag Field Image Here</h3>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a] opacity-40 leading-relaxed max-w-sm mx-auto">Upload a high-resolution macro shot for deep neural analysis.</p>
                    </div>
                    <button className="bg-[#1a3a2a] text-white py-4 px-12 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-emerald-900 transition-colors">Select From Cloud Drive</button>
                 </div>
                 <Motion.div 
                    animate={{ y: ['100%', '-100%'] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-emerald-500/30 blur-[4px] pointer-events-none z-20 group-hover:opacity-100 opacity-0"
                 />
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-black/5 text-center">
                 <div>
                    <p className="text-[10px] font-black uppercase text-[#3e5a4a] opacity-40 mb-2 tracking-widest">Model Precision</p>
                    <p className="text-xl sm:text-3xl font-black text-[#1a3a2a] italic lowercase tracking-tighter">99.8%</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-[#3e5a4a] opacity-40 mb-2 tracking-widest">Latency</p>
                    <p className="text-xl sm:text-3xl font-black text-[#1a3a2a] italic lowercase tracking-tighter">142ms</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-[#3e5a4a] opacity-40 mb-2 tracking-widest">Species</p>
                    <p className="text-xl sm:text-3xl font-black text-[#1a3a2a] italic lowercase tracking-tighter">14k</p>
                 </div>
              </div>
           </Motion.div>
        </div>

        {/* Right Sidebar Block: Recent Detections */}
        <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
                <Motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glass-card !bg-white/95 p-8 shadow-2xl space-y-6"
           >
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                 <h3 className="text-lg font-black tracking-tighter italic uppercase text-[#1a3a2a]">Historical Analysis</h3>
                 <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4">
                {recentDetections.map((d, i) => (
                  <div key={i} className="flex gap-5 group cursor-pointer hover:bg-[#f2f6f3] p-3 rounded-2xl transition-all">
                     <div className="bg-white p-3 rounded-xl shadow-sm border border-black/5 h-16 w-16 flex items-center justify-center relative overflow-hidden shrink-0 group-hover:bg-emerald-50 transition">
                        <Bug className={`w-8 h-8 ${d.status === 'Infected' ? 'text-red-600' : 'text-orange-500'}`} />
                     </div>
                     <div className="flex-1 space-y-0.5 border-r border-black/5 pr-4 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-base font-black text-[#1a3a2a] italic tracking-tighter uppercase truncate">{d.name}</p>
                          <span className={`text-[8px] font-black uppercase shrink-0 py-0.5 px-2 rounded-full border ${d.status === 'Infected' ? 'text-red-600 border-red-100 bg-red-50' : 'text-orange-600 border-orange-100 bg-orange-50'}`}>{d.status}</span>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#3e5a4a] opacity-40 mb-2 truncate">Confidence: {d.confidence}</p>
                        <p className="text-[10px] font-bold text-[#1a3a2a]/60 leading-tight uppercase line-clamp-2">{d.action}</p>
                     </div>
                  </div>
                ))}
              </div>
           </Motion.div>

           <Motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card !bg-[#0b1e15] p-10 shadow-2xl overflow-hidden relative group"
           >
              <div className="flex justify-between items-start text-white relative z-10">
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Grid Health Check</h3>
                    <div className="flex items-center gap-4">
                       <div className="bg-[#1a3a2a] p-3 rounded-xl shadow-xl flex items-center justify-center border border-white/5">
                          <Eye className="w-6 h-6 text-emerald-400" />
                       </div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100/60 max-w-[150px] leading-relaxed italic border-l border-white/5 pl-4">All visual nodes report zero biological anomalies.</p>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                <ShieldAlert className="w-32 h-32 text-emerald-500" />
              </div>
                </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default PestId;

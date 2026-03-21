import React from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  ArrowLeft, Bookmark, Bell, CloudRain, Sun, Droplets, Calendar,
  MapPin, CheckCircle2, Sprout, Bug, Zap, Thermometer, Wind, CloudSun
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area
} from 'recharts';

const chartData = [
  { name: 'Jun', value: 30 }, { name: 'Nov', value: 45 }, { name: 'Feb', value: 35 },
  { name: 'Mar', value: 55 }, { name: 'Apr', value: 70 }, { name: 'May', value: 65 },
];

const Dashboard = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#051109] text-[#1a3a2a] p-6 font-sans overflow-x-hidden overflow-y-auto no-scrollbar">
      {/* BACKGROUND ELEMENTS */}
      <div 
        className="fixed inset-0 z-0 scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.7) contrast(1.2)'
        }}
      />
      <div className="fixed inset-0 z-[1] topo-pattern opacity-20 pointer-events-none" />
      
      {/* DASHBOARD CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto space-y-6">
        
        {/* TOP STATUS BAR */}
        <Motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full glass-card p-5 flex items-center justify-between shadow-2xl backdrop-blur-3xl bg-white/95"
        >
          <div className="flex items-center gap-8">
            <div className="bg-[#f2f6f3]/80 p-4 rounded-full text-[#1a3a2a] shadow-inner hover:scale-105 transition-transform cursor-pointer border border-black/5">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Field 01</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 mr-6 pr-6 border-r border-black/5">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase text-emerald-600 opacity-70">Connectivity</span>
                  <span className="text-xs font-black tracking-widest">HRVST-GRID-LIVE</span>
                </div>
                <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                   <Zap className="w-5 h-5" />
                </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-[#f2f6f3] p-4 rounded-full border border-black/5 shadow-sm hover:bg-white transition flex items-center justify-center"><Bookmark className="w-5 h-5" /></div>
              <div className="bg-[#f2f6f3] p-4 rounded-full border border-black/5 shadow-sm hover:bg-white transition flex items-center justify-center relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="relative cursor-pointer ml-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-14 h-14 rounded-full border-2 border-white shadow-xl object-cover"
                />
              </div>
            </div>
          </div>
        </Motion.div>

        {/* DASHBOARD CONTENT GRID */}
        <div className="relative z-10 grid grid-cols-12 gap-5 items-start">
          
          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-3 flex flex-col gap-5 h-full">
            <Motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="glass-card p-6 flex items-center justify-between gap-4"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border-2 border-[#1a3a2a]/20 flex items-center justify-center shrink-0">
                     <div className="w-4 h-4 border border-[#1a3a2a]"></div>
                  </div>
                  <p className="text-[10px] font-black uppercase text-[#3e5a4a] opacity-60">Size: 150 ha</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#3e5a4a] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-[#1a3a2a] truncate">Sacramento, CA</p>
                    <p className="text-[10px] font-bold text-emerald-600 underline cursor-pointer">Live Satellite</p>
                  </div>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=200" className="w-20 h-16 rounded-xl object-cover shadow-md border-2 border-white shrink-0" alt="Field" />
            </Motion.div>

            <Motion.div 
              initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="glass-card p-6 space-y-5"
            >
              <h2 className="text-lg font-black text-[#1a3a2a] uppercase tracking-tighter">Soil Content</h2>
              <div className="space-y-4">
                {[{l:'pH',v:'6.8',p:70}, {l:'Nitrogen',v:'80mg',p:82}, {l:'Phosphorus',v:'45mg',p:60}, {l:'Potassium',v:'100mg',p:75}].map(s => (
                  <div key={s.l}>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-1"><span>{s.l}</span><span>{s.v}</span></div>
                    <div className="w-full h-1.5 bg-emerald-50 rounded-full"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${s.p}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-black/5 h-24 min-h-[96px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <Area type="monotone" dataKey="value" stroke="#4db67e" fill="#d1fae5" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Motion.div>

            <Motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="glass-card p-5 space-y-3"
            >
              <h2 className="text-base font-black text-[#1a3a2a] uppercase truncate">Crop Recommendation</h2>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=200" className="h-16 w-16 rounded-2xl object-cover shrink-0" alt="Crop" />
                <div className="min-w-0">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase truncate block mb-1">Lettuce Premium</span>
                  <p className="text-[9px] font-bold text-[#3e5a4a] opacity-60 leading-tight">Ideal window: +12 days</p>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="col-span-12 xl:col-span-6 flex flex-col gap-5 min-h-[600px]">
             <Motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-8 flex-1 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative z-10"
            >
              <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-6">
                <div>
                  <h2 className="text-2xl font-black text-[#1a3a2a] tracking-tight uppercase italic">Crop Lifecycle Analysis</h2>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Active Stage: Vegetative</p>
                </div>
                <div className="bg-[#f2f6f3] py-3 px-6 rounded-2xl text-[10px] font-black flex items-center gap-3 border border-black/5">
                   <Calendar className="w-4 h-4" /> <span>June 2026</span>
                </div>
              </div>

              <div className="space-y-6 flex-1 overflow-hidden">
                <div className="grid grid-cols-12 text-[9px] font-black text-[#3e5a4a] opacity-40 uppercase tracking-[0.3em] pb-4 border-b border-black/5">
                  <span className="col-span-3">Activity</span>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'Jan', 'Feb'].map((m, idx) => <span key={`${m}-${idx}`} className="text-center">{m}</span>)}
                </div>

                {[
                  { name: 'Planting', c: '#4db67e', s: 2, w: 4, i: Sprout },
                  { name: 'Fertilization', c: '#9067c6', s: 4, w: 3, i: Droplets },
                  { name: 'Irrigation', c: '#4da6d8', s: 5, w: 5, i: Droplets },
                  { name: 'AI Pest Check', c: '#e87461', s: 6, w: 4, i: Bug },
                  { name: 'Harvest', c: '#d9a64e', s: 8, w: 3, i: Sun },
                ].map((task, i) => (
                  <div key={i} className="grid grid-cols-12 items-center h-12">
                    <div className="col-span-3 flex items-center gap-2 pr-2">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white border border-black/5 shadow-sm shrink-0">
                         <task.i className="w-4 h-4 text-[#1a3a2a]" />
                      </div>
                      <span className="text-[9px] font-black text-[#1a3a2a] uppercase truncate leading-none">{task.name}</span>
                    </div>
                    <div className="col-span-9 relative h-8 w-full bg-emerald-50/20 rounded-full flex items-center px-1">
                       <Motion.div 
                          initial={{ width: 0 }} animate={{ width: `${(task.w/10)*100}%` }} 
                          style={{ left: `${(task.s/10)*100}%`, backgroundColor: task.c }}
                          className="absolute h-6 rounded-full px-2 flex items-center shadow-lg truncate"
                        >
                          <span className="text-[8px] font-black text-white whitespace-nowrap tracking-tighter uppercase px-2">{task.name}</span>
                        </Motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                <button className="bg-[#1a3a2a] text-white text-[10px] font-black py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform uppercase tracking-widest shrink-0">
                  Request Support
                </button>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      <span className="text-[10px] font-black text-[#1a3a2a] uppercase">LIVE SYNC ACTIVE</span>
                   </div>
                   <p className="text-[9px] font-black text-[#3e5a4a] opacity-30 uppercase tracking-widest">System Nominal v2.04</p>
                </div>
              </div>
            </Motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-3 flex flex-col gap-5 h-full">
            <Motion.div 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              className="glass-card !bg-white/70 p-8 flex flex-col items-center relative overflow-hidden group min-h-[400px]"
            >
               <div className="bg-white p-6 rounded-[2.5rem] shadow-xl mb-6 border border-white group-hover:rotate-12 transition-transform">
                  <CloudRain className="w-12 h-12 text-[#4da6d8]" />
               </div>
               <p className="text-xl font-black text-[#4da6d8] uppercase tracking-widest mb-1">Rainy</p>
               <h2 className="text-7xl font-black text-[#1a3a2a] tracking-tighter mb-8">14°C</h2>
               
               <div className="w-full space-y-6">
                 <div className="flex justify-between items-center bg-white/40 p-4 rounded-3xl border border-white/20 shadow-inner">
                   {['M','T','W','T','F'].map((day, idx) => (
                     <div key={`${day}-${idx}`} className="flex flex-col items-center gap-2">
                       <span className="text-[9px] font-black text-[#3e5a4a] opacity-40">{day}</span>
                       <CloudRain className="w-4 h-4 text-[#4da6d8]" />
                       <span className="text-[10px] font-black">18°</span>
                     </div>
                   ))}
                 </div>
                 <div className="text-center">
                   <p className="text-sm font-black text-[#1a3a2a] uppercase italic">Precipitation Alert</p>
                   <p className="text-[9px] font-medium text-[#3e5a4a] opacity-50 mt-1 uppercase tracking-widest">Sector A monitor active</p>
                 </div>
               </div>
            </Motion.div>

            <Motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex-1 glass-card overflow-hidden relative group min-h-[200px]"
            >
              <img src="https://images.unsplash.com/photo-1549474843-078bc16fc2ca?q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Abundance" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1e15] to-transparent p-6 flex flex-col justify-end">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="bg-emerald-500 p-2 rounded-lg text-white"><CheckCircle2 className="w-4 h-4" /></div>
                   <h3 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Abundance</h3>
                 </div>
                 <p className="text-emerald-100 text-[10px] font-medium leading-relaxed opacity-70 border-l border-emerald-500/50 pl-4">Target sector A: ACHIEVED.</p>
              </div>
            </Motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <Motion.div 
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="glass-card !bg-white/95 p-10 grid grid-cols-12 gap-10 shadow-2xl relative"
        >
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center gap-8">
             <div className="flex items-center gap-5">
                <div className="bg-[#1a3a2a] p-4 rounded-3xl text-emerald-400 shadow-xl"><Zap className="w-10 h-10" /></div>
                <div>
                   <h3 className="text-3xl font-black text-[#1a3a2a] tracking-tight uppercase italic">Yield Optimization</h3>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 opacity-60">Fleet Sync: Sector 01</p>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-6">
                {[ 
                  { l: 'Irrigation', v: '98.4%', i: Droplets, c: 'blue' },
                  { l: 'Pest Density', v: '0.04', i: Bug, c: 'orange' },
                  { l: 'UV Exposure', v: 'Idx 6', i: Sun, c: 'yellow' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-emerald-50/50 p-6 rounded-[2rem] border border-black/5 hover:bg-white transition-all shadow-sm">
                     <item.i className={`w-6 h-6 mb-4 text-${item.c}-600`} />
                     <p className="text-3xl font-black text-[#1a3a2a] mb-1">{item.v}</p>
                     <p className="text-[10px] font-black uppercase opacity-40">{item.l}</p>
                  </div>
                ))}
             </div>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center bg-[#f8faf8] p-10 rounded-[3rem] border border-black/5 gap-6">
                <p className="text-lg font-black text-[#1a3a2a] uppercase italic leading-tight">AI Expert Insight</p>
                <div className="p-5 bg-white rounded-2xl border border-black/5 shadow-inner">
                   <p className="text-[11px] font-medium text-[#3e5a4a] italic leading-relaxed">"System predicts a +15% biomass spike in Sector B. Optimal conditions detected."</p>
                </div>
                <button className="w-full bg-[#1a3a2a] text-white py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-950 shadow-xl">Apply Settings</button>
          </div>
        </Motion.div>

        {/* SYSTEM STATUS FOOTER */}
        <div className="w-full glass-card !bg-[#0b1e15] !rounded-full py-6 px-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border-white/5">
           <div className="flex gap-10 items-center">
              <div className="flex items-center gap-4 text-emerald-100">
                 <Thermometer className="w-5 h-5 text-emerald-400" />
                 <div className="flex flex-col"><span className="text-[9px] font-black uppercase opacity-40">Soil</span><span className="text-xs font-black">21.5°C</span></div>
              </div>
              <div className="flex items-center gap-4 text-emerald-100">
                 <Wind className="w-5 h-5 text-emerald-400" />
                 <div className="flex flex-col"><span className="text-[9px] font-black uppercase opacity-40">Wind</span><span className="text-xs font-black">12.4 km/h</span></div>
              </div>
              <div className="flex items-center gap-4 text-emerald-100/60 border-l border-white/10 pl-10 h-8">
                 <CloudSun className="w-5 h-5 text-emerald-400" />
                 <p className="text-[11px] font-black uppercase tracking-widest">Global Field Sync</p>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <span className="text-xs font-black text-emerald-50 uppercase italic group flex items-center gap-3">
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div> Systems Nominal
              </span>
              <p className="text-[10px] font-black text-emerald-100/40 uppercase tracking-widest ml-4">Sync: 21:05 PM</p>
           </div>
        </div>

      </div>

      <div className="fixed -top-40 -left-60 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] pointer-events-none" />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { motion as Motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Globe, Target, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const marketData = [
  { name: '08:00', price: 420 }, { name: '10:00', price: 435 }, { name: '12:00', price: 430 },
  { name: '14:00', price: 450 }, { name: '16:00', price: 445 }, { name: '18:00', price: 460 },
];

const MarketPrices = () => {
  const commodities = [
    { name: 'Lettuce (Premium Organic)', price: '$4.20', change: '+12.4%', trend: 'up', vol: '1.2M units' },
    { name: 'Red Cabbage', price: '$2.80', change: '-4.2%', trend: 'down', vol: '850K units' },
    { name: 'Soybean Futures', price: '$14.15', change: '+2.1%', trend: 'up', vol: '4.5M contracts' },
    { name: 'Corn (Industrial)', price: '$6.50', change: '+8.7%', trend: 'up', vol: '15.2M bushels' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#051109] text-[#1a3a2a] p-10 font-sans overflow-y-auto no-scrollbar">
      <div className="fixed inset-0 z-0 topo-pattern opacity-10 pointer-events-none" />

         <Motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-8"
      >
        <div className="space-y-4 flex-1 min-w-0">
          <div className="flex items-center gap-4 text-emerald-400 font-black text-[11px] tracking-[0.5em] uppercase opacity-60">
             <Globe className="w-5 h-5" /> Global Commodity Terminal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white uppercase italic truncate">Market Exchange</h1>
          <p className="text-[#a3b8ad] text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Trading & Arbitrage Analytics</p>
        </div>
        <div className="bg-[#1a3a2a] p-6 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col items-center gap-2 group cursor-pointer hover:bg-emerald-900 transition-colors shrink-0">
           <p className="text-[10px] font-black uppercase text-emerald-400 opacity-60">Total Portfolio</p>
           <h3 className="text-2xl sm:text-3xl font-black text-white">$142,480</h3>
        </div>
      </Motion.header>

      <div className="relative z-10 grid grid-cols-12 gap-8 items-start pb-20">
        
        {/* Main Terminal Area */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
                <Motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="glass-card p-10 !bg-[#0b1e15]/95 shadow-2xl border-white/10 flex flex-col min-h-[500px]"
           >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-10 mb-12 border-b border-white/5 pb-8">
                 <div className="flex-1 min-w-0">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter italic uppercase mb-2 leading-none">Lettuce Index (LTX)</h2>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">+12.4% PERFORMANCE OVER 24H</p>
                 </div>
                 <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/5 shrink-0 h-12 items-center">
                    {['1H', '4H', '1D', '1W', '1M'].map(t => (
                      <button key={t} className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${t === '1D' ? 'bg-emerald-500 text-white shadow-lg' : 'text-emerald-100/40 hover:text-white'}`}>{t}</button>
                    ))}
                 </div>
              </div>
              
              <div className="flex-1 w-full mx-auto pb-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData}>
                       <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={5} fill="url(#colorPrice)" />
                       <XAxis dataKey="name" hide />
                       <Tooltip contentStyle={{ backgroundColor: '#051109', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', color: '#fff' }} itemStyle={{ color: '#10b981', fontWeight: 'black' }} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center pt-8 border-t border-white/5">
                 <div>
                    <p className="text-[10px] font-black uppercase text-emerald-400/40 mb-2">High 24h</p>
                    <p className="text-xl sm:text-2xl font-black text-white italic">$462.40</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-emerald-400/40 mb-2">Low 24h</p>
                    <p className="text-xl sm:text-2xl font-black text-white italic">$415.80</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-emerald-400/40 mb-2">Volume</p>
                    <p className="text-xl sm:text-2xl font-black text-white italic">1.2M Units</p>
                 </div>
              </div>
           </Motion.div>
        </div>

        {/* Live Feed Sidebar */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
                <Motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="glass-card !bg-white/95 p-12 shadow-2xl flex flex-col gap-10 !rounded-[3rem]"
           >
              <div className="flex justify-between items-center border-b border-black/5 pb-8">
                 <h3 className="text-xl font-black tracking-tighter italic uppercase text-[#1a3a2a]">Live Feed Terminal</h3>
                 <div className="h-3 w-3 bg-red-500 rounded-full animate-ping shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
              </div>
              
              <div className="space-y-4">
                 {commodities.map((c, i) => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer p-4 hover:bg-[#f2f6f3] rounded-[2rem] transition-all border border-transparent hover:border-black/5 gap-6">
                      <div className="flex items-center gap-5 min-w-0">
                         <div className={`p-3 rounded-xl ${c.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'} shadow-sm border border-black/5 shrink-0`}>
                            {c.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                         </div>
                         <div className="min-w-0">
                            <p className="text-[11px] font-black text-[#1a3a2a] uppercase truncate leading-none mb-1">{c.name}</p>
                            <p className="text-[9px] font-black text-[#3e5a4a] opacity-30 uppercase tracking-widest truncate">{c.vol} TRADED</p>
                         </div>
                      </div>
                      <div className="text-right shrink-0 min-w-[70px]">
                         <p className="text-lg font-black text-[#1a3a2a] leading-none mb-1">{c.price}</p>
                         <p className={`text-[9px] font-black uppercase tracking-widest ${c.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>{c.change}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="bg-[#1a3a2a] p-10 rounded-[2.5rem] shadow-2xl text-center space-y-6 relative overflow-hidden group">
                 <Target className="w-10 h-10 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
                 <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Profit Prediction AI</h4>
                 <p className="text-[10px] font-medium text-emerald-100 opacity-60 px-2 leading-relaxed uppercase tracking-widest">Sector B projects <span className="text-emerald-400 font-bold">+15% spike</span> for Q4.</p>
                 <button className="w-full bg-emerald-500 text-[#0b1e15] py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-400 transition-colors">Apply Strategy</button>
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-20 h-20 text-white" /></div>
              </div>
                </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;

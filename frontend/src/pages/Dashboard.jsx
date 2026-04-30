import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Cloud, Droplets, Sun, Wind, Thermometer, Sprout, Bug, TrendingUp, Zap, Activity, BarChart3, Leaf, Calendar, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import useAuthStore from '../store/authStore';

const yieldData = [
  { month: 'Jan', value: 32 }, { month: 'Feb', value: 45 }, { month: 'Mar', value: 38 },
  { month: 'Apr', value: 62 }, { month: 'May', value: 55 }, { month: 'Jun', value: 78 },
];
const soilData = [
  { name: 'pH', value: 6.8, max: 14, color: '#4ade80' },
  { name: 'Nitrogen', value: 82, max: 100, color: '#22d3ee' },
  { name: 'Phosphorus', value: 45, max: 100, color: '#a78bfa' },
  { name: 'Potassium', value: 75, max: 100, color: '#fb923c' },
];
const weekForecast = [
  { day: 'Mon', temp: 28, icon: Sun, condition: 'Sunny' },
  { day: 'Tue', temp: 26, icon: Cloud, condition: 'Cloudy' },
  { day: 'Wed', temp: 24, icon: Droplets, condition: 'Rain' },
  { day: 'Thu', temp: 27, icon: Sun, condition: 'Sunny' },
  { day: 'Fri', temp: 25, icon: Cloud, condition: 'Cloudy' },
];
const tasks = [
  { name: 'Planting', progress: 85, color: '#4ade80', icon: Sprout },
  { name: 'Fertilization', progress: 60, color: '#a78bfa', icon: Droplets },
  { name: 'Pest Check', progress: 40, color: '#f87171', icon: Bug },
  { name: 'Irrigation', progress: 92, color: '#22d3ee', icon: Droplets },
];
const harvestData = [
  { name: 'Wheat', tons: 12.4 }, { name: 'Rice', tons: 8.2 }, { name: 'Maize', tons: 6.8 },
  { name: 'Soybean', tons: 4.5 }, { name: 'Cotton', tons: 3.1 },
];

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });

const StatCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <Motion.div {...anim(delay)} className="stat-card">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <ArrowUpRight className="w-4 h-4 text-emerald-400/30" />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-emerald-400/50 mt-1">{label}</p>
    {sub && <p className="text-[10px] text-emerald-400/30 mt-0.5">{sub}</p>}
  </Motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="text-emerald-400 font-semibold">{label}</p>
      <p className="text-white">{payload[0].value}</p>
    </div>
  );
};

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <Motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
            {greeting}, {user?.name?.split(' ')[0] || 'Farmer'} 👋
          </h1>
          <p className="text-sm text-emerald-400/50 mt-1">Here's your farm overview for today</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.1)' }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/70">Systems Online</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-emerald-400/50" style={{ background: 'rgba(10,30,20,0.5)', border: '1px solid rgba(74,222,128,0.06)' }}>
            <Calendar className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </Motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Leaf} label="Active Fields" value="12" sub="+2 this month" color="#4ade80" delay={0.05} />
        <StatCard icon={TrendingUp} label="Yield Score" value="94.2%" sub="↑ 3.1% vs last month" color="#22d3ee" delay={0.1} />
        <StatCard icon={Bug} label="Pest Risk" value="Low" sub="Last scan: 2h ago" color="#fb923c" delay={0.15} />
        <StatCard icon={Zap} label="Efficiency" value="87%" sub="Target: 90%" color="#a78bfa" delay={0.2} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Yield Chart */}
        <Motion.div {...anim(0.25)} className="col-span-12 lg:col-span-8 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Yield Performance</h2>
              <p className="text-xs text-emerald-400/40 mt-0.5">Monthly harvest output trends</p>
            </div>
            <div className="badge-green"><Activity className="w-3 h-3 mr-1" /> Live</div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(74,222,128,0.3)', fontSize: 11 }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={2} fill="url(#yieldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>

        {/* Weather */}
        <Motion.div {...anim(0.3)} className="col-span-12 lg:col-span-4 glass-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Weather</h2>
            <span className="text-[10px] text-emerald-400/30">Sacramento, CA</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(56,189,248,0.1)' }}>
              <Sun className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">28°C</p>
              <p className="text-xs text-emerald-400/40">Sunny, Clear skies</p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-1">
            {weekForecast.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1.5 py-2 rounded-lg" style={{ background: 'rgba(10,30,20,0.4)' }}>
                <span className="text-[10px] text-emerald-400/40">{d.day}</span>
                <d.icon className="w-4 h-4 text-emerald-400/60" />
                <span className="text-xs font-medium text-white">{d.temp}°</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400/50"><Wind className="w-3.5 h-3.5" /> 12 km/h</div>
            <div className="flex items-center gap-2 text-xs text-emerald-400/50"><Droplets className="w-3.5 h-3.5" /> 45%</div>
          </div>
        </Motion.div>

        {/* Soil Health */}
        <Motion.div {...anim(0.35)} className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Soil Health</h2>
          <div className="space-y-4">
            {soilData.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-emerald-400/60">{s.name}</span>
                  <span className="font-medium text-white">{s.value}{s.name === 'pH' ? '' : '%'}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(74,222,128,0.08)' }}>
                  <Motion.div initial={{ width: 0 }} animate={{ width: `${(s.value / s.max) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full" style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Motion.div>

        {/* Active Tasks */}
        <Motion.div {...anim(0.4)} className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Active Tasks</h2>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(10,30,20,0.4)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${t.color}15` }}>
                  <t.icon className="w-4 h-4" style={{ color: t.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-medium">{t.name}</span>
                    <span style={{ color: t.color }}>{t.progress}%</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(74,222,128,0.08)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${t.progress}%`, background: t.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Motion.div>

        {/* Harvest Breakdown */}
        <Motion.div {...anim(0.45)} className="col-span-12 lg:col-span-4 glass-card p-6">
          <h2 className="text-base font-semibold text-white mb-4">Harvest Breakdown</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={harvestData} barSize={20}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#166534" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(74,222,128,0.3)', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="tons" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>
      </div>

      {/* AI Insight Banner */}
      <Motion.div {...anim(0.5)} className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shrink-0 shadow-lg shadow-green-900/30">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white">AI Insight</h3>
          <p className="text-sm text-emerald-400/50 mt-1">
            System predicts a +15% biomass increase in Field 03 over the next 2 weeks. 
            Optimal conditions detected — consider increasing irrigation by 10% for maximum yield.
          </p>
        </div>
        <button className="btn-glow px-5 py-2.5 rounded-xl text-white text-sm shrink-0">Apply Settings</button>
      </Motion.div>
    </div>
  );
}

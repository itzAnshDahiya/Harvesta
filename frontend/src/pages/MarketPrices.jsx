import React from 'react';
import { motion as Motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search, RefreshCw, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import api from '../lib/api';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });

const MiniChart = ({ data, positive }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data.map((v, i) => ({ i, v }))}>
        <defs>
          <linearGradient id={positive ? 'miniGreen' : 'miniRed'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={positive ? '#4ade80' : '#f87171'} stopOpacity={0.3} />
            <stop offset="100%" stopColor={positive ? '#4ade80' : '#f87171'} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={positive ? '#4ade80' : '#f87171'} strokeWidth={1.5} fill={`url(#${positive ? 'miniGreen' : 'miniRed'})`} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default function MarketPrices() {
  const [commodities, setCommodities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [filterCat, setFilterCat] = React.useState('All');
  const [selected, setSelected] = React.useState(null);
  const [history, setHistory] = React.useState(null);

  const fetchPrices = async () => {
    setLoading(true);
    try { const { data } = await api.get('/market'); setCommodities(data.data); }
    catch {} finally { setLoading(false); }
  };

  React.useEffect(() => { fetchPrices(); }, []);

  const fetchHistory = async (id) => {
    setSelected(id);
    try { const { data } = await api.get(`/market/${id}/history`); setHistory(data.data); }
    catch { setHistory(null); }
  };

  const categories = ['All', ...new Set(commodities.map(c => c.category))];
  const filtered = commodities.filter(c => {
    if (filterCat !== 'All' && c.category !== filterCat) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const topGainers = [...commodities].sort((a, b) => b.change - a.change).slice(0, 3);
  const topLosers = [...commodities].sort((a, b) => a.change - b.change).slice(0, 3);

  const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return <div className="glass-card px-3 py-2 text-xs"><p className="text-emerald-400">{label}</p><p className="text-white font-semibold">₹{payload[0].value}</p></div>;
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Market Prices</h1>
          <p className="text-sm text-emerald-400/50 mt-1">Live agricultural commodity rates</p>
        </div>
        <button onClick={fetchPrices} className="btn-glow px-4 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </Motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Motion.div {...anim(0.05)} className="glass-card p-5">
          <h3 className="text-xs text-emerald-400/50 font-medium mb-3 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Top Gainers</h3>
          <div className="space-y-2">
            {topGainers.map(c => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'rgba(74,222,128,0.04)' }}>
                <span className="text-sm text-white font-medium">{c.name}</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />+{c.change}%</span>
              </div>
            ))}
          </div>
        </Motion.div>
        <Motion.div {...anim(0.1)} className="glass-card p-5">
          <h3 className="text-xs text-emerald-400/50 font-medium mb-3 flex items-center gap-1.5"><TrendingDown className="w-3.5 h-3.5 text-red-400" /> Top Losers</h3>
          <div className="space-y-2">
            {topLosers.filter(c => c.change < 0).map(c => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.04)' }}>
                <span className="text-sm text-white font-medium">{c.name}</span>
                <span className="text-xs font-semibold text-red-400 flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3" />{c.change}%</span>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>

      {/* History Chart */}
      {history && (
        <Motion.div {...anim(0)} className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{history.commodity} — 30 Day Price History</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history.history}>
                <defs><linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4ade80" stopOpacity={0.3}/><stop offset="100%" stopColor="#4ade80" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'rgba(74,222,128,0.3)', fontSize: 9 }} interval={4} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={2} fill="url(#histGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/30" />
          <input placeholder="Search commodities..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-dark pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${filterCat === c ? 'text-white' : 'text-emerald-400/40 hover:text-emerald-400/70'}`}
              style={filterCat === c ? { background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' } : { background: 'rgba(10,30,20,0.3)', border: '1px solid rgba(74,222,128,0.05)' }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Commodities Table */}
      <Motion.div {...anim(0.15)} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(74,222,128,0.08)' }}>
                {['Commodity','Category','Price','Change','Trend',''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold text-emerald-400/40 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const pos = c.change >= 0;
                return (
                  <tr key={c.id} className="transition-colors hover:bg-emerald-500/[0.03] cursor-pointer" style={{ borderBottom: '1px solid rgba(74,222,128,0.04)' }} onClick={() => fetchHistory(c.id)}>
                    <td className="px-5 py-4"><span className="text-sm font-semibold text-white">{c.name}</span></td>
                    <td className="px-5 py-4"><span className="badge text-[10px]" style={{ background: 'rgba(74,222,128,0.08)', color: 'rgba(74,222,128,0.6)' }}>{c.category}</span></td>
                    <td className="px-5 py-4"><span className="text-sm font-bold text-white">₹{c.price.toFixed(2)}</span><span className="text-[10px] text-emerald-400/30 ml-1">{c.unit}</span></td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${pos ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{pos ? '+' : ''}{c.change}%
                      </span>
                    </td>
                    <td className="px-5 py-4"><MiniChart data={c.trend} positive={pos} /></td>
                    <td className="px-5 py-4"><BarChart3 className="w-4 h-4 text-emerald-400/20 hover:text-emerald-400 transition" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Motion.div>
    </div>
  );
}

import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Package, Plus, Pencil, Trash2, Search, Filter, AlertTriangle, X, Archive } from 'lucide-react';
import useInventoryStore from '../store/inventoryStore';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });
const categories = ['Seeds', 'Fertilizer', 'Pesticide', 'Equipment', 'Feed', 'Tools', 'Other'];
const catColors = { Seeds: '#4ade80', Fertilizer: '#a78bfa', Pesticide: '#f87171', Equipment: '#22d3ee', Feed: '#fb923c', Tools: '#facc15', Other: '#94a3b8' };

export default function Inventory() {
  const { items, loading, fetch, add, update, remove } = useInventoryStore();
  const [search, setSearch] = React.useState('');
  const [filterCat, setFilterCat] = React.useState('All');
  const [showModal, setShowModal] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', category: 'Seeds', quantity: '', unit: 'kg', minStock: '', cost: '', notes: '' });

  React.useEffect(() => { fetch(); }, [fetch]);

  const filtered = items.filter((i) => {
    if (filterCat !== 'All' && i.category !== filterCat) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const lowStock = items.filter((i) => i.quantity <= i.minStock && i.minStock > 0);

  const openAdd = () => { setEditing(null); setForm({ name: '', category: 'Seeds', quantity: '', unit: 'kg', minStock: '', cost: '', notes: '' }); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ name: item.name, category: item.category, quantity: String(item.quantity), unit: item.unit, minStock: String(item.minStock||''), cost: String(item.cost||''), notes: item.notes||'' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, quantity: +form.quantity, minStock: +(form.minStock || 0), cost: +(form.cost || 0) };
    if (editing) await update(editing, payload);
    else await add(payload);
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Inventory</h1>
          <p className="text-sm text-emerald-400/50 mt-1">{items.length} items tracked</p>
        </div>
        <button onClick={openAdd} className="btn-glow px-4 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </Motion.div>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <Motion.div {...anim(0.05)} className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.15)' }}>
          <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
          <p className="text-sm text-orange-300/80">
            <span className="font-semibold">{lowStock.length} item{lowStock.length > 1 ? 's' : ''}</span> below minimum stock: {lowStock.map(i => i.name).join(', ')}
          </p>
        </Motion.div>
      )}

      {/* Search & Filter */}
      <Motion.div {...anim(0.1)} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/30" />
          <input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-dark pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...categories].map((c) => (
            <button key={c} onClick={() => setFilterCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${filterCat === c ? 'text-white' : 'text-emerald-400/40 hover:text-emerald-400/70'}`}
              style={filterCat === c ? { background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' } : { background: 'rgba(10,30,20,0.3)', border: '1px solid rgba(74,222,128,0.05)' }}
            >{c}</button>
          ))}
        </div>
      </Motion.div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Archive className="w-12 h-12 text-emerald-400/20 mx-auto mb-4" />
          <h3 className="text-white font-semibold">No items found</h3>
          <p className="text-sm text-emerald-400/40 mt-1">{search || filterCat !== 'All' ? 'Try different filters' : 'Add your first inventory item'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item, i) => {
            const isLow = item.quantity <= item.minStock && item.minStock > 0;
            const color = catColors[item.category] || '#94a3b8';
            return (
              <Motion.div key={item._id} {...anim(0.03 * i)} className="glass-card p-5 group relative">
                {isLow && <div className="absolute top-3 right-3"><span className="badge-red text-[10px]"><AlertTriangle className="w-2.5 h-2.5 mr-0.5" /> Low</span></div>}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                    <Package className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white text-sm truncate">{item.name}</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${color}15`, color }}>{item.category}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(10,30,20,0.5)' }}>
                    <p className="text-[9px] text-emerald-400/40">QTY</p>
                    <p className="text-sm font-bold text-white">{item.quantity}</p>
                    <p className="text-[9px] text-emerald-400/30">{item.unit}</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(10,30,20,0.5)' }}>
                    <p className="text-[9px] text-emerald-400/40">MIN</p>
                    <p className="text-sm font-bold text-white">{item.minStock || '—'}</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ background: 'rgba(10,30,20,0.5)' }}>
                    <p className="text-[9px] text-emerald-400/40">COST</p>
                    <p className="text-sm font-bold text-white">₹{item.cost || 0}</p>
                  </div>
                </div>
                {item.notes && <p className="text-[11px] text-emerald-400/30 truncate mb-3">{item.notes}</p>}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2" style={{ borderTop: '1px solid rgba(74,222,128,0.06)' }}>
                  <button onClick={() => openEdit(item)} className="flex-1 py-1.5 rounded-lg text-xs text-emerald-400/60 hover:text-emerald-400 transition flex items-center justify-center gap-1" style={{ background: 'rgba(74,222,128,0.06)' }}>
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => remove(item._id)} className="flex-1 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 transition flex items-center justify-center gap-1" style={{ background: 'rgba(239,68,68,0.06)' }}>
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </Motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <Motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-6 w-full max-w-md space-y-4" style={{ background: 'rgba(10,26,18,0.95)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Item' : 'Add Item'}</h2>
              <button onClick={() => setShowModal(false)} className="text-emerald-400/40 hover:text-emerald-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input placeholder="Item name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-dark" required />
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="input-dark">{categories.map(c => <option key={c}>{c}</option>)}</select>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Quantity" type="number" step="any" value={form.quantity} onChange={(e) => setForm({...form, quantity: e.target.value})} className="input-dark" required />
                <input placeholder="Unit (kg, L...)" value={form.unit} onChange={(e) => setForm({...form, unit: e.target.value})} className="input-dark" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Min stock" type="number" step="any" value={form.minStock} onChange={(e) => setForm({...form, minStock: e.target.value})} className="input-dark" />
                <input placeholder="Cost (₹)" type="number" step="any" value={form.cost} onChange={(e) => setForm({...form, cost: e.target.value})} className="input-dark" />
              </div>
              <textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="input-dark h-20 resize-none" />
              <button type="submit" className="btn-glow w-full py-3 rounded-xl text-white text-sm">{editing ? 'Update' : 'Create'}</button>
            </form>
          </Motion.div>
        </div>
      )}
    </div>
  );
}

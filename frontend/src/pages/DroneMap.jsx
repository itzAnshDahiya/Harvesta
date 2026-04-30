import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Map, Plus, Trash2, Sprout, MapPin, Maximize2, Layers, X } from 'lucide-react';
import api from '../lib/api';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });

export default function DroneMap() {
  const [fields, setFields] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAdd, setShowAdd] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', latitude: '', longitude: '', sizeHectares: '', soilType: 'Loam' });

  const fetchFields = async () => {
    try {
      const { data } = await api.get('/fields');
      setFields(data.data);
    } catch {} finally { setLoading(false); }
  };

  React.useEffect(() => { fetchFields(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/fields', form);
      setFields((f) => [data.data, ...f]);
      setForm({ name: '', latitude: '', longitude: '', sizeHectares: '', soilType: 'Loam' });
      setShowAdd(false);
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/fields/${id}`);
      setFields((f) => f.filter((x) => x._id !== id));
    } catch {}
  };

  const soilColors = { Loam: '#4ade80', Clay: '#fb923c', Sandy: '#facc15', Silt: '#22d3ee', Peat: '#a78bfa' };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Motion.div {...anim(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>My Fields</h1>
          <p className="text-sm text-emerald-400/50 mt-1">Manage your agricultural zones</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-glow px-4 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Field
        </button>
      </Motion.div>

      {/* Add Field Modal */}
      {showAdd && (
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <Motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-6 w-full max-w-md space-y-4" style={{ background: 'rgba(10,26,18,0.9)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Field</h2>
              <button onClick={() => setShowAdd(false)} className="text-emerald-400/40 hover:text-emerald-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3">
              <input placeholder="Field Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-dark" required />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Latitude" type="number" step="any" value={form.latitude} onChange={(e) => setForm({...form, latitude: e.target.value})} className="input-dark" required />
                <input placeholder="Longitude" type="number" step="any" value={form.longitude} onChange={(e) => setForm({...form, longitude: e.target.value})} className="input-dark" required />
              </div>
              <input placeholder="Size (hectares)" type="number" step="any" value={form.sizeHectares} onChange={(e) => setForm({...form, sizeHectares: e.target.value})} className="input-dark" required />
              <select value={form.soilType} onChange={(e) => setForm({...form, soilType: e.target.value})} className="input-dark">
                {Object.keys(soilColors).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button type="submit" className="btn-glow w-full py-3 rounded-xl text-white text-sm">Create Field</button>
            </form>
          </Motion.div>
        </Motion.div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      ) : fields.length === 0 ? (
        <Motion.div {...anim(0.1)} className="glass-card p-12 text-center">
          <Map className="w-12 h-12 text-emerald-400/30 mx-auto mb-4" />
          <h3 className="text-white font-semibold">No Fields Yet</h3>
          <p className="text-sm text-emerald-400/40 mt-1">Add your first field to get started</p>
        </Motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {fields.map((field, i) => (
            <Motion.div key={field._id} {...anim(0.05 * i)} className="glass-card p-5 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-20 pointer-events-none" style={{ background: soilColors[field.soilType] || '#4ade80' }} />
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${soilColors[field.soilType] || '#4ade80'}15` }}>
                    <Layers className="w-5 h-5" style={{ color: soilColors[field.soilType] || '#4ade80' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{field.name}</h3>
                    <p className="text-[10px] text-emerald-400/40">{field.soilType} soil</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(field._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400/50 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-lg p-2.5" style={{ background: 'rgba(10,30,20,0.5)' }}>
                  <p className="text-[10px] text-emerald-400/40">Size</p>
                  <p className="text-sm font-semibold text-white">{field.sizeHectares} ha</p>
                </div>
                <div className="rounded-lg p-2.5" style={{ background: 'rgba(10,30,20,0.5)' }}>
                  <p className="text-[10px] text-emerald-400/40">Crops</p>
                  <p className="text-sm font-semibold text-white">{field.crops?.length || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/30">
                <MapPin className="w-3 h-3" />
                <span>{Number(field.latitude).toFixed(4)}, {Number(field.longitude).toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-1 mt-3 pt-3" style={{ borderTop: '1px solid rgba(74,222,128,0.06)' }}>
                <span className="badge-green text-[10px]">{field.status || 'active'}</span>
                {field.crops?.slice(0, 2).map((c, ci) => (
                  <span key={ci} className="badge-blue text-[10px]"><Sprout className="w-2.5 h-2.5 mr-0.5" />{c.name}</span>
                ))}
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

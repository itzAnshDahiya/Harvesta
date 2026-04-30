import { create } from 'zustand';
import api from '../lib/api';

const useInventoryStore = create((set) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/inventory');
      set({ items: data.data, loading: false });
    } catch { set({ loading: false }); }
  },

  add: async (item) => {
    try {
      const { data } = await api.post('/inventory', item);
      set((s) => ({ items: [data.data, ...s.items] }));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || 'Failed' };
    }
  },

  update: async (id, updates) => {
    try {
      const { data } = await api.put(`/inventory/${id}`, updates);
      set((s) => ({ items: s.items.map((i) => (i._id === id ? data.data : i)) }));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || 'Failed' };
    }
  },

  remove: async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      set((s) => ({ items: s.items.filter((i) => i._id !== id) }));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || 'Failed' };
    }
  },
}));

export default useInventoryStore;

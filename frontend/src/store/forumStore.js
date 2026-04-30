import { create } from 'zustand';
import api from '../lib/api';

const useForumStore = create((set) => ({
  posts: [],
  loading: false,

  fetch: async (category) => {
    set({ loading: true });
    try {
      const params = category && category !== 'All' ? `?category=${category}` : '';
      const { data } = await api.get(`/forum${params}`);
      set({ posts: data.data, loading: false });
    } catch { set({ loading: false }); }
  },

  createPost: async (post) => {
    try {
      const { data } = await api.post('/forum', post);
      set((s) => ({ posts: [data.data, ...s.posts] }));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || 'Failed' };
    }
  },

  likePost: async (id) => {
    try {
      await api.put(`/forum/${id}/like`);
      set((s) => ({ posts: s.posts.map((p) => (p._id === id ? { ...p, likes: p.likes + 1 } : p)) }));
    } catch {}
  },

  addComment: async (postId, content) => {
    try {
      const { data } = await api.post(`/forum/${postId}/comments`, { content });
      set((s) => ({ posts: s.posts.map((p) => (p._id === postId ? data.data : p)) }));
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e.response?.data?.message || 'Failed' };
    }
  },

  deletePost: async (id) => {
    try {
      await api.delete(`/forum/${id}`);
      set((s) => ({ posts: s.posts.filter((p) => p._id !== id) }));
    } catch {}
  },
}));

export default useForumStore;

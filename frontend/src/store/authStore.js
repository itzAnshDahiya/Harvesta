import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async ({ email, password }) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          localStorage.setItem('harvesta-token', data.token);
          set({ token: data.token, user: data.user, isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return { ok: false, message: error.response?.data?.message || 'Login failed' };
        }
      },

      register: async ({ name, email, password }) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register', { name, email, password });
          localStorage.setItem('harvesta-token', data.token);
          set({ token: data.token, user: data.user, isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return { ok: false, message: error.response?.data?.message || 'Registration failed' };
        }
      },

      fetchMe: async () => {
        if (!get().token) return;
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.user });
        } catch { get().logout(); }
      },

      updateProfile: async ({ name, email }) => {
        set({ isLoading: true });
        try {
          const { data } = await api.put('/auth/me', { name, email });
          set({ user: data.user, isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return { ok: false, message: error.response?.data?.message || 'Update failed' };
        }
      },

      changePassword: async ({ currentPassword, newPassword }) => {
        set({ isLoading: true });
        try {
          await api.put('/auth/change-password', { currentPassword, newPassword });
          set({ isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return { ok: false, message: error.response?.data?.message || 'Failed' };
        }
      },

      logout: () => {
        localStorage.removeItem('harvesta-token');
        set({ token: null, user: null });
      },
    }),
    { name: 'harvesta-auth', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);

export default useAuthStore;

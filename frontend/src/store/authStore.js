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
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;

          localStorage.setItem('harvesta-token', token);
          set({ token, user, isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            ok: false,
            message: error.response?.data?.message || 'Login failed. Please try again.',
          };
        }
      },

      register: async ({ name, email, password }) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', { name, email, password });
          const { token, user } = response.data;

          localStorage.setItem('harvesta-token', token);
          set({ token, user, isLoading: false });
          return { ok: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            ok: false,
            message: error.response?.data?.message || 'Registration failed. Please try again.',
          };
        }
      },

      fetchMe: async () => {
        if (!get().token) return;
        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.user });
        } catch {
          get().logout();
        }
      },

      logout: () => {
        localStorage.removeItem('harvesta-token');
        set({ token: null, user: null, isLoading: false });
      },
    }),
    {
      name: 'harvesta-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

export default useAuthStore;

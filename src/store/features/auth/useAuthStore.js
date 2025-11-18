import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from './authFns';
import { showToast } from '../../../components/shared/ShowToast';

export const useAuthStore = create(
  persist(set => ({
    state: {
      user: null,
      loading: false,
      error: null
    },
    login: async params => {
      set({ loading: true });
      const data = await login(params);
      // CHECK DATA
      if (data?.success) {
        set({ user: data?.response?.data, error: null, loading: false });
        showToast('Login successful!', 'success', { position: 'top-right' });
      } else {
        showToast(data?.error?.message, 'error', { position: 'top-right' });
        set({ error: data?.error?.message, loading: false });
      }
    },
    logout: () => set({ user: null, error: null, loading: false })
  }))
);

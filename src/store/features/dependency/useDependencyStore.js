import { create } from 'zustand';
import { dependency } from './dependencyFns';

// USEDEPENDENCYSTORE

export const useDependencyStore = create(set => ({
  state: {
    loading: false,
    data: null,
    error: null
  },
  fetchDependency: async () => {
    set({ state: { loading: true, data: null, error: null } });

    const _data = await dependency();
    // CHECK
    if (_data?.success) {
      set({ state: { loading: false, data: _data?.data, error: null } });
    } else {
      set({ state: { loading: false, error: _data?.error?.message } });
    }
  }
}));

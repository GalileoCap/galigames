import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const configStore = {
  store: create(persist((set, get) => ({
    theme: 'dark',
    name: 'Your Name',
  }), {name: 'config'})),
  use: (key) => configStore.store((state) => state[key]),
  get: () => configStore.store.getState(),
  set: (newState, replace) => configStore.store.setState(newState, replace),

  setTheme: (theme) => {
    document.body.dataset.theme = theme;
    configStore.set({ theme });
  },
};

// Ran on first load
const initStore = configStore.get();
configStore.setTheme(initStore.theme);

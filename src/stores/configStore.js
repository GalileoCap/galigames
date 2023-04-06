import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { partyStore } from '../stores';

export const configStore = {
  store: create(persist((set, get) => ({
    theme: 'dark',
    mobileMode: window.innerWidth < 800,

    profile: {
      name: 'Your Name',
      picture: 'https://placehold.co/100x100',
    },
  }), { name: 'config', version: 0 })),
  use: (key) => configStore.store((state) => state[key]),
  get: () => configStore.store.getState(),
  set: (newState, replace) => configStore.store.setState(newState, replace),

  setTheme: (theme) => {
    document.body.dataset.theme = theme;
    configStore.set({ theme });
  },

  setProfile: (cb) => {
    let profile = configStore.get().profile;

    const newProfile = cb(profile);
    if (newProfile !== undefined)
      profile = {...profile, ...newProfile};

    configStore.set({ profile });
    partyStore.sendUpdate((myPeer) => ({ profile }));
  },
};

// Ran on first load to update from localstorage
const initStore = configStore.get();
configStore.setTheme(initStore.theme);

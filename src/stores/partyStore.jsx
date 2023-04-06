import { PeerStore } from '@galileocap/peer-mesh';
import { configStore } from '../stores';

export const partyStore = new PeerStore();
partyStore.init(
  {
    profile: {
      name: 'Your Name',
      picture: 'https://placehold.co/100x100',
    },
  },
  {},
  () => {
    configStore.setProfile(() => {});
  }
);

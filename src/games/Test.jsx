import { LoremIpsum } from '../components';

export const Context = {
  name: 'Test',
  title: 'Test',
  url: 'test',
  description: 'Just for testing how this looks, is it nice?',

  rules: <LoremIpsum />,
  about: <LoremIpsum />,
  singleplayer: {
    difficulties: ['Easy', 'Medium', 'Hard'],
  },
  multiplayer: {
    hotseat: true,
    peer: true,
  },
};

import { Context as TestContext } from './Test';

export const gameContexts = [TestContext];
export function getGameContext(url) {
  for (let game of gameContexts)
    if (game.url === url) return game;
}

import { Outlet, useParams } from 'react-router-dom'; 
import { getGameContext } from '../games';
import { NoGame } from '../pages';
//import './GameWrapper.css';

export function GameWrapper() {
  const { game } = useParams();
  const gameContext = getGameContext(game);

  if (!gameContext) return <NoGame />;
  else return <Outlet context={{game: gameContext}} />;
}

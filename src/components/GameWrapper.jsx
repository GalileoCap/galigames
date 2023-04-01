import { Outlet, useParams } from 'react-router-dom'; 
import { getGameContext } from '../games';
import { NoGame } from '../pages';
//import './GameWrapper.css';

export function GameWrapper() {
  const { game } = useParams();
  const context = getGameContext(game);

  if (!context) return <NoGame />;
  else return <Outlet context={context} />;
}

import { useOutletContext } from 'react-router-dom';
//import './GameHome.css';

export function GameHome() {
	const context = useOutletContext();

  return (
    <div id='GameHome'>
      GameHome: {context.title}
    </div>
  );
}

import {
  HashRouter as Router, //TODO: Replace with BrowserRouter when switching to games.galileocap.me
  Routes, Route, 
} from 'react-router-dom'; 

import {
  Home, Browse,
  GameHome, GamePlay,
  JoinParty, NoPage,
} from './pages';
import { GameWrapper } from './components';

import { partyStore } from './partyStore';
import { MY_PEER } from '@galileocap/peer-mesh';

export default function App() {
  const myPeer = partyStore.usePeer(MY_PEER);

  return (
    myPeer
    ? <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='browse' element={<Browse />} />
          </Route>

          <Route path='game/:game' element={<GameWrapper />}>
            <Route index element={<GameHome />} />
            <Route path='play' element={<GamePlay />} />
          </Route>

          <Route path='join/:peerId' element={<JoinParty />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Router>
    : <>Loading...</>
  );
}

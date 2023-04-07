import { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Routes, Route, 
} from 'react-router-dom'; 

import {
  Home,
  GameHome, GamePlay,
  JoinParty, NoPage,
} from './pages';
import { GameWrapper } from './components';

import { partyStore, configStore } from './stores';
import { MY_PEER } from '@galileocap/peer-mesh';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    partyStore.init({
      profile: {
        name: 'Your Name',
        picture: 'https://placehold.co/100x100',
      },
    }).then(() => {
      configStore.setProfile(() => {});
      setLoaded(true);
    });
  }, []);

  return (
    loaded
    ? <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
          </Route>

          <Route path='game/:game' element={<GameWrapper />}>
            <Route index element={<GameHome />} />
            <Route path='play' element={<GamePlay />} />
          </Route>

          <Route path='join' element={<JoinParty />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Router>
    : <>Loading...</>
  );
}

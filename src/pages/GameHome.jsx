import { useOutletContext } from 'react-router-dom';
import { ALL_PEERS } from '@galileocap/peer-mesh';
import { Header, PartyFooter } from '../components';
import { partyStore } from '../partyStore';
import './GameHome.css';

function RulesNAbout() {
  const { game } = useOutletContext();

  return (
    <div id='GameHome-RulesNAbout'>
      <div id='GameHome-Rules'>
        <h3>Rules</h3> 
        {game.rules}
      </div>
      {
        game.about // About is optional
        ? <div id='GameHome-About'>
            <h3>About</h3> 
            {game.about}
          </div>
        : <></>
      }
    </div>
  );
}

function PlaySingleplayer() {
  const { game } = useOutletContext();

  return (
    <div id='GameHome-Singleplayer'>
      <h3>Singleplayer</h3>
      <button className='primary'>Play</button>
    </div>
  );
}

function PlayMultiplayer() {
  const { game } = useOutletContext();
  const numberOfPeers = partyStore.usePeer(ALL_PEERS).length;

  return (
    <div id='GameHome-Multiplayer'>
      <h3>Multiplayer</h3>
      <button className='primary'>Play</button>
    </div>
  );
}

function Play() {
  const { game } = useOutletContext();

  return (
    <div id='GameHome-Play'>
      { game.singleplayer ? <PlaySingleplayer /> : <></> }
      { game.multiplayer ? <PlayMultiplayer /> : <></> }
    </div>
  );
}

export function GameHome() {
  const { game } = useOutletContext();
  //TODO: Change for mobile based on width

  return (
    <div id='GameHome'>
      <Header game={game} />
      <div id='GameHome-content'>
        <RulesNAbout />
        <Play />
      </div>
      <PartyFooter />
    </div>
  );
}

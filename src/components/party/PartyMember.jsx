import { useState, useEffect, useRef } from 'react';
import { LocalPolice as LeaderIcon } from '@mui/icons-material';
import { ALL_PEERS, MY_PEER } from '@galileocap/peer-mesh';

import { partyStore } from '../../stores';
import './PartyMember.css';

export function PartyMember({ state }) {
  const [showActions, setShowActions] = useState(false);
  const onShowActions = (event) => { if (event.target.tagName !== 'BUTTON') setShowActions(!showActions); };

  const onPromote = () => {};
  const onLeave = () => {};
  const onKick = () => {};

  const amLeader = partyStore.usePeer(MY_PEER)._leader;

  return (
    <div className='PartyMember' onClick={onShowActions}>
      <img src={state.profile.picture || 'https://placehold.co/100x100'} alt="Party member\'s photo" />
      <PartyMemberTag state={state} />
      <div className='PartyMember-actions' data-show={showActions.toString()}>
        <PartyMemberTag state={state} />
        <button className='primary' disabled={!amLeader} onClick={onPromote}>Promote</button>
        {
          state._mine
          ? <button className='danger' onClick={onLeave}>Leave</button>
          : <button className='danger' disabled={!amLeader} onClick={onKick}>Kick</button>
        }
      </div>
    </div>
  );
}

function PartyMemberTag({ state }) {
  return (
    <span className='PartyMemberTag'>
      <p>{state.profile.name}{state._leader ? <LeaderIcon /> : <></>}</p>
    </span>
  );
}

export function PartyMemberList() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.addEventListener('wheel', (event) => {
      event.preventDefault();
      ref.current.scrollBy({
        left: event.deltaY < 0 ? -20 : 20,
      });
    });
  }, [ref]);

  const allPeers = partyStore.usePeer(ALL_PEERS);

  return (
    <div className='PartyMemberList' ref={ref}>
      { allPeers.map((peerState, idx) => <PartyMember state={peerState} key={idx} />) }
    </div>
  );
}

export function PartyMemberGrid() {
  const allPeers = partyStore.usePeer(ALL_PEERS);

  return (
    <div className='PartyMemberGrid'>
      { allPeers.map((peerState, idx) => <PartyMember state={peerState} key={idx} />) }
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { LocalPolice as LeaderIcon } from '@mui/icons-material';
import { AutoTextSize } from 'auto-text-size';
import { ALL_PEERS, MY_PEER } from '@galileocap/peer-mesh';

import { partyStore } from '../../stores';
import './PartyMember.css';

export function PartyMember({ state }) {
  const onPromote = () => {};
  const onLeave = () => {};
  const onKick = () => {};

  const amLeader = partyStore.usePeer(MY_PEER)._leader;

  return (
    <div className='PartyMember'>
      <img src={state.profile.picture || 'https://placehold.co/100x100'} alt="Party member\'s photo" />
      <PartyMemberTag state={state} />
      <div className='PartyMember-actions'>
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
      <AutoTextSize as='p' maxFontSizePx='22'>{state.profile.name}{state._leader ? <LeaderIcon /> : <></>}</AutoTextSize>
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

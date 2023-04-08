import { ALL_PEERS } from '@galileocap/peer-mesh';

import { partyStore } from '../../stores';
import './PartyMember.css';

export function PartyMember({ state }) {
  const onShowActions = () => {};

  return (
    <div className='PartyMember' onClick={onShowActions}>
      <img src={state.profile.picture || 'https://placehold.co/100x100'} alt="Party member\'s photo" />
      <p>{state.profile.name}</p>
    </div>
  );
}

export function PartyMemberList() {
  const allPeers = partyStore.usePeer(ALL_PEERS);

  return (
    <div className='PartyMemberList'>
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

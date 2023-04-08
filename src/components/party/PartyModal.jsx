import { useState } from 'react';
import { MY_PEER, ALL_PEERS } from '@galileocap/peer-mesh';

import { partyStore } from '../../stores';
import {
  PartyMemberGrid,
  Modal, Popup,
} from '../../components';
import './PartyModal.css';

export function PartyModal({ open, setOpen }) {
  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <div id='PartyModal'>
        <h3>Manage Party</h3>
        <IdAction />
        <ShareAction />
        <JoinAction />
        <LeaveAction />
        <MembersAction />
      </div>
    </Modal>
  );
}

function IdAction() {
  const myId = partyStore.usePeer(MY_PEER)._id;
  const onCopyId = () => navigator.clipboard.writeText(myId);

  return (
    <div className='PartyModal-action'>
      <h4>Your ID</h4>
      <Popup time={500} text={'Copied to clipboard'}>
        <span id='peerId' onClick={onCopyId}>{myId}</span>
      </Popup>
    </div>
  );
}

function ShareAction() {
  const myId = partyStore.usePeer(MY_PEER)._id;
  const link = location.origin + '/#/join?id=' + myId;
  const onCopyLink = () => navigator.clipboard.writeText(link);

  return (
    <div className='PartyModal-action'>
      <h4>Share link</h4>
      <Popup time={500} text={'Copied to clipboard'}>
        <span id='shareLink' onClick={onCopyLink}>{link}</span>
      </Popup>
    </div>
  );
}

function JoinAction() {
  const [peerId, setPeerId] = useState('');
  const onChangePeerId = (event) => setPeerId(event.target.value);
  const onJoin = () => partyStore.connectTo(peerId);

  return (
    <div className='PartyModal-action'>
      { /* TODO: Hide if no the leader */ }
      <input id='joinInput' type='text' value={peerId} onChange={onChangePeerId} /><button className='primary' onClick={onJoin}>Join party</button>
    </div>
  );
}

function LeaveAction() {
  const onLeave = () => {};

  return (
    <div className='PartyModal-action'>
      <Popup time={1000} text={'Click again to confirm'}>
        <button className='danger' onClick={onLeave}>Leave party</button>
      </Popup>
    </div>
  );
}

function MembersAction() {
  const partySize = partyStore.usePeer(ALL_PEERS).length;

  return (
    <div className='PartyModal-action'>
      <h4>Members ({partySize})</h4>
      <PartyMemberGrid />
    </div>
  );
}

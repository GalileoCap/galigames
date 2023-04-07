import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Groups as GroupsIcon } from '@mui/icons-material';
import { Modal, Popup } from '../components';
import { partyStore, configStore } from '../stores';
import { MY_PEER, ALL_PEERS } from '@galileocap/peer-mesh';
import './PartyFooter.css';

function PartyMember({ state }) {
  const onShowControls = () => {}; //TODO: Show kick/etc. popup

  return (
    <div className='PartyFooter-Member' onClick={onShowControls}>
      <img src={state.profile.picture || 'https://placehold.co/100x100'} alt="Party member\'s photo" />
      <p>{state.profile.name}</p>
    </div>
  );
}

function PartyList() {
  const allPeers = partyStore.usePeer(ALL_PEERS);

  return (
    <div id='PartyFooter-List'>
      { allPeers.map((peerState, idx) => <PartyMember state={peerState} key={idx} />) }
    </div>
  );
}

function PartyActions({ openModal }) {
  const onLeader = () => {}
  const onCopy = () => {}
  const onMore = () => openModal(true);

  return (
    <div id='PartyFooter-Actions'>
      <button className='primary' onClick={onLeader}>Follow Leader</button>
      <button className='primary' onClick={onCopy}>Copy Link</button>
      <button className='primary' onClick={onMore}>More</button>
    </div>
  );
}

function PartyButton({ openModal }) {
  //TODO: Change (1) to count the size of the party
  return (
    <button
      id='PartyFooter-Button' className='primary'
      onClick={() => openModal(true)}
    >
      <GroupsIcon />(1) Manage party
    </button>
  );
}

function PartyModal({ open, setOpen }) {
  const allPeers = partyStore.usePeer(ALL_PEERS);

  const myId = partyStore.usePeer(MY_PEER)._id;
  const link = location.origin + '/#/join?id=' + myId;
  const onCopyLink = () => navigator.clipboard.writeText(link);
  const onCopyId = () => navigator.clipboard.writeText(myId);

  const [peerId, setPeerId] = useState('');
  const onChangePeerId = (event) => setPeerId(event.target.value);
  const onJoin = () => partyStore.connectTo(peerId);

  const onLeave = () => {};

  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <div id='PartyModal'>
        <h3>Manage Party</h3>
          <div className='PartyModal-action'>
            <h4>Your ID</h4>
            <Popup time={500} text={'Copied to clipboard'}>
              <span id='peerId' onClick={onCopyId}>{myId}</span>
            </Popup>
          </div>
          <div className='PartyModal-action'>
            <h4>Share link</h4>
            <Popup time={500} text={'Copied to clipboard'}>
              <span id='shareLink' onClick={onCopyLink}>{link}</span>
            </Popup>
          </div>
          <div className='PartyModal-action'>
            { /* TODO: Hide if no the leader */ }
            <input id='joinInput' type='text' value={peerId} onChange={onChangePeerId} /><button className='primary' onClick={onJoin}>Join party</button>
          </div>
          <div className='PartyModal-action'>
            <Popup time={1000} text={'Click again to confirm'}>
              <button className='danger' onClick={onLeave}>Leave party</button>
            </Popup>
          </div>
          <div className='PartyModal-action'>
            <h4>Members:</h4>
            { allPeers.map((peer, idx) => <p key={idx}>{peer._id}{peer._mine ? ' <- you!' : ''}</p>) }
          </div>
      </div>
    </Modal>
  );
}

export function PartyFooter() {
  const [ modal, openModal ] = useState(false);
  const mobileMode = configStore.use('mobileMode');

  return (
    <>
      <div id='PartyFooter-Wrapper'>
        {
          mobileMode
          ? <PartyButton openModal={openModal} />
          : <div id='PartyFooter'>
              <PartyList /> 
              <PartyActions openModal={openModal} />
            </div>
        }
      </div>
      <PartyModal open={modal} setOpen={openModal} />
    </>
  );
}

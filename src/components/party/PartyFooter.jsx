import { useState } from 'react';
import { Groups as GroupsIcon } from '@mui/icons-material';
import { MY_PEER, ALL_PEERS } from '@galileocap/peer-mesh';
import { PartyMemberList, PartyModal } from '../../components';
import { partyStore, configStore } from '../../stores';
import './PartyFooter.css';

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
              <PartyMemberList /> 
              <PartyActions openModal={openModal} />
            </div>
        }
      </div>
      <PartyModal open={modal} setOpen={openModal} />
    </>
  );
}

function PartyButton({ openModal }) {
  const partySize = partyStore.usePeer(ALL_PEERS).length;

  return (
    <button
      id='PartyFooter-Button' className='primary'
      onClick={() => openModal(true)}
    >
      <GroupsIcon />({partySize}) Manage party
    </button>
  );
}

function PartyActions({ openModal }) {
  const myId = partyStore.usePeer(MY_PEER)._id;
  const link = location.origin + '/#/join?id=' + myId; //TODO: Repeated code

  const onLeader = () => {}
  const onCopyLink = () => navigator.clipboard.writeText(link);
  const onMore = () => openModal(true);

  return (
    <div id='PartyFooter-Actions'>
      <button className='primary' onClick={onLeader}>Follow Leader</button>
      <button className='primary' onClick={onCopyLink}>Copy Link</button>
      <button className='primary' onClick={onMore}>More</button>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Groups as GroupsIcon } from '@mui/icons-material';
import { Modal } from '../components';
import { useDimensions } from '../utils';
import './PartyFooter.css';

function PartyMember() {
  const onShowControls = () => {}; //TODO: Show kick/etc. popup

  return (
    <div className='PartyFooter-Member' onClick={onShowControls}>
      <img src='https://placehold.co/100x100' alt="Party member\'s photo" />
      <p>Galileo</p>
    </div>
  );
}

function PartyList() {
  return (
    <div id='PartyFooter-List'>
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
      <PartyMember />
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
  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <div id='PartyModal'>
        <h3>Manage Party</h3>
        <p>Share link</p>
        <p>Party ID</p>
        <p>Join</p>
        <p>List of members</p>
        <p>Leave party</p>
      </div>
    </Modal>
  );
}

export function PartyFooter() {
  const { ref, width } = useDimensions();
  const [ modal, openModal ] = useState(false);

  return (
    <>
      <div id='PartyFooter-Wrapper' ref={ref}>
        {
          width > 425
          ? <div id='PartyFooter' data-platform={width > 425 ? 'desktop' : 'mobile'}>
              <PartyList /> 
              <PartyActions openModal={openModal} />
            </div>
          : <PartyButton openModal={openModal} />
        }
      </div>
      <PartyModal open={modal} setOpen={openModal} />
    </>
  );
}

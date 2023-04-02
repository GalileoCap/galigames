import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Groups as GroupsIcon } from '@mui/icons-material';
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

function PartyActions() {
  const onLeader = () => {}
  const onShare = () => {}
  const onMore = () => {}

  return (
    <div id='PartyFooter-Actions'>
      <button className='primary' onClick={onLeader}>Follow Leader</button>
      <button className='primary' onClick={onShare}>Share</button>
      <button className='primary' onClick={onMore}>More</button>
    </div>
  );
}

function PartyButton() {
  //TODO: Change (1) to count the size of the party
  return <button id='PartyFooter-Button' className='primary'><GroupsIcon />(1) Manage party</button>;
}

export function PartyFooter() {
  const { ref, width } = useDimensions();

  return (
    <div id='PartyFooter-Wrapper' ref={ref}>
      {
        width > 425
        ? <div id='PartyFooter' data-platform={width > 425 ? 'desktop' : 'mobile'}>
            <PartyList /> 
            <PartyActions />
          </div>
        : <PartyButton />
      }
    </div>
  );
}

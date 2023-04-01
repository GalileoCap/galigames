import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Groups as GroupsIcon } from '@mui/icons-material';
import { useDimensions } from '../utils';
import './PartyFooter.css';

export function PartyFooter() {
  const { ref, width } = useDimensions();

  return (
    <div id='PartyFooter' ref={ref}>
      {
        width > 425
        ? <div id='PartyFooter-Peers'>
            Footer
          </div>
        : <button id='PartyFooter-Button'><GroupsIcon /> Manage party</button>
      }
    </div>
  );
}

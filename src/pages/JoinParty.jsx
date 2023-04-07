import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { partyStore } from '../stores';
import { MY_PEER } from '@galileocap/peer-mesh';
//import './JoinParty.css';

function Joining({ peerId }) {
  const navigate = useNavigate();
  useEffect(() => {
    partyStore.connectTo(peerId, {})
      .then(() => navigate('/'));
      //TODO: Catch
  }, [peerId]);

  return (
    <div id='Joining'>
      Joining...
    </div>
  );
}

function JoinActions() {
  return (
    <div id='JoinActions'>
      JoinActions
    </div>
  );
}

export function JoinParty({ }) {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const peerId = searchParams.get('id');

  return (
    <div id='JoinParty'>
      {peerId ? <Joining peerId={peerId} /> : <JoinActions /> }
    </div>
  );
}

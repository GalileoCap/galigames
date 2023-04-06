import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameContexts } from '../games';
import './GameList.css';

export function GameCard({ context }) {
  const { name, description, url, img } = context;
  //NOTE: Keep description shorter than: 'Just for testing how this looks, is it nice?'

  const navigate = useNavigate();
  const onClick = (event) => {
    if (event.target.type !== 'submit') // Don't overwrite the buttons
      navigate('game/' + url);
  }
  const onPlay = () => navigate('game/' + url + '#play');
  const onRules = () => navigate('game/' + url + '#rules');

  return (
    <div className='GameCard' onClick={onClick} tabIndex='0'>
      <p className='Title'>{name}</p>
      <img src={img || 'https://placehold.co/160x90'} alt='Game image' />
      <p className='Description'>{description}</p>
      <div className='Actions'>
        <button className='primary' onClick={onPlay}>Play</button>
        <button className='secondary' onClick={onRules}>Rules</button>
      </div>
    </div>
  );
}

export function GameList({ filter }) {
  return (
    <div className='GameList'>
      {
        gameContexts.filter(
          ({name, description}) => (name.toLowerCase().indexOf(filter) > -1 || description.toLowerCase().indexOf(filter) > -1)
        ).map((context, idx) => (
          <GameCard context={context} key={idx} />
        ))
      }
    </div>
  );
}

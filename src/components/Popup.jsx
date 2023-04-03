import { useState } from 'react';
import './Popup.css';

export function Popup({ time, position, text, children }) {
  const [show, setShow] = useState(false);
  const [idTimeout, setIdTimeout] = useState(undefined);
  const onClick = () => {
    setShow(!show); clearTimeout(idTimeout);
    if (time > 0)
      setIdTimeout(setTimeout(() => setShow(false), time + 1000));
  }

  return (
    <span className='Popup' onClick={onClick}>
      {children}
      <span className={'Popup-text ' + (position ? position : 'up')} data-show={show.toString()}>{text}</span>
    </span>
  );
}

import { useEffect, useRef } from 'react';
import './Modal.css';

export function Modal({ open, setOpen, showClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.display = open ? 'block' : 'none';
  }, [open]);

  const onClickClose = () => setOpen(false);
  const onClickOutside = (event) => { if (event.target === ref.current) onClickClose(); };

  return (
    <div className='modal' onClick={onClickOutside} ref={ref}>
      <div className='modal-content'>
        { showClose ? <span className='modal-close-icon' onClick={onClickClose}>&times;</span> : <></> }
        {children}
        { showClose ? <div className='modal-close-button'><button className='secondary' onClick={onClickClose}>Close</button></div> : <></> }
      </div>
    </div>
  );
}

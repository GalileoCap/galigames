import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, Language as LanguageIcon, Palette as PaletteIcon } from '@mui/icons-material';
import { useDimensions } from '../utils';
import './Header.css';

export function Header({ game }) {
  const { ref, width } = useDimensions();

  return (
    <>
      <div id='Header' ref={ref}>
        <Link to='/' id='Logo'>GaliGames</Link>
        {
          game
          ? (
            <div id='Header-Center'>
              <span className='GameTitle'>{game.title}</span>
            </div>
          )
          : <></>
        }
        <div id='Header-Right'>
          {
            width > 425
            ? <div>
                <LanguageIcon className='Header-Icon' tabIndex='0' />
                <PaletteIcon className='Header-Icon' tabIndex='0' />
                <SettingsIcon className='Header-Icon' tabIndex='0' />
              </div>
            : <SettingsIcon className='Header-Icon' tabIndex='0' />
          }
        </div>
      </div>
    </>
  );
}
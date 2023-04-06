import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon, Language as LanguageIcon, Palette as PaletteIcon } from '@mui/icons-material';
import { Config } from '../components';
import { configStore } from '../stores';
import './Header.css';

export function Header({ game }) {
  const mobileMode = configStore.use('mobileMode');

  const [ showConfig, setShowConfig ] = useState(false);
  const onClickConfig = () => setShowConfig(true);

  return (
    <>
      <div id='Header'>
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
            !mobileMode
            ? <> 
                <LanguageIcon className='Header-Icon' tabIndex='0' />
                <PaletteIcon className='Header-Icon' tabIndex='0' />
              </>
            : <></>
          }
          <SettingsIcon className='Header-Icon' tabIndex='0' onClick={onClickConfig} />
        </div>
      </div>
      <Config open={showConfig} setOpen={setShowConfig} />
    </>
  );
}

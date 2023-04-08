import { useState } from 'react';
import { Modal } from '../components';
import { configStore } from '../stores';
import './Config.css';

export function Config({ open, setOpen }) {
  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <div id='Config'>
        <h3>Config</h3>
        <ThemeAction />
        <MobileAction />
        <ProfileAction />
      </div>
    </Modal>
  );
}

function ThemeAction() {
  const { theme } = configStore.store();
  const setDark = () => configStore.setTheme('dark');
  const setLight = () => configStore.setTheme('light');

  return (
    <div className='Config-action'>
      <h4>Theme</h4>
      <div className='ButtonGroup'>
        <button className={theme === 'dark' ? 'primary' : 'secondary'} onClick={setDark}>Dark</button>
        <button className={theme === 'light' ? 'primary' : 'secondary'} onClick={setLight}>Light</button>
      </div>
    </div>
  );
}

function MobileAction() {
  const { mobileMode } = configStore.store();
  const setMobile = () => configStore.set({ mobileMode: true });
  const setDesktop = () => configStore.set({ mobileMode: false });

  return (
    <div className='Config-action'>
      <h4>Mode</h4>
      <div className='ButtonGroup'>
        <button className={mobileMode ? 'primary' : 'secondary'} onClick={setMobile}>Mobile</button>
        <button className={!mobileMode ? 'primary' : 'secondary'} onClick={setDesktop}>Desktop</button>
      </div>
    </div>
  );
}

function ProfileAction() {
  const { profile } = configStore.store();

  const [ name, setName ] = useState(profile.name);
  const [ pictureUrl, setPictureUrl ] = useState(profile.picture);
  const onChange = (event, set) => set(event.target.value);
  const onChangeName = (event) => onChange(event, setName);
  const onChangePicture = (event) => onChange(event, setPictureUrl);
  const onUpdateProfile = () => configStore.setProfile((profile) => ({ name, picture: pictureUrl }));

  return (
    <div className='Config-action'>
      <input type='text' value={name} onChange={onChangeName} />
      <input type='text' value={pictureUrl} onChange={onChangePicture} />
      <button onClick={onUpdateProfile}>Update profile</button>
    </div>
  );
}

import { useState } from 'react';
import { Modal } from '../components';
import { configStore } from '../stores';
//import './Config.css';

export function Config({ open, setOpen }) {
  const { theme, profile, mobileMode } = configStore.store();
  const onChangeTheme = () => configStore.setTheme(theme === 'dark' ? 'light' : 'dark');
  const onChangeMobileMode = () => configStore.set({ mobileMode: !mobileMode });

  const [ name, setName ] = useState(profile.name);
  const [ pictureUrl, setPictureUrl ] = useState(profile.picture);
  const onChange = (event, set) => set(event.target.value);
  const onChangeName = (event) => onChange(event, setName);
  const onChangePicture = (event) => onChange(event, setPictureUrl);
  const onUpdateProfile = () => configStore.setProfile((profile) => ({ name, picture: pictureUrl }));

  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <h3>Config</h3>
      <button onClick={onChangeTheme}>{theme}</button>
      <button onClick={onChangeMobileMode}>{mobileMode ? 'mobile' : 'desktop'}</button>
      <input type='text' value={name} onChange={onChangeName} />
      <input type='text' value={pictureUrl} onChange={onChangePicture} />
      <button onClick={onUpdateProfile}>Update profile</button>
    </Modal>
  );
}

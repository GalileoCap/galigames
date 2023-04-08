import { useState } from 'react';
import { MY_PEER } from '@galileocap/peer-mesh';

import { Modal, PartyMember } from '../components';
import { partyStore, configStore } from '../stores';
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
  const myState = partyStore.usePeer(MY_PEER);

  //TODO: Show edit on the right of profile
  return (
    <div className='Config-action'>
      <h4>Profile</h4>
      <div id='Config-PartyMember' tabIndex='0'>
        <PartyMember state={myState} />
      </div>
      <EditProfile profile={myState.profile} />
    </div>
  );
}

function EditProfile({ profile }) {
  const [ name, setName ] = useState(profile.name);
  const [ pictureUrl, setPictureUrl ] = useState(profile.picture);
  const onChange = (event, set) => set(event.target.value);
  const onChangeName = (event) => onChange(event, setName);
  const onChangePicture = (event) => onChange(event, setPictureUrl);
  const onUpdateProfile = () => configStore.setProfile((profile) => ({ name, picture: pictureUrl }));

  return (
    <div id='Config-EditProfile'>
      <p>Name: <input type='text' size={7} maxLength={13} value={name} onChange={onChangeName} /></p>
      <p>Picture: <input type='text' value={pictureUrl} onChange={onChangePicture} /></p>
      <div><button className='primary' onClick={onUpdateProfile}>Update Profile</button></div>
    </div>
  );
}

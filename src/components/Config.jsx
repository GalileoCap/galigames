import { Modal } from '../components';
import { configStore } from '../stores';
//import './Config.css';

export function Config({ open, setOpen }) {
  const { theme, name } = configStore.store();
  const onChangeTheme = () => configStore.setTheme(theme === 'dark' ? 'light' : 'dark');

  const onChangeName = (event) => configStore.set({ name: event.target.value });

  return (
    <Modal open={open} setOpen={setOpen} showClose={true}>
      <h3>Config</h3>
      <button onClick={onChangeTheme}>{theme}</button>
      <input type='text' value={name} onChange={onChangeName} />
    </Modal>
  );
}

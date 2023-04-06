import { useState } from 'react';
import { Header, PartyFooter, SearchBar, GameList } from '../components';
import './Home.css';

export function Home() {
  const [filter, setFilter] = useState('');

  return (
    <div id='Home'>
      <Header />
      <div id='Home-content'>
        <SearchBar placeholder='Filter...' search={filter} setSearch={setFilter} />
        <GameList filter={filter.toLowerCase()} />
      </div>
      <PartyFooter />
    </div>
  );
}

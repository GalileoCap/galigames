import './SearchBar.css';

export function SearchBar({ placeholder, search, setSearch }) {
  const onChange = (event) => setSearch(event.target.value);

  return (
    <input
      className='SearchBar' type='text'
      placeholder={placeholder || 'Search...'}
      value={search} onChange={onChange}
    />
  );

  //TODO: Icon, https://stackoverflow.com/questions/73054259/display-search-icon-inside-search-box-throws-error-in-react
}

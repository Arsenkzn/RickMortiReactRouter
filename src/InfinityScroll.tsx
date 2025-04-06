import {useState} from 'react';
import useSearch from './hooks/useSearch';
import './App.css'

export default function InfinityScroll() {

  const [query, setQuery]= useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading,
    character,
    hasMore,
    error
  } =  useSearch(query, pageNumber);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <div className='App'>
        <input type='text' onChange={handleChange} />
        {
          character.map(item => <div key={item} className='character'>{item}</div>)
        }
        {loading && <div className='loading'>Loading...</div>}
        {error && <div className='error'>Error</div>}
    </div>
  )
}

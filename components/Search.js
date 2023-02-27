import { useState, useEffect } from 'react';
import { FaSearch, faSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const getResults = async () => {
        if (searchTerm === '') {
          setSearchResults([]);
        } else {
          const url = `/api/search?q=${searchTerm}`;
          const response = await fetch(url);
          const json = await response.json();
          const results = JSON.parse(json);

          setSearchResults(results);
        }
      };
      getResults();
    }, 666);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  return (
    <div className='relative bg-gray-600 p-4'>
      <div className='container mx-auto flex items-center justify-center md:justify-end'>
        <div className='relative text-gray-600 w-72'>
          <input
            type='search'
            name='search'
            id='search'
            className='bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72'
            value={searchTerm}
            placeholder='Search posts …'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className='absolute top-0 right-0 text-black mt-3 mr-4' />
        </div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
}

import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ onSearch }) => {
  return (
    <div className='relative flex-10'>
      <input
        type='text'
        placeholder='Search licenses...'
        onChange={e => onSearch(e.target.value)}
        className='bg-panel border border-ink/25 focus:border-ink indent-7 rounded-lg py-2.5 px-4 pr-10 w-full ring-0 focus:ring-0 focus:outline-none'
      />
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-ink/50 bg-panel' />
    </div>
  );
};

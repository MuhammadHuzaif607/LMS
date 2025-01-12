import { Search } from 'lucide-react';
import React from 'react';
import { Input } from './ui/input';

const Search_input = () => {
  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
      <Input
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for course"
      />
    </div>
  );
};

export default Search_input;

"use client"
import { Search } from 'lucide-react';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search_input = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCatgeoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCatgeoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCatgeoryId, router, pathname]);

  return (
    <>
    
    <div className="relative">
      <Search className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for course"
      />
    </div>
    </>
  );
};

export default Search_input;

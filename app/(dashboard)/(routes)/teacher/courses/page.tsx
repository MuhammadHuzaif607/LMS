import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Link href="/teacher/create">
        <Button>Create New Course</Button>
      </Link>
    </div>
  );
};

export default Page;

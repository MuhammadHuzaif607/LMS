import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className='p-5'>
      {/* <Link href="/teacher/create">
        <Button>Create New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default Page;

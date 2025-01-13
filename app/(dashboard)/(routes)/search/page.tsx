import { db } from '@/lib/db';
import React from 'react';
import Categories from './_components/Categories';
import { getCourses } from '@/actions/get-courses';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Search_input from '@/components/search-input';
import CourseList from "@/components/courses-list"

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Search_input />
      </div>
    <div className="p-6 space-y-4">
      <Categories items={categories} />
      <CourseList items={courses} />
    </div>
    </>
  );
};

export default Search;

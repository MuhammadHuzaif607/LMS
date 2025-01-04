import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import Title_form from './_components/title_form';
import Description_form from './_components/description_form';
import Image_form from './_components/image_form';
import { ComboboxDemo } from '@/components/ui/combobox';

const Page = async ({ params }: any) => {
  const { userId } = await auth();
  const { courseId } = await params;
  if (!userId) {
    redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: String(courseId),
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  if (!course) {
    redirect('/');
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageURL,
    course?.price,
    course?.categoryId,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Corse Setup</h1>
        <span className="text-slate-700 text-sm">
          Complete all fields {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize Your Course</h2>
          </div>
          <Title_form initialData={course} courseId={courseId} />
          <Description_form initialData={course} courseId={courseId} />
          <Image_form initialData={course} courseId={courseId} />
          <ComboboxDemo />
        </div>
      </div>
    </div>
  );
};

export default Page;

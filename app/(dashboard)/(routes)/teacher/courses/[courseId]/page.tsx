import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import {
  CircleDollarSign,
  FileIcon,
  LayoutDashboard,
  ListCheck,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import Title_form from './_components/title_form';
import Description_form from './_components/description_form';
import Image_form from './_components/image_form';
import Category_form from './_components/category_form';
import Price_form from './_components/price_form';
import Attachment_form from './_components/attachment_form';
import Chapter_form from './_components/chapters_form';

const Page = async ({ params }: any) => {
  const { userId } = await auth();
  const { courseId } = await params;
  if (!userId) {
    redirect('/');
  }

  const course = await db.course.findUnique({
    where: {
      id: String(courseId),
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
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
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;
  const options = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Corse Setup</h1>
        <span className="text-slate-700 text-sm">
          Complete all fields {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize Your Course</h2>
          </div>
          <Title_form initialData={course} courseId={courseId} />
          <Description_form initialData={course} courseId={courseId} />
          <Image_form initialData={course} courseId={courseId} />
          <Category_form
            initialData={course}
            courseId={courseId}
            options={options}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListCheck} />
            <h2 className="text-xl">Course Chapters</h2>
          </div>
          <Chapter_form initialData={course} courseId={courseId} />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Course Price</h2>
          </div>
          <Price_form initialData={course} courseId={course.id} />
          <div className="flex items-center gap-x-2">
            <IconBadge icon={FileIcon} />
            <h2 className="text-xl">Resources & Attachments</h2>
          </div>
          <Attachment_form initialData={course} courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

export default Page;

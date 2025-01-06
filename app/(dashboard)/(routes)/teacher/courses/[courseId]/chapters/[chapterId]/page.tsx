import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { courseId, chapterId } = await params;

  const { userId } = await auth();
  if (!userId) {
    return redirect('/');
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center hover:opacity-75 transition-all text-sm gap-x-2"
          >
            <ArrowLeft className='h-4 w-4'/>
            Back to Course Setup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;

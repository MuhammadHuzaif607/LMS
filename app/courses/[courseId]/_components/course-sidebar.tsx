import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { Item } from '@radix-ui/react-dropdown-menu';
import { redirect } from 'next/navigation';
import CourseSidebarItem from './course-sidebar-item';
interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect('/');
  }
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="flex flex-col h-full border-r overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* {Check purchase and add progress} */}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;

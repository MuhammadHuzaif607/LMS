import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Cousine } from 'next/font/google';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCourse);
  } catch (err) {
    console.log('[COURSE_ID_UNPUBLISH]', err);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}

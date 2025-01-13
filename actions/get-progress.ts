import { db } from '@/lib/db';

export async function getProgress(
  userId: string,
  courseId: string
): Promise<number> {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });

    const progesspercentage =
      (validCompletedChapters / publishedChaptersIds.length) * 100;
    return progesspercentage;
  } catch (err) {
    console.log('ERROR_PROGRESS', err);
    return 0;
  }
}

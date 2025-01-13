import { GetChapters } from '@/actions/get-chapters';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import VideoPlayer from './_components/Video-player';
import CourseEnrollButton from './_components/course-enroll-button';
import { Separator } from '@/components/ui/separator';
import Preview from '@/components/preview';
import { File } from 'lucide-react';

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = await auth();
  const { courseId, chapterId } = params;
  if (!userId) {
    redirect('/');
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await GetChapters({ userId, courseId, chapterId });

  if (!chapter || !course) {
    redirect('/');
  }

  const islocked = !chapter.isFree || !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You have already completed this chapter"
        />
      )}

      {islocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className="flex flex-col max-4-xl mx-auto">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={islocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
        {purchase ? (
          <div>{/* {TODO : Add progress course button } */}</div>
        ) : (
          <CourseEnrollButton courseId={courseId} price={course.price!} />
        )}
      </div>
      <Separator />
      <div>{/* <Preview content={chapter.description!}/> */}</div>
      {!!attachments.length && (
        <>
          <Separator />
          <div className="p-4">
            {attachments.map((attachment) => (
              <a
                href={attachment.url}
                target="_blank"
                key={attachment.id}
                className="flex items-center w-full bg-sky-200 border text-sky-700 rounded-md hover:underline line-clamp-1"
              >
                <p className="line-clamp-1">
                  <File />
                  {attachment.name}
                </p>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

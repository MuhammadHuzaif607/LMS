'use client';
import * as z from 'zod';


import { Button } from '@/components/ui/button';
import { PlusCircle, VideoIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Chapter, muxData } from '@prisma/client';
import MuxPlayer from "@mux/mux-player-react";
import File_upload from '@/components/file-upload';

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: muxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success('Chapter Video updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const VideoEmpty = initialData.videoUrl === null;
  return (
    <div className="rounded mt-6 bg-slate-100 p-4 border">
      <div className="flex items-center justify-between">
        Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && VideoEmpty && (
            <>
              <PlusCircle className="h-4 w-4 mr-1" /> Add Video
            </>
          )}
          {!isEditing && !VideoEmpty && <>Edit video</>}
        </Button>
      </div>

      {!isEditing &&
        (VideoEmpty ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
            playbackId={initialData?.muxData?.playbackId || ''}
          /></div>
        ))}

      {isEditing && (
        <>
          <File_upload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <p className="text-muted-foreground text-xs mt-4">
            Upload this chapter's video
          </p>
        </>
      )}
      {!VideoEmpty && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take few minutes to process.please refresh the page if
          video doesn't appear
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;

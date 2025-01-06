'use client';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import File_upload from '@/components/file-upload';

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const Attachment_form = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setIsDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `/api/courses/${courseId}/attachments`,
        values
      );
      toast.success('Course Attachment updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const attachments = initialData.attachments;

  const onDeleteAttachment = async (id: string) => {
    try {
      setIsDeletingId(id);
      const res = await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`
      );
      toast.success('Attachment deleted');
      router.refresh();
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsDeletingId(null);
    }
  };
  return (
    <div className="rounded mt-6 bg-slate-100 p-4 border">
      <div className="flex items-center justify-between">
        Course Attachment
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-1" /> Add a File
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}

          {attachments.length > 0 &&
            attachments.map((attachment) => (
              <div
                className="flex items-center w-full p-3 border bg-sky-200 text-sky-700 rounded-md gap-x-2"
                key={attachment.id}
              >
                <File className="flex-shrink h-4 w-4" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
                {deletingId === attachment.id && (
                  <div className="ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin " />
                  </div>
                )}
                {deletingId !== attachment.id && (
                  <button
                    className="ml-auto hover:opacity-75 transition-all"
                    onClick={() => onDeleteAttachment(attachment.id)}
                  >
                    <X className="h-4 w-4 " />
                  </button>
                )}
              </div>
            ))}
        </>
      )}

      {isEditing && (
        <>
          <File_upload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <p className="text-muted-foreground text-xs mt-4">
            Add anyhting your students might need to complete this course
          </p>
        </>
      )}
    </div>
  );
};

export default Attachment_form;

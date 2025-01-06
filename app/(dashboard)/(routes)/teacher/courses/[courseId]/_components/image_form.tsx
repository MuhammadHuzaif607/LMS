'use client';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import File_upload from '@/components/file-upload';

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: 'ImageUrl is required',
  }),
});

const Image_form = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course Image updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  

  const imageEmpty = initialData.imageURL === null;
  return (
    <div className="rounded mt-6 bg-slate-100 p-4 border">
      <div className="flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && imageEmpty && (
            <>
              <PlusCircle className="h-4 w-4 mr-1" /> Add an image
            </>
          )}
          {!isEditing && !imageEmpty && <>Edit an image</>}
        </Button>
      </div>

      {!isEditing &&
        (imageEmpty ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              fill
              src={initialData?.imageURL || ''}
              alt="Upload an Image"
              className="object-cover rounded-md"
            />
          </div>
        ))}

      {isEditing && (
        <>
          <File_upload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageURL: url });
              }
            }}
          />
          <p className="text-muted-foreground text-xs mt-4">
            16:9 aspect ratio recommended
          </p>
        </>
      )}
    </div>
  );
};

export default Image_form;

'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Chapter } from '@prisma/client';
import EditorForm from '@/components/editor';
import Preview from '@/components/preview';

interface ChapterDescriptionformProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1),
});

const Chapter_Description_form = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionformProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success('Course description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const { isValid, isSubmitting } = form.formState;
  return (
    <div className="rounded mt-6 bg-slate-100 p-4 border">
      <div className="flex items-center justify-between">
        Chapter Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <>
          {!initialData.description && (
            <p
              className={cn(
                'text-sm mt-2',
                !initialData.description && 'text-slate-500 italic'
              )}
            ></p>
          )}
          {initialData.description && (
            <Preview content={initialData.description} />
          )}
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <EditorForm
                      value={field.value}
                      onChange={field.onChange}
                      description={initialData.description || null}
                    />
                  </FormControl>
                  <FormDescription>
                    Edit your course Description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid && isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Chapter_Description_form;

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
import { Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Course, Chapter } from '@prisma/client';
import { Input } from '@/components/ui/input';
import Chapters_list from './chapters-list';

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const Chapter_form = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success('Chapter Created');
      toggleCreating();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const onReOrder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success('Chapters Reordered');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = async (chapterId: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  };

  const { isValid, isSubmitting } = form.formState;
  return (
    <div className="rounded mt-6 bg-slate-100 p-4 border relative">
      {isUpdating && (
        <div className="absolute h-full w-full top-0 right-0 bg-slate-500/20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between">
        Course Chapter
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduction to a course"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Edit your course Chapter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid && isSubmitting}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div>
          <p
            className={cn(
              'text-sm mt-2',
              !initialData.chapters.length && 'text-slate-500 italic'
            )}
          >
            {!initialData.chapters.length && 'No Chapters Found'}
          </p>

          <Chapters_list
            onEdit={onEdit}
            onReOrder={onReOrder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-muted-foregorund text-xs mt-4 text-slate-500">
          Drag and drop to reorder chapter
        </p>
      )}
    </div>
  );
};

export default Chapter_form;

'use client';
import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title is required',
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const router = useRouter();

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post('/api/course', values);
      router.push(`/teacher/course${res.data.id}`);
    } catch {
      toast.error('Something went Wrong');
    }
  };
  return (
    <div className="">
      <h1>Name Of your course</h1>
      <p>What will be the name of your course?</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Web development or Artificial Learning"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This will be your course name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/course">
            <Button type="button" variant={'ghost'}>
              Cancel
            </Button>
          </Link>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            Contine
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;

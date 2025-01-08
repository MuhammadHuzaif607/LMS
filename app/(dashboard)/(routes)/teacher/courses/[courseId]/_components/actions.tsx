'use client';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import AlertModal from '@/components/modal/alert-modal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, courseId, isPublished }: ActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course Successfully deleted');
      router.refresh();
      router.push('/teacher/courses');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        const res = await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Chapter Published');
      } else {
        const res = await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Chapter UnPublished');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <AlertModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4 " />
        </Button>
      </AlertModal>
    </div>
  );
};

export default Actions;

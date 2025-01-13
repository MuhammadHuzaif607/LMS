'use client';

import { Button } from '@/components/ui/button';
import { Formatprice } from '@/lib/format';

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  return (
    <Button className="w-full md:w-auto">
      Enroll fro {Formatprice(price)}
    </Button>
  );
};

export default CourseEnrollButton;

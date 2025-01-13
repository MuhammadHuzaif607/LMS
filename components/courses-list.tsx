import { Category, Course } from '@prisma/client';
import CourseCard from './course-card';

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 ls:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageURL!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-sm text-center mt-10 text-muted-foreground">
          No Course Found
        </p>
      )}
    </div>
  );
};

export default CoursesList;

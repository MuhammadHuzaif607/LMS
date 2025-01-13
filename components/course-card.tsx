import Image from 'next/image';
import Link from 'next/link';
import { IconBadge } from './icon-badge';
import { BookOpen } from 'lucide-react';
import { Formatprice } from '@/lib/format';

interface CourseCardprops {
  title: string;
  id: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = ({
  title,
  id,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardprops) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative aspect-video w-full rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="text-sm md:text-xs my-3 flex items-center gap-x-2">
            <div className="flex items-center  gap-x-1 text-slate-500">
              <IconBadge size="small" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? 'Chapter' : 'Chapters'}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <div>progress Component</div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {Formatprice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

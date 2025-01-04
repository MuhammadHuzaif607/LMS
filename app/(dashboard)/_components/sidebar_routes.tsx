'use client';
import { ChartBar, Compass, Layout, List } from 'lucide-react';
import Sidebar_item from './Sidebar_item';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  { icon: Layout, label: 'Dashboard', href: '/' },
  { icon: Compass, label: 'Browse', href: '/search' },
];

const TeacherRoutes = [
  { icon: List, label: 'Courses', href: '/teacher/courses' },
  { icon: ChartBar, label: 'Analytics', href: '/teacher/analytics' },
];
const Sidebar_routes = () => {
  const path = usePathname();
  const isTeacher = path?.includes('/teacher');
  const routes = isTeacher ? TeacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <Sidebar_item
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default Sidebar_routes;

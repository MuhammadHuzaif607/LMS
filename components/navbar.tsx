'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import { DoorOpen } from 'lucide-react';

const NavbarRoutes = () => {
  const path = usePathname();
  const router = useRouter();

  const isTeacherpage = path.startsWith('/teacher');
  const isPlayerpage = path.includes('/chapter');
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherpage || isPlayerpage ? (
        <SignOutButton redirectUrl="/">
          <Button><DoorOpen className='mr-2' /> Exit </Button>
        </SignOutButton>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;

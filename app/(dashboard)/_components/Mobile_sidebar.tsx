import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Mobile_sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-75 pr-4 transition-all w-full h-full ">
        <Menu width={22} height={22} />
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0 bg-white">
        <SheetTitle className="hidden">Menu</SheetTitle> 
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Mobile_sidebar;

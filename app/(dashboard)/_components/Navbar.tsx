import React from 'react';

import Mobile_sidebar from './Mobile_sidebar';
import NavbarRoutes from '@/components/navbar';

const Navbar = () => {
  return (
    <div className="p-4 border-b w-full h-full bg-white flex items-center">
      <Mobile_sidebar />
      <NavbarRoutes/>
    </div>
  );
};

export default Navbar;

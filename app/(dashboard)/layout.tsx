import React from 'react';
import Sidebar from './_components/Sidebar';
import Navbar from './_components/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <header className="h-[80] md:pl-56 z-50 inset-y-0 w-full">
        <Navbar />
      </header>
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full">{children}</main>
    </div>
  );
};

export default Layout;

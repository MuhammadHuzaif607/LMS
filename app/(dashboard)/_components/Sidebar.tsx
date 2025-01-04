import React from 'react';
import Logo from './Logo';
import Sidebar_routes from './sidebar_routes';

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bh-white shadow-sm">
      <div className="p-6 ">
        <Logo/>
      </div>
      <div className="flex flex-col w-full">
        <Sidebar_routes/>
      </div>
    </div>
  );
};

export default Sidebar;

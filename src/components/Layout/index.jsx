import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

function Layout({ children }) {
  const [activeRoute, setActiveRoute] = useState('dashboard');

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar activeRoute={activeRoute} onRouteChange={setActiveRoute} />
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header currentPage={activeRoute} />
        <main className='flex-1 overflow-y-auto pb-4 px-4 pt-3'>{children}</main>
      </div>
    </div>
  );
}

export default Layout;

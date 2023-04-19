import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <header className='p-4 flex flex-col'>
      <Header />
      <div className='xl:m-w-[50%] flex justify-center'>
        <Outlet />
      </div>
    </header>
  );
}

export default Layout;

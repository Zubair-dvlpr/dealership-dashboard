import React from 'react';
import { User } from 'lucide-react';
import { useAuthStore } from '../../store/features/auth/useAuthStore';
import { useLocation } from 'react-router-dom';
import { sideMenuRoutes } from '../../router/config';

const Header = () => {
  const location = useLocation();
  const user = useAuthStore(state => state?.user);
  const pageName = sideMenuRoutes.find(route => route.path === location.pathname)?.text;
  return (
    <header className='border-b border-ink/25 px-6 py-4  h-16'>
      <div className='flex items-center justify-between'>
        {/* Left Section */}
        <div className='flex items-center space-x-4'>
          <h1 className='text-xl font-semibold '>{pageName ?? ''}</h1>
        </div>

        {/* Right Section */}

        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 rounded-full flex items-center justify-center border border-ink cursor-pointer'>
            <User className='w-4 h-4 text-ink' />
          </div>
          <div className='hidden md:block'>
            <p className='text-sm font-medium '>{`${user?.user?.firstName}`}</p>
            <p className='text-xs text-ink/60'>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useRef, useState } from 'react';
import { User } from 'lucide-react';
import { useAuthStore } from '../../store/features/auth/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideMenuRoutes } from '../../router/config';
import useOutsideClick from '../../utils/hooks/useOutSideClick';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state?.user);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
console.log('User in Header:', user);
  useOutsideClick(dropdownRef, () => setOpenDropdown(false));

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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="gap-2 w-8 h-8 rounded-full flex items-center justify-center border border-ink cursor-pointer"
            >
             <User className='w-4 h-4 text-ink' />
            </button>

            {/* DROPDOWN MENU */}
            {openDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-[#1A1B1F] border border-[#2B2D34] rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-2 hover:bg-[#23252B] text-sm text-gray-200"
                >
                  Profile
                </button>

                {/* <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-[#23252B] text-sm text-red-400"
                >
                  Logout
                </button> */}
              </div>
            )}
          </div>

          <div className='hidden md:block'>
            <p className='text-sm font-medium '>{`${user?.user?.fullName}`}</p>
            <p className='text-xs capitalize text-ink/60'>{`${user?.user?.role}`}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

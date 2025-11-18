import React, { useState, useEffect } from 'react';
import { Home, FileCheck, Gift, ChevronLeft, LogOut } from 'lucide-react';
import { sideMenuRoutes } from '../../router/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/features/auth/useAuthStore';

const Sidebar = ({ activeRoute }) => {
  const state = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { icon: Home, label: 'Dashboard', route: 'dashboard' },
    { icon: FileCheck, label: 'License', route: 'license' },
    { icon: Gift, label: 'Generated Offers', route: 'offers' }
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={` text-ink transition-all duration-300 ease-in-out  border-r border-ink/25 ${
          isCollapsed ? 'w-20' : 'w-64'
        }
        flex flex-col`}
      >
        {/* Logo Section */}
        <div className='p-4 border-b border-ink/25 h-16  px-6'>
          <div
            className={`flex items-center  ${!isCollapsed ? 'justify-between' : 'justify-center'}`}
          >
            <div className='flex items-center space-x-3'>
              {!isCollapsed && <span className='text-xl font-bold tracking-tight'>CarvalueX</span>}
            </div>
            <button
              onClick={toggleSidebar}
              className='p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer'
            >
              <ChevronLeft
                className={`w-5 h-5 transition-transform duration-300 ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-3'>
          <ul className='space-y-2 '>
            {sideMenuRoutes?.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => navigate(item?.path)}
                    className={`flex cursor-pointer items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 group ${
                      location?.pathname === item?.path
                        ? 'bg-panel/50 border border-border rounded-l-lg '
                        : ' hover:bg-panel'
                    } w-full text-left`}
                  >
                    <Icon className='w-5 h-5 flex-shrink-0' />
                    {!isCollapsed && <span className='font-medium'>{item?.text}</span>}
                    {isCollapsed && (
                      <div className='absolute left-16  px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50'>
                        {item?.text}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className='p-4 border-t border-ink/25'>
          <div
            className={`cursor-pointer  flex items-center  ${
              !isCollapsed ? 'justify-normal max-w-max' : 'justify-center w-full'
            } `}
          >
            <div
              className='w-8 h-8  flex items-center justify-center cursor-pointer '
              onClick={() => state.logout()}
            >
              <LogOut className='w-4 h-4' />
            </div>
            {!isCollapsed && (
              <div>
                <p className='text-sm font-medium'>Logout</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

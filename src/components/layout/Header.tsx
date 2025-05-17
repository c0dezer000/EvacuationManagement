import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import DSWDLogo from '../ui/DSWDLogo';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { user, logout } = useUser();

  return (
    <header className="z-10 py-4 bg-white shadow-md">
      <div className="container px-6 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {children}
          <div className="ml-4 lg:ml-0">
            <DSWDLogo className="h-8 w-auto" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-dswd-blue-dark hidden md:block">
              DSWD Disaster Response Operations System
            </h1>
            <h1 className="text-lg font-semibold text-dswd-blue-dark md:hidden">
              DSWD DROMS
            </h1>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring">
              <span className="sr-only">Notifications</span>
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-dswd-red rounded-full"></span>
            </button>

            <div className="relative">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-dswd-blue flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="hidden md:inline-block">{user.name}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-dswd-blue-light text-dswd-blue-dark">
                  {user.role}
                </span>
              </button>
              
              <button 
                onClick={logout}
                className="flex items-center space-x-2 mt-2 text-sm text-gray-600 hover:text-dswd-red"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
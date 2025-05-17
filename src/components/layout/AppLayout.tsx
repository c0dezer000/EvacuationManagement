import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-dswd-blue lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header>
          <button
            className="p-1 text-dswd-blue-dark focus:outline-none focus:shadow-outline lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
        </Header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container px-6 py-8 mx-auto">
            {user ? <Outlet /> : <div className="text-center">Please log in to continue.</div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
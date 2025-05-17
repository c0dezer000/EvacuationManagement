import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, AlertTriangle, Building, Database, FileText, Settings, Users } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Sidebar: React.FC = () => {
  const { user } = useUser();
  const isAdmin = user?.role === 'Central Office';
  
  const navLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Incidents Dashboard' },
    { to: '/evacuation-center', icon: <Building size={20} />, label: 'Evacuation Center Form' },
    { to: '/directory', icon: <Database size={20} />, label: 'Centers Directory' },
    { to: '/reports', icon: <FileText size={20} />, label: 'Reports Dashboard' },
  ];
  
  if (isAdmin) {
    navLinks.push(
      { to: '/users', icon: <Users size={20} />, label: 'User Management' },
      { to: '/settings', icon: <Settings size={20} />, label: 'System Settings' }
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Navigation Links */}
      <div className="py-6">
        <div className="px-4 mb-6">
          <div className="px-2 py-3 bg-dswd-blue-dark rounded-lg">
            <div className="flex items-center text-white">
              <AlertTriangle size={20} className="text-dswd-red" />
              <span className="ml-2 text-sm font-medium">Disaster Response Mode</span>
            </div>
          </div>
        </div>
        
        <nav className="px-2 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-dswd-blue-dark text-white'
                    : 'text-white hover:bg-dswd-blue-dark/50'
                }`
              }
            >
              {link.icon}
              <span className="ml-3">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-6">
        <div className="bg-dswd-blue-dark/50 p-3 rounded-lg">
          <div className="text-xs text-white opacity-75">
            <p>DSWD Central Office</p>
            <p>© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
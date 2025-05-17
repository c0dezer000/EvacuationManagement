import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  customPaths?: { name: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customPaths }) => {
  const location = useLocation();
  
  // If custom paths are provided, use them
  if (customPaths) {
    return (
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-dswd-blue">
              <Home size={16} className="mr-2" />
              Dashboard
            </Link>
          </li>
          
          {customPaths.map((path, index) => (
            <li key={path.path}>
              <div className="flex items-center">
                <ChevronRight size={16} className="text-gray-400" />
                {index === customPaths.length - 1 ? (
                  <span className="ml-1 text-sm font-medium text-dswd-blue md:ml-2">
                    {path.name}
                  </span>
                ) : (
                  <Link to={path.path} className="ml-1 text-sm text-gray-500 hover:text-dswd-blue md:ml-2">
                    {path.name}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Generate breadcrumb based on current location
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-dswd-blue">
            <Home size={16} className="mr-2" />
            Dashboard
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name}>
              <div className="flex items-center">
                <ChevronRight size={16} className="text-gray-400" />
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-dswd-blue md:ml-2">
                    {name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link to={routeTo} className="ml-1 text-sm text-gray-500 hover:text-dswd-blue md:ml-2">
                    {name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
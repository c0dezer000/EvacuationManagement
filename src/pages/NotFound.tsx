import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-dswd-blue/10 p-6 rounded-full mb-6">
        <span className="text-7xl font-bold text-dswd-blue">404</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/"
          className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-dswd-blue hover:bg-dswd-blue-dark"
        >
          <Home size={18} className="mr-2" />
          Go to Dashboard
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
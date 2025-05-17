import React from 'react';
import { Activity } from 'lucide-react';

interface DSWDLogoProps {
  className?: string;
}

const DSWDLogo: React.FC<DSWDLogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className || ''}`}>
      <div className="bg-dswd-red p-1 rounded">
        <Activity className="text-white" size={20} />
      </div>
      <span className="ml-2 font-bold text-dswd-blue-dark">DSWD</span>
    </div>
  );
};

export default DSWDLogo;
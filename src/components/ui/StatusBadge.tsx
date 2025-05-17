import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let color = '';
  
  switch (status) {
    case 'Active':
      color = 'bg-green-100 text-green-800';
      break;
    case 'Closed':
      color = 'bg-gray-100 text-gray-800';
      break;
    case 'Ongoing':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'Critical':
      color = 'bg-dswd-red/10 text-dswd-red';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
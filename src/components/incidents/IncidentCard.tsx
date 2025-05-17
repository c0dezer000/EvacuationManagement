import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, AlertTriangle, Users, Home } from 'lucide-react';
import { Incident } from '../../types';
import StatusBadge from '../ui/StatusBadge';

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const {
    id,
    name,
    type,
    severity,
    date,
    location,
    evacuationCenters,
    totalEvacuees,
    status
  } = incident;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className={`p-4 ${severity === 'High' ? 'bg-dswd-red/10' : severity === 'Medium' ? 'bg-amber-100' : 'bg-blue-100'}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <StatusBadge status={status} />
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <AlertTriangle size={16} className={`mr-1 ${severity === 'High' ? 'text-dswd-red' : severity === 'Medium' ? 'text-amber-500' : 'text-blue-500'}`} />
          <span className="font-medium">{type}</span>
          <span className="mx-2">•</span>
          <span className="font-medium">Severity: {severity}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Calendar size={14} className="mr-1 text-gray-500" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={14} className="mr-1 text-gray-500" />
          <span>{location}</span>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Home size={18} className="mr-2 text-dswd-blue" />
            <div>
              <p className="text-sm text-gray-600">Evacuation Centers</p>
              <p className="text-xl font-bold text-dswd-blue">{evacuationCenters}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users size={18} className="mr-2 text-dswd-blue" />
            <div>
              <p className="text-sm text-gray-600">Total Evacuees</p>
              <p className="text-xl font-bold text-dswd-blue">{totalEvacuees}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            to={`/evacuation-center?incident=${id}`}
            className="block w-full py-2 px-4 bg-dswd-blue text-white text-center rounded-md hover:bg-dswd-blue-dark transition-colors"
          >
            Add Evacuation Center
          </Link>
          
          <Link 
            to={`/incident/${id}`}
            className="block w-full py-2 px-4 border border-dswd-blue text-dswd-blue text-center rounded-md hover:bg-gray-50 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IncidentCard;
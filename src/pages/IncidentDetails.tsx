import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, AlertTriangle, Users, Home, FileText, Download } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import EvacuationCenterTable from '../components/incidents/EvacuationCenterTable';
import StatusBadge from '../components/ui/StatusBadge';

const IncidentDetails: React.FC = () => {
  const { id } = useParams();
  const { incidents, centers } = useIncidents();
  
  const incident = incidents.find(inc => inc.id === id);
  const incidentCenters = centers.filter(center => center.incidentId === id);
  
  if (!incident) {
    return <div>Incident not found</div>;
  }

  return (
    <div>
      <Breadcrumb customPaths={[
        { name: 'Incidents', path: '/' },
        { name: incident.name, path: '' }
      ]} />
      
      {/* Incident Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className={`p-6 ${
          incident.severity === 'High' ? 'bg-dswd-red/10' : 
          incident.severity === 'Medium' ? 'bg-amber-100' : 
          'bg-blue-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{incident.name}</h1>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <AlertTriangle size={16} className={`mr-2 ${
                  incident.severity === 'High' ? 'text-dswd-red' : 
                  incident.severity === 'Medium' ? 'text-amber-500' : 
                  'text-blue-500'
                }`} />
                <span className="font-medium">{incident.type}</span>
                <span className="mx-2">•</span>
                <span className="font-medium">Severity: {incident.severity}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={14} className="mr-2" />
                <span>{incident.date}</span>
                <span className="mx-2">•</span>
                <MapPin size={14} className="mr-2" />
                <span>{incident.location}</span>
              </div>
            </div>
            <StatusBadge status={incident.status} />
          </div>
        </div>
        
        {/* Statistics */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100">
          <div className="flex items-center">
            <div className="bg-dswd-blue/10 p-3 rounded-lg">
              <Home size={20} className="text-dswd-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Evacuation Centers</p>
              <p className="text-2xl font-bold text-dswd-blue">{incident.evacuationCenters}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Evacuees</p>
              <p className="text-2xl font-bold text-green-600">{incident.totalEvacuees}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText size={20} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Reports Filed</p>
              <p className="text-2xl font-bold text-purple-600">{incidentCenters.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Evacuation Centers</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Centers Table */}
      <EvacuationCenterTable centers={incidentCenters} incidentId={id} />
    </div>
  );
};

export default IncidentDetails;
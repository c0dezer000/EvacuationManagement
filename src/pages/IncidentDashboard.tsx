import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import IncidentCard from '../components/incidents/IncidentCard';

const IncidentDashboard: React.FC = () => {
  const { incidents, isLoading } = useIncidents();
  const [filter, setFilter] = useState('all');

  // Apply filters
  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true;
    if (filter === 'active') return incident.status === 'Active';
    if (filter === 'closed') return incident.status === 'Closed';
    return true;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage disaster incidents and associated evacuation centers
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue">
            <Plus size={16} className="mr-2" />
            New Incident
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-dswd-blue focus:ring focus:ring-dswd-blue focus:ring-opacity-50 text-sm"
            >
              <option value="all">All Incidents</option>
              <option value="active">Active Only</option>
              <option value="closed">Closed Only</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            Showing {filteredIncidents.length} of {incidents.length} incidents
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dswd-blue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          
          {filteredIncidents.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No incidents found</h3>
              <p className="text-gray-500 mb-4">Try changing the filter or add a new incident</p>
              <button className="flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue">
                <Plus size={16} className="mr-2" />
                New Incident
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncidentDashboard;
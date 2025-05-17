import React, { useState } from 'react';
import { Search, Filter, FileDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import EvacuationCenterTable from '../components/incidents/EvacuationCenterTable';

const EvacuationCenterDirectory: React.FC = () => {
  const { centers, isLoading } = useIncidents();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Apply filters
  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          center.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          center.city.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesStatus = statusFilter === 'all' || center.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Breadcrumb />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evacuation Center Directory</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all evacuation centers in the system
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue">
            <FileDown size={16} className="mr-2" />
            Export List
          </button>
          <Link 
            to="/evacuation-center" 
            className="flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue"
          >
            <Plus size={16} className="mr-2" />
            Register Center
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              placeholder="Search centers by name, barangay, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-dswd-blue focus:ring focus:ring-dswd-blue focus:ring-opacity-50 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Damaged">Damaged</option>
              <option value="Converted">Converted</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dswd-blue"></div>
        </div>
      ) : (
        <>
          <EvacuationCenterTable centers={filteredCenters} />
          
          {filteredCenters.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <Search size={48} className="mx-auto text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No evacuation centers found</h3>
              <p className="text-gray-500 mb-4">Try changing your search terms or filters</p>
              <Link 
                to="/evacuation-center" 
                className="inline-flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark"
              >
                <Plus size={16} className="mr-2" />
                Register New Center
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EvacuationCenterDirectory;
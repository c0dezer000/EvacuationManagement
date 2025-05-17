import React from 'react';
import { BarChart3, PieChart, Users, Home, AlertTriangle, FileText } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';

const ReportsDashboard: React.FC = () => {
  const { incidents, centers } = useIncidents();
  
  // Calculate summary statistics
  const totalCenters = centers.length;
  const activeCenters = centers.filter(center => center.status === 'Active').length;
  const totalEvacuees = centers.reduce((sum, center) => sum + center.evacueesInside + center.evacueesOutside, 0);
  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(incident => incident.status === 'Active' || incident.status === 'Ongoing').length;
  
  return (
    <div>
      <Breadcrumb />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Overall statistics and reports for evacuation center operations
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue">
            <FileText size={16} className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-dswd-blue">
          <div className="flex items-start">
            <div className="bg-dswd-blue/10 p-3 rounded-lg">
              <Home className="h-6 w-6 text-dswd-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Evacuation Centers</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{totalCenters}</p>
                <p className="ml-2 text-sm text-green-600">{activeCenters} active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Evacuees</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{totalEvacuees}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-start">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Disaster Incidents</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{totalIncidents}</p>
                <p className="ml-2 text-sm text-dswd-red">{activeIncidents} active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-start">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reports Generated</p>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">24</p>
                <p className="ml-2 text-sm text-gray-500">last 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Evacuees by Location</h3>
            <div className="flex items-center text-sm text-gray-500">
              <BarChart3 size={16} className="mr-1" />
              <span>Last 30 days</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="text-center p-4">
              <BarChart3 size={48} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Bar chart showing evacuee distribution by location</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Incident Types</h3>
            <div className="flex items-center text-sm text-gray-500">
              <PieChart size={16} className="mr-1" />
              <span>Current Year</span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="text-center p-4">
              <PieChart size={48} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">Pie chart showing incident distribution by type</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Report Submissions</h3>
          <button className="text-sm text-dswd-blue hover:text-dswd-blue-dark">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Evacuation Center Report #{1001 + index}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">John Doe</div>
                    <div className="text-xs text-gray-400">Field Officer</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Typhoon Yolanda</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jan {15 - index}, 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-dswd-blue hover:text-dswd-blue-dark">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
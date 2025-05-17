import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, FileText, ExternalLink } from 'lucide-react';
import { EvacuationCenter } from '../../types';

interface EvacuationCenterTableProps {
  centers: EvacuationCenter[];
  incidentId?: string;
}

const EvacuationCenterTable: React.FC<EvacuationCenterTableProps> = ({ centers, incidentId }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Evacuees
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {centers.map((center) => (
            <tr key={center.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{center.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{center.barangay}, {center.city}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-3">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{center.evacueesInside}</span>
                    <span className="text-xs text-gray-500 ml-1">inside</span>
                  </div>
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{center.evacueesOutside}</span>
                    <span className="text-xs text-gray-500 ml-1">outside</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${center.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    center.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    center.status === 'Damaged' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {center.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {center.lastUpdated}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                <div className="flex justify-center space-x-2">
                  <Link 
                    to={`/evacuation-center/${center.id}${incidentId ? `?incident=${incidentId}` : ''}`}
                    className="text-dswd-blue hover:text-dswd-blue-dark"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <Link 
                    to={`/reports/${center.id}`}
                    className="text-dswd-blue hover:text-dswd-blue-dark"
                    title="View Report"
                  >
                    <FileText size={18} />
                  </Link>
                  <Link 
                    to={`https://maps.google.com/?q=${center.latitude},${center.longitude}`}
                    target="_blank"
                    className="text-dswd-blue hover:text-dswd-blue-dark"
                    title="View on Map"
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvacuationCenterTable;
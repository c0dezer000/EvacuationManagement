import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, PenTool as Tool, Camera, Phone, Download, Printer } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import StatusBadge from '../components/ui/StatusBadge';

const CenterReport: React.FC = () => {
  const { id } = useParams();
  const { centers } = useIncidents();
  
  const center = centers.find(c => c.id === id);
  
  if (!center) {
    return <div>Center not found</div>;
  }

  return (
    <div>
      <Breadcrumb customPaths={[
        { name: 'Centers Directory', path: '/directory' },
        { name: center.name, path: '' }
      ]} />
      
      {/* Center Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{center.name}</h1>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-2" />
                <span>{center.barangay}, {center.city}, {center.province}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge status={center.status} />
              <span className="text-sm text-gray-500">Last updated: {center.lastUpdated}</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="text-2xl font-bold text-gray-900">{center.capacity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Inside</p>
            <p className="text-2xl font-bold text-dswd-blue">{center.evacueesInside}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Outside</p>
            <p className="text-2xl font-bold text-dswd-blue">{center.evacueesOutside}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Occupancy Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((center.evacueesInside / center.capacity) * 100)}%
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-3 mb-6">
        <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
          <Download size={16} className="mr-2" />
          Export PDF
        </button>
        <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50">
          <Printer size={16} className="mr-2" />
          Print Report
        </button>
      </div>
      
      {/* Report Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demographics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users size={20} className="text-dswd-blue mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Demographics</h2>
          </div>
          
          <div className="space-y-4">
            {/* Age Groups */}
            {['Infants', 'Toddlers', 'Preschool', 'School Age', 'Teenage', 'Adults', 'Elderly'].map((group) => (
              <div key={group} className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{group}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Male</p>
                    <p className="text-sm font-medium text-gray-900">
                      {center.demographics[`${group.toLowerCase()}_male_now`]} / {center.demographics[`${group.toLowerCase()}_male_cumulative`]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Female</p>
                    <p className="text-sm font-medium text-gray-900">
                      {center.demographics[`${group.toLowerCase()}_female_now`]} / {center.demographics[`${group.toLowerCase()}_female_cumulative`]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Facilities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Tool size={20} className="text-dswd-blue mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Facilities Status</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(center.facilities).map(([facility, status]) => (
              <div key={facility} className="border rounded-lg p-3">
                <p className="text-sm text-gray-600 capitalize">
                  {facility.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  status === 'Functional' ? 'bg-green-100 text-green-800' :
                  status === 'Needs Repair' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Media */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Camera size={20} className="text-dswd-blue mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Documentation</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {center.media?.map((item) => (
              <div key={item.id} className="relative rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                  <p className="text-white text-xs">{item.category}</p>
                  {item.caption && (
                    <p className="text-white/80 text-xs truncate">{item.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Persons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Phone size={20} className="text-dswd-blue mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
          </div>
          
          <div className="space-y-4">
            {center.contactPersons?.map((contact) => (
              <div key={contact.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {contact.name}
                      {contact.isPrimary && (
                        <span className="ml-2 text-xs text-dswd-blue">(Primary)</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{contact.position}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    {contact.email && (
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterReport;
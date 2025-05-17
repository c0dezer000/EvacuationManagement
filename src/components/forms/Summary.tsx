import React from 'react';
import { ClipboardCheck, AlertTriangle, MapPin, Users, Tool, Camera, Phone } from 'lucide-react';
import { EvacuationCenter } from '../../types';

interface SummaryProps {
  center: Partial<EvacuationCenter>;
}

const Summary: React.FC<SummaryProps> = ({ center }) => {
  // Calculate total current evacuees
  const totalEvacuees = center.demographics ? Object.entries(center.demographics)
    .filter(([key]) => key.endsWith('_now'))
    .reduce((sum, [, value]) => sum + (value as number), 0) : 0;

  // Check if exceeds capacity
  const exceedsCapacity = center.capacity && totalEvacuees > center.capacity;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Report Summary</h3>
        <div className="flex items-center text-sm text-gray-600">
          <ClipboardCheck size={16} className="mr-1" />
          <span>Review before submission</span>
        </div>
      </div>

      {exceedsCapacity && (
        <div className="bg-dswd-red/10 border-l-4 border-dswd-red p-4 rounded-md">
          <div className="flex">
            <AlertTriangle size={20} className="text-dswd-red mr-2" />
            <div>
              <p className="text-sm text-dswd-red font-medium">Warning: Exceeding Capacity</p>
              <p className="text-sm text-gray-700">
                The total number of evacuees ({totalEvacuees}) exceeds the center's capacity ({center.capacity}).
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Basic Information */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Evacuation Center Name</label>
              <p className="text-sm font-medium text-gray-900">{center.name}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500">Status</label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                center.status === 'Active' ? 'bg-green-100 text-green-800' :
                center.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                center.status === 'Damaged' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {center.status}
              </span>
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500">Location</label>
              <div className="flex items-center text-sm text-gray-900">
                <MapPin size={14} className="mr-1 text-gray-500" />
                <span>{center.barangay}, {center.city}, {center.province}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demographics Summary */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center mb-4">
            <Users size={16} className="text-dswd-blue mr-2" />
            <h4 className="text-sm font-medium text-gray-900">Demographics Summary</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500">Total Evacuees</label>
              <p className="text-2xl font-bold text-dswd-blue">{totalEvacuees}</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500">Center Capacity</label>
              <p className={`text-2xl font-bold ${exceedsCapacity ? 'text-dswd-red' : 'text-green-600'}`}>
                {center.capacity}
              </p>
            </div>
            <div>
              <label className="block text-xs text-gray-500">Occupancy Rate</label>
              <p className="text-2xl font-bold text-gray-900">
                {center.capacity ? Math.round((totalEvacuees / center.capacity) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Status */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <Tool size={16} className="text-dswd-blue mr-2" />
            <h4 className="text-sm font-medium text-gray-900">Facilities Status</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(center.facilities || {}).map(([facility, status]) => (
              <div key={facility} className="text-sm">
                <label className="block text-xs text-gray-500 capitalize">
                  {facility.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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

        {/* Media Documentation */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <Camera size={16} className="text-dswd-blue mr-2" />
            <h4 className="text-sm font-medium text-gray-900">Media Documentation</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {center.media?.map((item) => (
              <div key={item.id} className="relative rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                  <p className="text-white text-xs truncate">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Phone size={16} className="text-dswd-blue mr-2" />
            <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
          </div>
          <div className="space-y-3">
            {center.contactPersons?.map((contact) => (
              <div key={contact.id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {contact.name}
                    {contact.isPrimary && (
                      <span className="ml-2 text-xs text-dswd-blue">(Primary)</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{contact.position}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
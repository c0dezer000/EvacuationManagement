import React from 'react';
import { Tool, AlertTriangle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface FacilityStatus {
  status: 'Functional' | 'Needs Repair' | 'Missing';
  notes?: string;
}

interface FacilitiesProps {
  facilities: Record<string, FacilityStatus>;
  onChange: (facilities: Record<string, FacilityStatus>) => void;
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities, onChange }) => {
  const facilityTypes = [
    { id: 'water', label: 'Water Supply' },
    { id: 'electricity', label: 'Electricity' },
    { id: 'toilets', label: 'Toilets/Sanitation' },
    { id: 'kitchen', label: 'Kitchen Area' },
    { id: 'medicalArea', label: 'Medical Area' },
    { id: 'sleeping', label: 'Sleeping Area' },
    { id: 'storage', label: 'Storage Area' },
    { id: 'waste', label: 'Waste Management' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Functional':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Needs Repair':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'Missing':
        return <XCircle size={16} className="text-dswd-red" />;
      default:
        return <HelpCircle size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Functional':
        return 'bg-green-50 border-green-200';
      case 'Needs Repair':
        return 'bg-amber-50 border-amber-200';
      case 'Missing':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = (facilityId: string, status: FacilityStatus['status']) => {
    onChange({
      ...facilities,
      [facilityId]: { ...facilities[facilityId], status }
    });
  };

  const handleNotesChange = (facilityId: string, notes: string) => {
    onChange({
      ...facilities,
      [facilityId]: { ...facilities[facilityId], notes }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Facilities Status</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Tool size={16} className="mr-1" />
          <span>Update facility conditions and needs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilityTypes.map((facility) => (
          <div 
            key={facility.id}
            className={`rounded-lg border p-4 ${getStatusColor(facilities[facility.id]?.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">{facility.label}</h4>
              <div className="flex items-center">
                {getStatusIcon(facilities[facility.id]?.status)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                {['Functional', 'Needs Repair', 'Missing'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(facility.id, status as FacilityStatus['status'])}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      facilities[facility.id]?.status === status
                        ? 'bg-white border-2 border-dswd-blue text-dswd-blue'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-dswd-blue'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Add notes about condition, repairs needed, or alternative arrangements..."
                  value={facilities[facility.id]?.notes || ''}
                  onChange={(e) => handleNotesChange(facility.id, e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Status Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          {['Functional', 'Needs Repair', 'Missing'].map((status) => {
            const count = Object.values(facilities).filter(f => f.status === status).length;
            return (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">{status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
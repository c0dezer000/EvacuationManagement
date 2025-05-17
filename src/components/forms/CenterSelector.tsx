import React, { useState } from 'react';
import { Search, Plus, MapPin } from 'lucide-react';
import { EvacuationCenter } from '../../types';

interface CenterSelectorProps {
  centers: EvacuationCenter[];
  onSelect: (center: EvacuationCenter | null) => void;
  onAddNew: () => void;
}

const CenterSelector: React.FC<CenterSelectorProps> = ({ centers, onSelect, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<EvacuationCenter | null>(null);

  const filteredCenters = centers.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (center: EvacuationCenter) => {
    setSelectedCenter(center);
    onSelect(center);
  };

  const handleAddNew = () => {
    setSelectedCenter(null);
    onSelect(null);
    onAddNew();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Select Evacuation Center</h3>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-dswd-blue rounded-md hover:bg-dswd-blue-dark"
        >
          <Plus size={16} className="mr-1" />
          Register New Center
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
          placeholder="Search by name, barangay, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredCenters.map((center) => (
          <div 
            key={center.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedCenter?.id === center.id 
                ? 'border-dswd-blue bg-dswd-blue/5 shadow-sm' 
                : 'border-gray-200 hover:border-dswd-blue/50 hover:bg-gray-50'
            }`}
            onClick={() => handleSelect(center)}
          >
            <div className="font-medium text-gray-900">{center.name}</div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin size={14} className="mr-1" />
              {center.barangay}, {center.city}
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <div>
                <span className="font-medium text-dswd-blue">{center.capacity}</span>
                <span className="text-gray-500 ml-1">capacity</span>
              </div>
              <div>
                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full 
                  ${center.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    center.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    center.status === 'Damaged' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {center.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No evacuation centers found matching "{searchTerm}"</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-dswd-blue rounded-md hover:bg-dswd-blue-dark"
          >
            <Plus size={16} className="mr-1" />
            Register New Center
          </button>
        </div>
      )}
    </div>
  );
};

export default CenterSelector;
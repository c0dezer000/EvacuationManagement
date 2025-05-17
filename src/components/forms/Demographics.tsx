import React from 'react';
import { Info, Users, AlertTriangle } from 'lucide-react';
import { Demographics as DemographicsType } from '../../types';

interface DemographicsProps {
  data: DemographicsType;
  onChange: (data: DemographicsType) => void;
  selectedCenter: { capacity: number } | null;
}

const Demographics: React.FC<DemographicsProps> = ({ data, onChange, selectedCenter }) => {
  const handleChange = (field: keyof DemographicsType, value: number) => {
    onChange({
      ...data,
      [field]: value
    });
  };
  
  const totalInside = 
    data.insideMale + 
    data.insideFemale + 
    data.insideChildren;
    
  const totalOutside = 
    data.outsideMale + 
    data.outsideFemale + 
    data.outsideChildren;
    
  const exceedsCapacity = selectedCenter?.capacity && totalInside > selectedCenter.capacity;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Evacuee Demographics</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Info size={16} className="mr-1" />
          <span>Enter the number of evacuees by category</span>
        </div>
      </div>
      
      {exceedsCapacity && (
        <div className="bg-dswd-red/10 border-l-4 border-dswd-red p-4 rounded-md">
          <div className="flex">
            <AlertTriangle size={20} className="text-dswd-red mr-2" />
            <div>
              <p className="text-sm text-dswd-red font-medium">
                Warning: Exceeding Capacity
              </p>
              <p className="text-sm text-gray-700">
                The total number of evacuees inside ({totalInside}) exceeds the center's capacity ({selectedCenter?.capacity}).
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inside Evacuation Center */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center mb-4">
            <Users size={20} className="text-dswd-blue mr-2" />
            <h4 className="text-md font-medium text-gray-900">Inside Evacuation Center</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Males</label>
              <input
                type="number"
                min="0"
                value={data.insideMale}
                onChange={(e) => handleChange('insideMale', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Females</label>
              <input
                type="number"
                min="0"
                value={data.insideFemale}
                onChange={(e) => handleChange('insideFemale', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children (0-17 years)</label>
              <input
                type="number"
                min="0"
                value={data.insideChildren}
                onChange={(e) => handleChange('insideChildren', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            
            <div className="pt-2 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-medium">Total Inside:</span>
                <span className={`text-lg font-bold ${exceedsCapacity ? 'text-dswd-red' : 'text-dswd-blue'}`}>
                  {totalInside}
                </span>
              </div>
              {selectedCenter?.capacity && (
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-gray-500">Center Capacity:</span>
                  <span className="text-gray-700 font-medium">{selectedCenter.capacity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Outside Evacuation Center */}
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center mb-4">
            <Users size={20} className="text-amber-600 mr-2" />
            <h4 className="text-md font-medium text-gray-900">Outside Evacuation Center</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Males</label>
              <input
                type="number"
                min="0"
                value={data.outsideMale}
                onChange={(e) => handleChange('outsideMale', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adult Females</label>
              <input
                type="number"
                min="0"
                value={data.outsideFemale}
                onChange={(e) => handleChange('outsideFemale', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children (0-17 years)</label>
              <input
                type="number"
                min="0"
                value={data.outsideChildren}
                onChange={(e) => handleChange('outsideChildren', parseInt(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              />
            </div>
            
            <div className="pt-2 border-t border-amber-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-medium">Total Outside:</span>
                <span className="text-lg font-bold text-amber-600">{totalOutside}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Evacuees:</span>
          <span className="text-xl font-bold text-dswd-blue-dark">{totalInside + totalOutside}</span>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
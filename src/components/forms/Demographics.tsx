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

  const DemographicField = ({ 
    label, 
    cumulativeField, 
    currentField 
  }: { 
    label: string;
    cumulativeField: keyof DemographicsType;
    currentField: keyof DemographicsType;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-b border-gray-200">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Cumulative</label>
          <input
            type="number"
            min="0"
            value={data[cumulativeField]}
            onChange={(e) => handleChange(cumulativeField, parseInt(e.target.value) || 0)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Current</label>
          <input
            type="number"
            min="0"
            value={data[currentField]}
            onChange={(e) => handleChange(currentField, parseInt(e.target.value) || 0)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const totalCurrent = 
    data.infant_male_now +
    data.infant_female_now +
    data.toddler_male_now +
    data.toddler_female_now +
    data.preschool_male_now +
    data.preschool_female_now +
    data.school_age_male_now +
    data.school_age_female_now +
    data.teenage_male_now +
    data.teenage_female_now +
    data.adult_male_now +
    data.adult_female_now +
    data.elderly_male_now +
    data.elderly_female_now;

  const exceedsCapacity = selectedCenter?.capacity && totalCurrent > selectedCenter.capacity;

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
              <p className="text-sm text-dswd-red font-medium">Warning: Exceeding Capacity</p>
              <p className="text-sm text-gray-700">
                The total number of current evacuees ({totalCurrent}) exceeds the center's capacity ({selectedCenter?.capacity}).
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <Users size={20} className="text-dswd-blue mr-2" />
            <h4 className="text-md font-medium text-gray-900">Demographic Breakdown</h4>
          </div>
        </div>

        {/* Infants */}
        <DemographicField
          label="Infants (0-1 yrs) - Male"
          cumulativeField="infant_male_cumulative"
          currentField="infant_male_now"
        />
        <DemographicField
          label="Infants (0-1 yrs) - Female"
          cumulativeField="infant_female_cumulative"
          currentField="infant_female_now"
        />

        {/* Toddlers */}
        <DemographicField
          label="Toddlers (1-3 yrs) - Male"
          cumulativeField="toddler_male_cumulative"
          currentField="toddler_male_now"
        />
        <DemographicField
          label="Toddlers (1-3 yrs) - Female"
          cumulativeField="toddler_female_cumulative"
          currentField="toddler_female_now"
        />

        {/* Preschool */}
        <DemographicField
          label="Preschool (4-5 yrs) - Male"
          cumulativeField="preschool_male_cumulative"
          currentField="preschool_male_now"
        />
        <DemographicField
          label="Preschool (4-5 yrs) - Female"
          cumulativeField="preschool_female_cumulative"
          currentField="preschool_female_now"
        />

        {/* School Age */}
        <DemographicField
          label="School Age (6-12 yrs) - Male"
          cumulativeField="school_age_male_cumulative"
          currentField="school_age_male_now"
        />
        <DemographicField
          label="School Age (6-12 yrs) - Female"
          cumulativeField="school_age_female_cumulative"
          currentField="school_age_female_now"
        />

        {/* Teenage */}
        <DemographicField
          label="Teenage (13-17 yrs) - Male"
          cumulativeField="teenage_male_cumulative"
          currentField="teenage_male_now"
        />
        <DemographicField
          label="Teenage (13-17 yrs) - Female"
          cumulativeField="teenage_female_cumulative"
          currentField="teenage_female_now"
        />

        {/* Adults */}
        <DemographicField
          label="Adults (18-59 yrs) - Male"
          cumulativeField="adult_male_cumulative"
          currentField="adult_male_now"
        />
        <DemographicField
          label="Adults (18-59 yrs) - Female"
          cumulativeField="adult_female_cumulative"
          currentField="adult_female_now"
        />

        {/* Elderly */}
        <DemographicField
          label="Elderly (60+ yrs) - Male"
          cumulativeField="elderly_male_cumulative"
          currentField="elderly_male_now"
        />
        <DemographicField
          label="Elderly (60+ yrs) - Female"
          cumulativeField="elderly_female_cumulative"
          currentField="elderly_female_now"
        />

        {/* Summary */}
        <div className="bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Current Evacuees</h5>
              <div className="text-2xl font-bold text-dswd-blue">{totalCurrent}</div>
            </div>
            {selectedCenter?.capacity && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Center Capacity</h5>
                <div className={`text-2xl font-bold ${exceedsCapacity ? 'text-dswd-red' : 'text-green-600'}`}>
                  {selectedCenter.capacity}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
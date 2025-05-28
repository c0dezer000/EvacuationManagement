import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, ArrowRight, Plus, Check } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Tabs from '../components/ui/Tabs';
import CenterSelector from '../components/forms/CenterSelector';
import Demographics from '../components/forms/Demographics';
import Facilities from '../components/forms/Facilities';
import SectoralGroups from '../components/forms/SectoralGroups';
import MediaUpload from '../components/forms/MediaUpload';
import ContactPersons from '../components/forms/ContactPersons';
import Summary from '../components/forms/Summary';
import { EvacuationCenter } from '../types';

const EvacuationCenterForm: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const incidentId = searchParams.get('incident');
  const navigate = useNavigate();
  
  const { incidents, centers, addEvacuationCenter, updateEvacuationCenter } = useIncidents();
  
  const [activeTab, setActiveTab] = useState('center');
  const [selectedCenter, setSelectedCenter] = useState<EvacuationCenter | null>(null);
  const [isNewCenter, setIsNewCenter] = useState(false);
  const [addedCenters, setAddedCenters] = useState<EvacuationCenter[]>([]);
  const [demographics, setDemographics] = useState({
    infant_male_cumulative: 0,
    infant_male_now: 0,
    infant_female_cumulative: 0,
    infant_female_now: 0,
    toddler_male_cumulative: 0,
    toddler_male_now: 0,
    toddler_female_cumulative: 0,
    toddler_female_now: 0,
    preschool_male_cumulative: 0,
    preschool_male_now: 0,
    preschool_female_cumulative: 0,
    preschool_female_now: 0,
    school_age_male_cumulative: 0,
    school_age_male_now: 0,
    school_age_female_cumulative: 0,
    school_age_female_now: 0,
    teenage_male_cumulative: 0,
    teenage_male_now: 0,
    teenage_female_cumulative: 0,
    teenage_female_now: 0,
    adult_male_cumulative: 0,
    adult_male_now: 0,
    adult_female_cumulative: 0,
    adult_female_now: 0,
    elderly_male_cumulative: 0,
    elderly_male_now: 0,
    elderly_female_cumulative: 0,
    elderly_female_now: 0
  });
  const [facilities, setFacilities] = useState({});
  const [sectoralGroups, setSectoralGroups] = useState([]);
  const [media, setMedia] = useState([]);
  const [contactPersons, setContactPersons] = useState([]);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Find the incident from the context
  const currentIncident = incidents.find(incident => incident.id === incidentId);

  // If an ID is provided, find the existing center data
  useEffect(() => {
    if (id) {
      const existingCenter = centers.find(center => center.id === id);
      if (existingCenter) {
        setSelectedCenter(existingCenter);
        setCompleted({ center: true });
      }
    }
  }, [id, centers]);

  const handleSelectCenter = (center: EvacuationCenter | null) => {
    setSelectedCenter(center);
    if (center) {
      setIsNewCenter(false);
      setCompleted({ ...completed, center: true });
    } else {
      setIsNewCenter(true);
    }
  };

  const handleAddNewCenter = () => {
    setIsNewCenter(true);
    setSelectedCenter(null);
  };

  const handleDemographicsChange = (data: any) => {
    setDemographics(data);
    setCompleted({ ...completed, demographics: true });
  };

  const handleFacilitiesChange = (data: any) => {
    setFacilities(data);
    setCompleted({ ...completed, facilities: true });
  };

  const handleSectoralGroupsChange = (data: any) => {
    setSectoralGroups(data);
    setCompleted({ ...completed, sectoral: true });
  };

  const handleMediaChange = (data: any) => {
    setMedia(data);
    setCompleted({ ...completed, media: true });
  };

  const handleContactPersonsChange = (data: any) => {
    setContactPersons(data);
    setCompleted({ ...completed, contact: true });
  };

  const handleAddCenter = () => {
    const newCenter = {
      ...selectedCenter,
      demographics,
      facilities,
      sectoralGroups,
      media,
      contactPersons,
      incidentId
    };

    setAddedCenters([...addedCenters, newCenter]);
    
    // Reset form for next center
    setSelectedCenter(null);
    setDemographics({
      infant_male_cumulative: 0,
      infant_male_now: 0,
      infant_female_cumulative: 0,
      infant_female_now: 0,
      toddler_male_cumulative: 0,
      toddler_male_now: 0,
      toddler_female_cumulative: 0,
      toddler_female_now: 0,
      preschool_male_cumulative: 0,
      preschool_male_now: 0,
      preschool_female_cumulative: 0,
      preschool_female_now: 0,
      school_age_male_cumulative: 0,
      school_age_male_now: 0,
      school_age_female_cumulative: 0,
      school_age_female_now: 0,
      teenage_male_cumulative: 0,
      teenage_male_now: 0,
      teenage_female_cumulative: 0,
      teenage_female_now: 0,
      adult_male_cumulative: 0,
      adult_male_now: 0,
      adult_female_cumulative: 0,
      adult_female_now: 0,
      elderly_male_cumulative: 0,
      elderly_male_now: 0,
      elderly_female_cumulative: 0,
      elderly_female_now: 0
    });
    setFacilities({});
    setSectoralGroups([]);
    setMedia([]);
    setContactPersons([]);
    setCompleted({});
    setActiveTab('center');
  };

  const handleSubmitAll = () => {
    // Save all centers
    addedCenters.forEach(center => {
      if (center.id) {
        updateEvacuationCenter(center);
      } else {
        addEvacuationCenter(center);
      }
    });

    // Navigate back to incident details
    navigate(`/incident/${incidentId}`);
  };

  const tabs = [
    {
      id: 'center',
      label: 'Evacuation Center',
      content: (
        <CenterSelector 
          centers={centers} 
          onSelect={handleSelectCenter} 
          onAddNew={handleAddNewCenter} 
        />
      )
    },
    {
      id: 'demographics',
      label: 'Demographics',
      content: (
        <Demographics 
          data={demographics} 
          onChange={handleDemographicsChange}
          selectedCenter={selectedCenter}
        />
      )
    },
    {
      id: 'sectoral',
      label: 'Sectoral Groups',
      content: (
        <SectoralGroups
          groups={sectoralGroups}
          onChange={handleSectoralGroupsChange}
        />
      )
    },
    {
      id: 'facilities',
      label: 'Facilities',
      content: (
        <Facilities
          facilities={facilities}
          onChange={handleFacilitiesChange}
        />
      )
    },
    {
      id: 'media',
      label: 'Media Upload',
      content: (
        <MediaUpload
          media={media}
          onChange={handleMediaChange}
        />
      )
    },
    {
      id: 'contact',
      label: 'Contact Persons',
      content: (
        <ContactPersons
          contacts={contactPersons}
          onChange={handleContactPersonsChange}
        />
      )
    },
    {
      id: 'summary',
      label: 'Summary',
      content: (
        <Summary
          center={{
            ...selectedCenter,
            demographics,
            facilities,
            sectoralGroups,
            media,
            contactPersons
          }}
        />
      )
    }
  ];

  // Generate breadcrumb paths
  const breadcrumbPaths = [];
  
  if (currentIncident) {
    breadcrumbPaths.push({ name: 'Incidents', path: '/' });
    breadcrumbPaths.push({ name: currentIncident.name, path: `/incident/${currentIncident.id}` });
    breadcrumbPaths.push({ name: id ? 'Edit Evacuation Center' : 'New Evacuation Center', path: '' });
  } else {
    breadcrumbPaths.push({ name: 'Evacuation Centers', path: '/directory' });
    breadcrumbPaths.push({ name: id ? 'Edit Report' : 'New Report', path: '' });
  }

  return (
    <div>
      <Breadcrumb customPaths={breadcrumbPaths} />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {id ? 'Update Evacuation Center Report' : 'New Evacuation Center Report'}
          </h2>
          {currentIncident && (
            <p className="mt-1 text-sm text-gray-500">
              For incident: <span className="font-medium">{currentIncident.name}</span>
            </p>
          )}
        </div>

        {/* Added Centers List */}
        {addedCenters.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Added Centers</h3>
            <div className="space-y-2">
              {addedCenters.map((center, index) => (
                <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                  <Check size={16} className="text-green-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{center.name}</p>
                    <p className="text-xs text-gray-500">{center.barangay}, {center.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="px-6 py-4">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            completed={completed}
          />
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={() => setActiveTab(tabs[Math.max(0, tabs.findIndex(t => t.id === activeTab) - 1)].id)}
            disabled={activeTab === 'center'}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'center'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </button>
          
          <div className="flex space-x-4">
            {activeTab === 'summary' ? (
              <>
                <button
                  type="button"
                  onClick={handleAddCenter}
                  className="flex items-center px-4 py-2 border border-dswd-blue text-dswd-blue bg-white text-sm font-medium rounded-md hover:bg-dswd-blue/5"
                >
                  <Plus size={16} className="mr-2" />
                  Add Another Center
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAll}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dswd-blue hover:bg-dswd-blue-dark"
                >
                  <Save size={16} className="mr-2" />
                  Submit All Centers
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab(tabs[Math.min(tabs.length - 1, tabs.findIndex(t => t.id === activeTab) + 1)].id)}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dswd-blue hover:bg-dswd-blue-dark"
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvacuationCenterForm;
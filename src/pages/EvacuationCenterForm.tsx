import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, ArrowRight } from 'lucide-react';
import { useIncidents } from '../context/IncidentContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Tabs from '../components/ui/Tabs';
import CenterSelector from '../components/forms/CenterSelector';
import Demographics from '../components/forms/Demographics';
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
  const [demographics, setDemographics] = useState({
    insideMale: 0,
    insideFemale: 0,
    insideChildren: 0,
    outsideMale: 0,
    outsideFemale: 0,
    outsideChildren: 0
  });
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
    setCompleted({ ...completed, center: true, demographics: true });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNext = () => {
    // Simple tab navigation
    if (activeTab === 'center') setActiveTab('demographics');
    else if (activeTab === 'demographics') setActiveTab('sectoral');
    else if (activeTab === 'sectoral') setActiveTab('facilities');
    else if (activeTab === 'facilities') setActiveTab('media');
    else if (activeTab === 'media') setActiveTab('contact');
    else if (activeTab === 'contact') setActiveTab('summary');
  };

  const handlePrevious = () => {
    // Simple tab navigation
    if (activeTab === 'demographics') setActiveTab('center');
    else if (activeTab === 'sectoral') setActiveTab('demographics');
    else if (activeTab === 'facilities') setActiveTab('sectoral');
    else if (activeTab === 'media') setActiveTab('facilities');
    else if (activeTab === 'contact') setActiveTab('media');
    else if (activeTab === 'summary') setActiveTab('contact');
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving form data');
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
      content: <div className="p-4">Sectoral Groups form content goes here</div>
    },
    {
      id: 'facilities',
      label: 'Facilities',
      content: <div className="p-4">Facilities form content goes here</div>
    },
    {
      id: 'media',
      label: 'Media Upload',
      content: <div className="p-4">Media Upload form content goes here</div>
    },
    {
      id: 'contact',
      label: 'Contact Persons',
      content: <div className="p-4">Contact Persons form content goes here</div>
    },
    {
      id: 'summary',
      label: 'Summary',
      content: <div className="p-4">Summary content goes here</div>
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
        
        <div className="px-6 py-4">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
            completed={completed}
          />
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
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
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-dswd-blue bg-dswd-blue/10 hover:bg-dswd-blue/20"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </button>
            
            {activeTab === 'summary' ? (
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dswd-blue hover:bg-dswd-blue-dark"
              >
                <Save size={16} className="mr-2" />
                Submit Report
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
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
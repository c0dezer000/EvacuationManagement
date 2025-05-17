import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident, EvacuationCenter } from '../types';
import { mockIncidents, mockEvacuationCenters } from '../data/mockData';

interface IncidentContextType {
  incidents: Incident[];
  centers: EvacuationCenter[];
  currentIncident: Incident | null;
  setCurrentIncident: (incident: Incident | null) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (incident: Incident) => void;
  addEvacuationCenter: (center: EvacuationCenter) => void;
  updateEvacuationCenter: (center: EvacuationCenter) => void;
  isLoading: boolean;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [centers, setCenters] = useState<EvacuationCenter[]>([]);
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from storage or use mock data
    setIncidents(mockIncidents);
    setCenters(mockEvacuationCenters);
    setIsLoading(false);
  }, []);

  const addIncident = (incident: Incident) => {
    setIncidents([...incidents, incident]);
  };

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(incidents.map(incident => 
      incident.id === updatedIncident.id ? updatedIncident : incident
    ));
  };

  const addEvacuationCenter = (center: EvacuationCenter) => {
    setCenters([...centers, center]);
  };

  const updateEvacuationCenter = (updatedCenter: EvacuationCenter) => {
    setCenters(centers.map(center => 
      center.id === updatedCenter.id ? updatedCenter : center
    ));
  };

  return (
    <IncidentContext.Provider 
      value={{ 
        incidents, 
        centers, 
        currentIncident, 
        setCurrentIncident, 
        addIncident, 
        updateIncident,
        addEvacuationCenter,
        updateEvacuationCenter,
        isLoading 
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};
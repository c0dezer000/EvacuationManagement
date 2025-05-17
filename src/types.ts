export interface Incident {
  id: string;
  name: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
  location: string;
  evacuationCenters: number;
  totalEvacuees: number;
  status: 'Active' | 'Closed' | 'Ongoing' | 'Critical';
}

export interface EvacuationCenter {
  id: string;
  incidentId: string;
  name: string;
  barangay: string;
  city: string;
  province: string;
  capacity: number;
  evacueesInside: number;
  evacueesOutside: number;
  status: 'Active' | 'Inactive' | 'Damaged' | 'Converted';
  latitude: number;
  longitude: number;
  lastUpdated: string;
  facilities: {
    water: 'Functional' | 'Needs Repair' | 'Missing';
    electricity: 'Functional' | 'Needs Repair' | 'Missing';
    toilets: 'Functional' | 'Needs Repair' | 'Missing';
    kitchen: 'Functional' | 'Needs Repair' | 'Missing';
    medicalArea: 'Functional' | 'Needs Repair' | 'Missing';
  };
}

export interface Demographics {
  insideMale: number;
  insideFemale: number;
  insideChildren: number;
  outsideMale: number;
  outsideFemale: number;
  outsideChildren: number;
}

export interface SectoralGroup {
  id: string;
  name: string;
  count: number;
  notes?: string;
}

export interface Facility {
  id: string;
  name: string;
  status: 'Functional' | 'Needs Repair' | 'Missing';
  notes?: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  position: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  category: 'Sleeping Area' | 'Food Area' | 'Medical Area' | 'Overall';
  caption?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
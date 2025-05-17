export interface Demographics {
  // Infants (0-1 yrs)
  infant_male_cumulative: number;
  infant_male_now: number;
  infant_female_cumulative: number;
  infant_female_now: number;

  // Toddlers (1-3 yrs)
  toddler_male_cumulative: number;
  toddler_male_now: number;
  toddler_female_cumulative: number;
  toddler_female_now: number;

  // Preschool (4-5 yrs)
  preschool_male_cumulative: number;
  preschool_male_now: number;
  preschool_female_cumulative: number;
  preschool_female_now: number;

  // School Age (6-12 yrs)
  school_age_male_cumulative: number;
  school_age_male_now: number;
  school_age_female_cumulative: number;
  school_age_female_now: number;

  // Teenage (13-17 yrs)
  teenage_male_cumulative: number;
  teenage_male_now: number;
  teenage_female_cumulative: number;
  teenage_female_now: number;

  // Adults (18-59 yrs)
  adult_male_cumulative: number;
  adult_male_now: number;
  adult_female_cumulative: number;
  adult_female_now: number;

  // Elderly (60+ yrs)
  elderly_male_cumulative: number;
  elderly_male_now: number;
  elderly_female_cumulative: number;
  elderly_female_now: number;
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

export interface EvacuationCenter {
  id: string;
  incidentId: string;
  name: string;
  barangay: string;
  city: string;
  province: string;
  capacity: number;
  status: 'Active' | 'Inactive' | 'Damaged' | 'Converted';
  latitude: number;
  longitude: number;
  lastUpdated: string;
  demographics: Demographics;
  sectoralGroups: SectoralGroup[];
  facilities: {
    water: 'Functional' | 'Needs Repair' | 'Missing';
    electricity: 'Functional' | 'Needs Repair' | 'Missing';
    toilets: 'Functional' | 'Needs Repair' | 'Missing';
    kitchen: 'Functional' | 'Needs Repair' | 'Missing';
    medicalArea: 'Functional' | 'Needs Repair' | 'Missing';
  };
  contactPersons: ContactPerson[];
  media: Media[];
}

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
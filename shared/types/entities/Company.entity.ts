import { Speciality } from './Speciality.entity';

export interface Company {
  id: string;
  name: string;
  logoLink: string;
  specialties: Speciality[];
  city: string;
}

export interface CompanyFilters {
  name: string;
  specialties: string[];
}

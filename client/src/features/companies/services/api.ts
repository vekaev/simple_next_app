import api from '@services/api';

import { Company, CompanyFilters, Speciality } from '@shared/types/entities';

const getCompanies = async (
  filters: Partial<CompanyFilters> = {}
): Promise<Company[]> => {
  try {
    const { data } = await api.get<Company[]>('/companies', {
      params: { ...filters, specialties: filters.specialties?.join(',') || '' },
    });

    if (!data?.length) return [];

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getCompanyById = async (id: string): Promise<Company | null> => {
  try {
    const { data } = await api.get<Company>(`/companies/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getSpecialties = async (): Promise<Speciality[]> => {
  try {
    const { data } = await api.get<Speciality[]>('/companies/specialities');
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getCompanies, getCompanyById, getSpecialties };

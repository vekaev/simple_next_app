import axios from 'axios';

import { Company } from '@shared/types/entities/Company.entity';

const api = axios.create({
  baseURL: process.env.API_URL,
});

const getCompanies = async (
  params: Partial<Record<keyof Company, string>> = {}
): Promise<Company[]> => {
  try {
    const { data } = await api.get<Company[]>('/companies', { params });

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

const getSpecialties = async (): Promise<string[]> => {
  try {
    const { data } = await api.get<string[]>('/companies/specialities');
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getCompanies, getCompanyById, getSpecialties };

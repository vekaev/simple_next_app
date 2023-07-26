import React, { createContext, useCallback, useEffect, useState } from 'react';

import { usePersistStorage } from '@hooks/usePersistStorage';
import { Company, CompanyFilters, Speciality } from '@shared/types/entities';

import { ContainerComponent } from '@types';

import { getCompanies, getSpecialties } from '../services/api';
import { isFilterFieldsEmpty } from '../utils/isFilterFieldsEmpty';

type ICompanyDataContext = {
  companies: Company[];
  specialties: Speciality[];
  filters: CompanyFilters;
  loading: boolean;
  setFilters: (filters: CompanyFilters) => void;
};

export const CompanyDataContext = createContext<ICompanyDataContext>(
  {} as ICompanyDataContext
);

export const FILTERS_STORAGE_KEY = 'companies-filters';

export const CompanyDataProvider: ContainerComponent = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [specialties, setSpecialties] = useState<Speciality[]>([]);
  const [filters, setFilters] = usePersistStorage<CompanyFilters>(
    FILTERS_STORAGE_KEY,
    {
      name: '',
      specialties: [],
    }
  );

  const fetchCompanies = useCallback(
    async (f?: CompanyFilters): Promise<Company[]> => {
      let result: Company[] = [];

      setLoading(true);
      try {
        result = await getCompanies(f);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }

      return result;
    },
    []
  );

  useEffect(() => {
    fetchCompanies().then(setAllCompanies);
    getSpecialties().then(setSpecialties);
  }, []);

  useEffect(() => {
    if (isFilterFieldsEmpty(filters) && allCompanies.length > 0) {
      setCompanies(allCompanies);
    } else {
      fetchCompanies(filters).then(setCompanies);
    }
  }, [filters]);

  return (
    <CompanyDataContext.Provider
      value={{
        loading,
        filters,
        companies,
        setFilters,
        specialties,
      }}
    >
      {children}
    </CompanyDataContext.Provider>
  );
};

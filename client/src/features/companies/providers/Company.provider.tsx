import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { usePersistStorage } from '@hooks/usePersistStorage';
import { Company, CompanyFilters, Speciality } from '@shared/types/entities';
import { ContainerComponent } from '@types';

import { getCompanies, getSpecialties } from '../services/api';
import { isFilterFieldsEmpty } from '../utils/isFilterFieldsEmpty';

const initialData = {
  companies: [],
  specialties: [],
  filters: {
    name: '',
    specialties: [],
  },
  loading: false,
  setFilters: () => {},
};

type ICompanyDataContext = {
  companies: Company[];
  specialties: Speciality[];
  filters: CompanyFilters;
  loading: boolean;
  setFilters: (filters: CompanyFilters) => void;
};

export const CompanyDataContext =
  createContext<ICompanyDataContext>(initialData);

export const FILTERS_STORAGE_KEY = 'companies-filters';

export const CompanyDataProvider: ContainerComponent = ({ children }) => {
  const allCompanies = useRef<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
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
    // Fetch all companies on first render
    fetchCompanies().then(result => {
      allCompanies.current = result;
      if (isFilterFieldsEmpty(filters)) setCompanies(result);
    });
    getSpecialties().then(setSpecialties);
  }, []);

  useEffect(() => {
    if (isFilterFieldsEmpty(filters)) {
      if (allCompanies.current.length > 0) setCompanies(allCompanies.current);
      return;
    }

    fetchCompanies(filters).then(setCompanies);
  }, [filters]);

  return (
    <CompanyDataContext.Provider
      value={{
        companies,
        specialties,
        filters,
        loading,
        setFilters,
      }}
    >
      {children}
    </CompanyDataContext.Provider>
  );
};

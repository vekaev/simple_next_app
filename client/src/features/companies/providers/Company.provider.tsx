import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { usePersistStorage } from '@hooks/usePersistStorage';
import { Company, CompanyFilters, Speciality } from '@shared/types/entities';
import { getCompanies, getSpecialties } from '../services/api';
import { isFilterFieldsEmpty } from '../utils/isFilterFieldsEmpty';

const initialData = {
  companies: [],
  specialtiesList: [],
  filters: {
    name: '',
    specialties: [],
  },
  loading: false,
  setFilters: () => {},
};

type ICompanyDataContext = {
  companies: Company[];
  specialtiesList: Speciality[];
  filters: CompanyFilters;
  loading: boolean;
  setFilters: (filters: CompanyFilters) => void;
};

export const CompanyDataContext =
  createContext<ICompanyDataContext>(initialData);

export const CompanyDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const allCompanies = useRef<Company[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [specialtiesList, setSpecialtiesList] = useState<Speciality[]>([]);
  const [filters, setFilters] = usePersistStorage<CompanyFilters>('filters', {
    name: '',
    specialties: [],
  });

  const fetchCompanies = useCallback(
    async (f?: CompanyFilters, shouldSet = true): Promise<Company[]> => {
      let result: Company[] = [];

      setLoading(true);
      try {
        result = await getCompanies(f);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }

      if (shouldSet) setCompanies(result);
      return result;
    },
    []
  );

  useEffect(() => {
    // Fetch all companies on first render
    // if filters exist, don't render all companies
    fetchCompanies(undefined, isFilterFieldsEmpty(filters)).then(result => {
      allCompanies.current = result;
    });
    getSpecialties().then(setSpecialtiesList);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFilterFieldsEmpty(filters)) {
        if (allCompanies.current.length > 0) setCompanies(allCompanies.current);
        return;
      }

      fetchCompanies(filters);
    });

    // Decline previous companies fetch
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <CompanyDataContext.Provider
      value={{
        companies,
        specialtiesList,
        filters,
        loading,
        setFilters,
      }}
    >
      {children}
    </CompanyDataContext.Provider>
  );
};

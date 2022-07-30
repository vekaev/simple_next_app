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
import { isEmptyFiltersFields } from '../utils/isEmptyFiltersFields';

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
    async (f?: CompanyFilters): Promise<Company[]> => {
      let result: Company[] = [];

      setLoading(true);
      try {
        const newCompanies = await getCompanies(f);

        setCompanies(newCompanies);
        result = newCompanies;
      } catch (e) {
        console.error(e);
        setCompanies([]);
      } finally {
        setLoading(false);
      }

      return result;
    },
    []
  );

  useEffect(() => {
    (() => {
      fetchCompanies().then(result => {
        allCompanies.current = result;
      });
      getSpecialties().then(setSpecialtiesList);
    })();
  }, []);

  useEffect(() => {
    if (isEmptyFiltersFields(filters)) {
      if (allCompanies.current.length > 0) setCompanies(allCompanies.current);
      return;
    }

    fetchCompanies(filters);
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

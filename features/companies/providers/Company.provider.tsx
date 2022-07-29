import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Company } from '@shared/types/entities/Company.entity';
import { getCompanies, getSpecialties } from '@services/companies/api';
import isEmptyFieldsObject from '@shared/utils/isEmptyObject';

interface CompanyFilters {
  name: string;
  specialties: string[];
}

const initialData = {
  companies: [],
  specialtiesList: [],
  filters: {
    name: '',
    specialties: [],
  },
  loading: false,
  companiesNames: [],
  setCompaniesFilters: () => {},
};

type ICompanyDataContext = {
  companies: Company[];
  specialtiesList: string[];
  companiesNames: string[];
  filters: CompanyFilters;
  loading: boolean;
  setCompaniesFilters: (filters: Partial<CompanyFilters>) => void;
};

export const CompanyDataContext =
  createContext<ICompanyDataContext>(initialData);

export const CompanyDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialCompanies = useRef<Company[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [specialtiesList, setSpecialtiesList] = useState<string[]>([]);
  const [filters, setFilters] = useState<CompanyFilters>({
    name: '',
    specialties: [],
  });
  const [loading, setLoading] = useState(false);
  const companiesNames = useMemo(
    () => companies.map(company => company.name),
    [companies]
  );

  const initialCompaniesFetch = useCallback(async () => {
    try {
      const data = await getCompanies();

      initialCompanies.current = data;
      setCompanies(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const initialSpecialtiesFetch = useCallback(async () => {
    try {
      const specialties = await getSpecialties();

      setSpecialtiesList(specialties);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const initialFetch = useCallback(async () => {
    try {
      setLoading(true);

      await initialCompaniesFetch();
      await initialSpecialtiesFetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCompaniesWithFilters = useCallback(async (f: CompanyFilters) => {
    setLoading(true);
    try {
      const newCompanies = await getCompanies({
        name: f.name || '',
        specialties: f.specialties.join(',') || '',
      });

      setCompanies(newCompanies);
    } catch (e) {
      console.error(e);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialFetch().catch(console.error);
  }, []);

  useEffect(() => {
    if (isEmptyFieldsObject(filters)) {
      setCompanies(initialCompanies.current);
    } else {
      fetchCompaniesWithFilters(filters).catch(console.error);
    }
  }, [filters]);

  const setCompaniesFilters = useCallback(
    (newFilters: Partial<CompanyFilters>) =>
      setFilters(prev => ({ ...prev, ...newFilters })),
    []
  );

  return (
    <CompanyDataContext.Provider
      value={{
        companies,
        specialtiesList,
        filters,
        loading,
        setCompaniesFilters,
        companiesNames,
      }}
    >
      {children}
    </CompanyDataContext.Provider>
  );
};

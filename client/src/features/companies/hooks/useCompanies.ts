import { useContext } from 'react';

import { CompanyDataContext } from '../providers/Company.provider';

export const useCompanies = () => useContext(CompanyDataContext);

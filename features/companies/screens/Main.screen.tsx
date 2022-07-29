import type { NextPage } from 'next';

import { CompanyDataProvider } from '../providers/Company.provider';
import { CompaniesCardList, FilterPanel } from '../components';

const MainScreen: NextPage = () => {
  return (
    <CompanyDataProvider>
      <FilterPanel />
      <CompaniesCardList />
    </CompanyDataProvider>
  );
};

export default MainScreen;

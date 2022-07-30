import type { NextPage } from 'next';
import { Box } from '@mantine/core';

import { CompanyDataProvider } from '../providers/Company.provider';
import { CompaniesCardList, FilterPanel } from '../components';

const MainScreen: NextPage = () => {
  return (
    <CompanyDataProvider>
      <Box p="md">
        <FilterPanel />
        <CompaniesCardList />
      </Box>
    </CompanyDataProvider>
  );
};

export default MainScreen;

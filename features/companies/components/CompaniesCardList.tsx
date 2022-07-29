import React from 'react';
import { SimpleGrid, useMantineTheme } from '@mantine/core';

import CompanyCard from './CompanyCard';
import { useCompanies } from '../hooks/useCompanies';

const CompaniesCardList: React.FC = () => {
  const { companies } = useCompanies();
  const theme = useMantineTheme();

  return (
    <div>
      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {companies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default CompaniesCardList;

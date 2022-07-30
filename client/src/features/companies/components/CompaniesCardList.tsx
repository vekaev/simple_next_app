import React from 'react';
import { SimpleGrid } from '@mantine/core';

import CompanyCard from './CompanyCard';
import { useCompanies } from '../hooks/useCompanies';

const CompaniesCardList: React.FC = () => {
  const { companies } = useCompanies();

  return (
    <div>
      <SimpleGrid
        mt={30}
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
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

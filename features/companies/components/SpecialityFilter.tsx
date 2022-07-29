import React, { useCallback } from 'react';
import { SimpleGrid } from '@mantine/core';

import { TitledCheckbox } from '@components';
import { useCompanies } from '../hooks/useCompanies';

const SpecialityFilter: React.FC = () => {
  const { specialtiesList, filters, setCompaniesFilters } = useCompanies();

  const handleCheckboxChange = useCallback(
    (specialty: string) => (isChecked: boolean) => {
      if (isChecked) {
        setCompaniesFilters({
          specialties: [...filters.specialties, specialty],
        });
      } else {
        setCompaniesFilters({
          specialties: filters.specialties.filter(
            specialtyToCheck => specialtyToCheck !== specialty
          ),
        });
      }
    },
    [filters.specialties]
  );

  return specialtiesList.length ? (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {specialtiesList.map(name => (
        <TitledCheckbox
          key={name}
          title={name}
          checked={!!filters.specialties?.includes(name)}
          onChange={handleCheckboxChange(name)}
        />
      ))}
    </SimpleGrid>
  ) : null;
};

export default SpecialityFilter;

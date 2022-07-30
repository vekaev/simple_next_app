import React, { useCallback, useMemo } from 'react';
import { SimpleGrid } from '@mantine/core';

import { TitledCheckbox } from '@components';
import { useCompanies } from '../hooks/useCompanies';

const SpecialityFilter: React.FC = () => {
  const { specialtiesList, filters, setFilters } = useCompanies();

  const activeSpecialtiesIds = useMemo(
    () =>
      specialtiesList
        .map(specialty => specialty.id)
        .filter(id => filters.specialties.includes(id)),
    [specialtiesList, filters.specialties]
  );
  const handleCheckboxChange = useCallback(
    (specialtyId: string) => (isChecked: boolean) => {
      if (isChecked) {
        setFilters({
          ...filters,
          specialties: [...filters.specialties, specialtyId],
        });
      } else {
        setFilters({
          ...filters,
          specialties: filters.specialties.filter(
            specialtyIdToCheck => specialtyIdToCheck !== specialtyId
          ),
        });
      }
    },
    [filters]
  );

  return specialtiesList.length ? (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'sm', cols: 1 },
      ]}
    >
      {specialtiesList.map(specialty => (
        <TitledCheckbox
          key={specialty.id}
          title={specialty.name}
          checked={activeSpecialtiesIds.includes(specialty.id)}
          onChange={handleCheckboxChange(specialty.id)}
        />
      ))}
    </SimpleGrid>
  ) : null;
};

export default SpecialityFilter;

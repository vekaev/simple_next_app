import React, { useCallback, useMemo, useState } from 'react';
import { Autocomplete, Loader } from '@mantine/core';
import { useCompanies } from '../hooks/useCompanies';

const SearchCompaniesNames: React.FC = () => {
  const { setFilters, companies, loading, filters } = useCompanies();
  const [value, setValue] = useState(filters.name);

  const companiesAutocompleteNames = useMemo(
    () => (value.length > 0 ? companies.map(company => company.name) : []),
    [companies, value.length]
  );

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setFilters({ ...filters, name: newValue });
    },
    [filters]
  );

  return (
    <Autocomplete
      mb="sm"
      value={value}
      data={companiesAutocompleteNames}
      onChange={handleChange}
      rightSection={loading ? <Loader size={16} /> : null}
      placeholder="Company name: "
    />
  );
};

export default SearchCompaniesNames;

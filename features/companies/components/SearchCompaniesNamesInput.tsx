import React, { useEffect, useState } from 'react';
import { Autocomplete, Loader } from '@mantine/core';
import { useCompanies } from '../hooks/useCompanies';

const SearchCompaniesNamesInput: React.FC = () => {
  const { setCompaniesFilters, companiesNames, loading } = useCompanies();
  const [value, setValue] = useState('');

  useEffect(() => {
    setCompaniesFilters({ name: value });
  }, [value]);

  return (
    <Autocomplete
      value={value}
      data={companiesNames}
      onChange={setValue}
      rightSection={loading ? <Loader size={16} /> : null}
      label="Search by name: "
      placeholder="Company name: "
    />
  );
};

export default SearchCompaniesNamesInput;

import React from 'react';
import SearchCompaniesNamesInput from './SearchCompaniesNamesInput';
import SpecialityFilter from './SpecialityFilter';

const FilterPanel: React.FC = () => (
  <>
    <SearchCompaniesNamesInput />
    <SpecialityFilter />
  </>
);

export default FilterPanel;

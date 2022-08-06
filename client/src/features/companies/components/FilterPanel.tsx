import React from 'react';

import SearchCompaniesNames from './SearchCompaniesNames';
import { SpecialityFilter } from './SpecialityFilter';

const FilterPanel: React.FC = () => (
  <>
    <SearchCompaniesNames />
    <SpecialityFilter />
  </>
);

export default FilterPanel;

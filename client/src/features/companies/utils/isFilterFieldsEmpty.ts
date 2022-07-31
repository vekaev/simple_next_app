import { CompanyFilters } from '@shared/types/entities';

export const isFilterFieldsEmpty = (obj: CompanyFilters) =>
  Object.values(obj)
    .filter(Boolean)
    .filter(item => !!item.length).length === 0;

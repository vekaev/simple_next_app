import { CompanyFilters } from '@shared/types/entities';

export const isEmptyFiltersFields = (obj: CompanyFilters) =>
  Object.values(obj).filter(item => !!item.length).length === 0;

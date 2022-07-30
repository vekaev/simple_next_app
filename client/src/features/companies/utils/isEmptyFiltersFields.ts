export const isEmptyFiltersFields = (obj: object) =>
  Object.values(obj)
    .filter(Boolean)
    .filter(item => !!item.length).length === 0;

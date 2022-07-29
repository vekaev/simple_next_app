const isEmptyFieldsObject = (obj: object) =>
  Object.values(obj)
    .filter(Boolean)
    .filter(item => !!item.length).length === 0;

export default isEmptyFieldsObject;

export const getSerializedParams = (params: object): Record<string, string> => {
  const result: Record<string, string> = {};

  return Object.entries(params).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value.join(',');
    } else if (typeof value === 'string') {
      acc[key] = value;
    } else {
      acc[key] = JSON.stringify(value);
    }

    return acc;
  }, result);
};

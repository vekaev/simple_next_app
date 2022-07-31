export const getSerializedParams = (params: object): Record<string, string> =>
  Object.entries(params).reduce((acc, [key, value]) => {
    if (!value) return acc;

    if (Array.isArray(value)) {
      acc[key] = value.join(',');
    } else if (typeof value === 'string') {
      acc[key] = value;
    } else {
      acc[key] = JSON.stringify(value);
    }

    return acc;
  }, {} as Record<string, string>);

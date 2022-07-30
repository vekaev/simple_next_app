import { useCallback, useState } from 'react';

export const usePersistStorage = <T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] => {
  const [value, setter] = useState<T>(() => {
    try {
      const item = window?.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (newValue: T) => {
      try {
        window?.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        // ignore
      } finally {
        setter(newValue);
      }
    },
    [key]
  );

  return [value, setValue];
};

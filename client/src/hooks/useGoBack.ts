import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useGoBack = () => {
  const router = useRouter();

  return useCallback(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    if (typeof window !== 'undefined' && +window?.history?.state?.idx > 0) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);
};

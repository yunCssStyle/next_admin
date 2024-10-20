'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

type IUseStore = {
  key: string | readonly string[];
  initData?: any;
  keyPrefix?: string;
};

export const useStore = ({ key, initData, keyPrefix }: IUseStore) => {
  const prefix = keyPrefix ? keyPrefix : 'client';
  const queryClient = useQueryClient();
  const initialData = initData
    ? initData
    : typeof initData === 'string'
    ? ''
    : undefined;

  const { data: getStore } = useQuery([prefix, key], {
    initialData: initialData,
    staleTime: Infinity,
    cacheTime: Infinity,
    queryFn: () => {
      return queryClient.getQueryData([prefix, key]);
    }
  });

  const setStore = (data: any) => {
    queryClient.setQueryData([prefix, key], data ? data : initialData);
  };

  const clearStore = () => {
    setStore(initialData);
  };

  return { getStore, setStore, clearStore };
};

'use client';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';

const useHooks = () => {
  const getAccessUser = async ({ queryKey }: QueryFunctionContext) => {
    const [_key] = queryKey;
    return (await fetcher.get(`${_key}`)).data;
  };
  const { data: accessUser } = useQuery(
    [...operationKeys.accessUser],
    getAccessUser
  );
  return { accessUser };
};

export default useHooks;

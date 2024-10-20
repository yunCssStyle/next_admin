import { useState } from 'react';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';

const useHooks = () => {
  const [page, setPage] = useState(0);

  const getInspectLimitList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof operationKeys)['inspectLimitList']>
  >) => {
    const [_key, params] = queryKey;

    return (await fetcher.get(`${_key}?page=${params.page}`)).data.limits;
  };

  const { data: inspectLimitList } = useQuery(
    [
      ...operationKeys.inspectLimitList({
        page
      })
    ],
    getInspectLimitList
  );

  return { page, setPage, inspectLimitList };
};

export default useHooks;

import { useState } from 'react';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';

const useHooks = () => {
  const [page, setPage] = useState(0);

  const getKickAllList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof operationKeys)['kickAllList']>
  >) => {
    const [_key, params] = queryKey;

    return (await fetcher.get(`${_key}?page=${params.page}`)).data;
  };

  const { data: kickAllList } = useQuery(
    [...operationKeys.kickAllList({ page })],
    getKickAllList
  );

  return { page, setPage, kickAllList };
};

export default useHooks;

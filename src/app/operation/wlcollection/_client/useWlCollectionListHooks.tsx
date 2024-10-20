'use client';

import { useMemo, useState } from 'react';
import _ from 'lodash';
import useToast from '@/common/hook/useToast';
import { fetcher } from '@/common/api';
import { operationKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHooks from '@/app/operation/wlcollection/_client/useHooks';

let searchFilter = '';

const useWlCollectionListHooks = (id?: number) => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();

  const { wlcollectionList } = useHooks();

  const [filter, setFilter] = useState(searchFilter || '');

  const [collectionList, setCollectionList] = useState<any[]>(
    _.find(wlcollectionList?.content, { id: id })?.legends || []
  );
  const [legendStat, setLegendStat] = useState(0);
  const [page, setPage] = useState<number>(0);

  const setInit = () => {
    searchFilter = '';
  };

  const setSearchFilter = (value: string) => {
    if (/^$|[0-9]+$/g.test(value)) {
      setFilter(value);
      searchFilter = value;
    }
  };

  const searchWlcollection = () => {
    if (filter) {
      const result: any = _.filter(
        _.find(wlcollectionList?.content, { id: id })?.legends || [],
        (item: any) => _.includes(String(item.tokenId), filter)
      );
      setCollectionList(result);
    } else {
      setCollectionList(
        _.find(wlcollectionList?.content, { id: id })?.legends || []
      );
    }
  };

  useMemo(() => {
    if (searchFilter) {
      setSearchFilter(searchFilter);
      searchWlcollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const putLegendCollection = async (params: {
    collectionId: number;
    tokenId: number;
    stat: number;
  }) => {
    return (
      await fetcher.put(operationKeys.wlcollectionLegendUpdate[0], params)
    ).data;
  };

  const { mutate: updateLegendCollection, isLoading } = useMutation({
    mutationFn: putLegendCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.wlcollection);
      toastOpen({
        description: 'Legend 보너스가 변경 되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'Legend 보너스 변경에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    filter,
    collectionList,
    setCollectionList,
    setSearchFilter,
    searchWlcollection,
    legendStat,
    setLegendStat,
    page,
    setPage,
    updateLegendCollection,
    setInit,
    isLoading
  };
};

export default useWlCollectionListHooks;

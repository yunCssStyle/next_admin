'use client';

import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import useToast from '@/common/hook/useToast';

interface IWlcollectionList {
  totalElements: number;
  totalPages: number;
  size: number;
  content: {
    id?: number;
    collectionId: number;
    createDateTime: string;
    collectionName: string;
    havahContract: string;
    stat: number;
    legends: [
      {
        collectionId: number;
        tokenId: number;
        stat: number;
      }
    ];
  }[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
  };
  empty: boolean;
}

const useHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [page, setPage] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  const getWlcollection = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof operationKeys)['wlcollectionList']>
  >) => {
    const [_key, params] = queryKey;

    const result = (
      await fetcher.get(`${_key}?name=${params.name}&page=${params.page}`)
    ).data;
    const collections: IWlcollectionList = result.collections;
    if (collections.totalElements > totalSize) {
      setPage(0);
    }
    setTotalSize(collections.totalElements);
    return {
      ...collections,
      content: _.map([...collections.content], (item) => {
        return {
          ...item,
          id: item.collectionId,
          legends: _.map([...item.legends], (legend, index) => {
            return {
              ...legend,
              id: index,
              createDateTime: item.createDateTime,
              collectionName: item.collectionName,
              contractAddr: item.havahContract,
              wlbonus: item.stat
            };
          })
        };
      })
    };
  };

  const { data: wlcollectionList } = useQuery(
    [...operationKeys.wlcollectionList({ name, page })],
    getWlcollection
  );

  const searchWlcollection = () => {
    setName(collectionName);
  };

  const deleteCollection = async (params: { collectionId: number }) => {
    return (
      await fetcher.delete(`${operationKeys.wlcollectionDelete[0]}`, {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: removeCollection } = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.wlcollection);
      toastOpen({
        description: '해당 컬렉션이 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '해당 컬렉션삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const wlCollectionUpdate = useCallback(() => {
    if (wlcollectionList?.content.length === 0) {
      if (page === 0) return;
      setPage(page - 1);
    }
  }, [wlcollectionList, page]);

  useEffect(() => {
    wlCollectionUpdate();
  }, [wlCollectionUpdate]);

  return {
    collectionName,
    setCollectionName,
    page,
    setPage,
    wlcollectionList,
    searchWlcollection,
    removeCollection
  };
};

export default useHooks;

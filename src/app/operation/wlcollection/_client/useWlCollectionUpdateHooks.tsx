'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import { useState } from 'react';
import useToast from '@/common/hook/useToast';

const useWlCollectionUpdateHooks = (params: any) => {
  const [collectionName, setCollectionName] = useState<string>(
    params.collectionName
  );
  const [contractAddr, setContractAddr] = useState<string>(
    params.havahContract
  );
  const [stat, setStat] = useState<number>(params.stat);

  const { toastOpen } = useToast();
  const queryClient = useQueryClient();

  const putWlCollectionUpdate = async (params: {
    collectionId: number;
    collectionName: string;
    contractAddr: string;
    stat: number;
  }) => {
    return (await fetcher.put(operationKeys.wlcollectionUpdate[0], params))
      .data;
  };

  const { mutate: update } = useMutation({
    mutationFn: putWlCollectionUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.wlcollection);
      toastOpen({
        description: 'WL 컬렉션이 수정되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'WL 컬렉션 수정에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    collectionName,
    setCollectionName,
    contractAddr,
    setContractAddr,
    stat,
    setStat,
    update
  };
};

export default useWlCollectionUpdateHooks;

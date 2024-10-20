'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import { useState } from 'react';
import useToast from '@/common/hook/useToast';

const useWlCollectionCreateHooks = () => {
  const [collectionName, setCollectionName] = useState('');
  const [contractAddr, setContractAddr] = useState('');
  const [stat, setStat] = useState(0);

  const { toastOpen } = useToast();
  const queryClient = useQueryClient();

  const postWlCollectionRegistration = async (params: {
    collectionName: string;
    contractAddr: string;
    stat: number;
  }) => {
    return (
      await fetcher.post(operationKeys.wlcollectionRegistration[0], params)
    ).data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postWlCollectionRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.wlcollection);
      toastOpen({
        description: 'WL 컬렉션이 등록되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'WL 컬렉션 등록에 실패하였습니다.',
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
    registration
  };
};

export default useWlCollectionCreateHooks;

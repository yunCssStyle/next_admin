'use client';

import { useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';

const useMiningRightClearHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [description, setDescription] = useState('');

  const putMiningRightsClear = async (params: {
    memberId: number;
    mineId: number;
    description: string;
  }) => {
    return (await fetcher.put(userKeys.miningrightsClear[0], params)).data;
  };

  const { mutate: miningRightClear } = useMutation({
    mutationFn: putMiningRightsClear,
    onSuccess: (data) => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([...userKeys.miningrights(params)]);
      toastOpen({
        description: '해당 유저의 채굴권이 해제 되었습니다.',
        status: 'success'
      });
    },
    onError: (error) => {
      toastOpen({
        description: '해당 유저의 채굴권 해제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return { description, setDescription, miningRightClear };
};

export default useMiningRightClearHooks;

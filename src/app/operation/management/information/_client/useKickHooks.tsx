'use client';

import { useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';

const useKickHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [description, setDescription] = useState('');

  const putKick = async (params: {
    memberId: number;
    description: string;
    scope: string;
  }) => {
    return (await fetcher.put(userKeys.kick[0], params)).data;
  };

  const { mutate: kick } = useMutation({
    mutationFn: putKick,
    onSuccess: (data) => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([userKeys.info(params)][0]);
      toastOpen({
        description: '해당 유저가 kick 되었습니다.',
        status: 'success'
      });
    },
    onError: (error) => {
      toastOpen({
        description: '해당 유저의 kick에 실패하였습니다.',
        status: 'error'
      });
    }
  });
  return { description, setDescription, kick };
};

export default useKickHooks;

'use client';

import { useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

const useStateUpdateHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [state, setState] = useState<string | number>('');
  const [date, setDate] = useState<string | Date>('');
  const [description, setDescription] = useState('');

  const putStateUpdate = async (params: {
    memberId: number;
    state: string | number;
    date?: string | Date;
    description: string;
  }) => {
    let value = { ...params };
    if (value.date) {
      value.date = dayjs(value.date).utc().format('YYYY-MM-DD HH:mm:ss');
    }
    return (await fetcher.put(userKeys.stateUpdate[0], value)).data;
  };

  const { mutate: stateUpdate } = useMutation({
    mutationFn: putStateUpdate,
    onSuccess: () => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([userKeys.info(params)][0]);
      toastOpen({
        description: '해당 유저의 상태가 변경 되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '해당 유저의 상태변경에 실패하였습니다.',
        status: 'error'
      });
    }
  });
  return {
    description,
    setDescription,
    stateUpdate,
    state,
    setState,
    date,
    setDate
  };
};

export default useStateUpdateHooks;

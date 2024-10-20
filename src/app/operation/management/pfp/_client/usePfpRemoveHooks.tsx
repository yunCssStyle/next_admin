'use client';

import { useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';

const usePfpRemoveHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [description, setDescription] = useState('');

  const deletePfp = async (params: {
    memberId: number;
    id: number;
    description: string;
    page: number;
  }) => {
    return (
      await fetcher.delete(`${userKeys.pfpDelete[0]}`, {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: removePfp } = useMutation({
    mutationFn: deletePfp,
    onSuccess: (data, variables) => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider,
        page: variables.page
      };

      queryClient.invalidateQueries(userKeys.pfp(params));
      toastOpen({
        description: '해당 PFP가 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: (error) => {
      toastOpen({
        description: '해당 PFP삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return { description, setDescription, removePfp };
};

export default usePfpRemoveHooks;

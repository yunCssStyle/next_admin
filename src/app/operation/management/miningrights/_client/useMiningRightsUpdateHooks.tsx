'use client';

import { useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';
import { MINE_SLOT_FULL } from '@/common/constant';

const useMiningRightClearHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [mineLevel, setMineLevel] = useState(0);
  const [description, setDescription] = useState('');

  const putMiningRightsUpdate = async (params: {
    memberId: number;
    mineLevel: number;
    description: string;
  }) => {
    return (await fetcher.put(userKeys.miningrightsRegistration[0], params))
      .data;
  };

  const { mutate: miningRightsUpdate } = useMutation({
    mutationFn: putMiningRightsUpdate,
    onSuccess: (data) => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([...userKeys.miningrights(params)]);
      toastOpen({
        description: '해당 유저의 채굴권이 추가 되었습니다.',
        status: 'success'
      });
    },
    onError: (error: any) => {
      if (error.status === 412 && error.client_code === MINE_SLOT_FULL) {
        toastOpen({
          description: '해당 유저의 채굴권 슬롯이 가득 찼습니다.',
          status: 'warning'
        });
        return;
      }
      toastOpen({
        description: '해당 유저의 채굴권 추가에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    description,
    setDescription,
    miningRightsUpdate,
    mineLevel,
    setMineLevel
  };
};

export default useMiningRightClearHooks;

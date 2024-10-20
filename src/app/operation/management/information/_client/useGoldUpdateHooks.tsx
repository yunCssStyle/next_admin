'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';
import { useSearchParams } from 'next/navigation';
import {
  USER_GOLD_CHANGE_TYPE_PLUS,
  USER_GOLD_CHANGE_TYPE_MINUS
} from '@/common/constant';

const useGoldUpdateHooks = (gold: number) => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [calculationAmount, setCalculationAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(gold || 0);
  const [type, setType] = useState(USER_GOLD_CHANGE_TYPE_PLUS);
  const [description, setDescription] = useState('');

  const goldEffect = useCallback(() => {
    if (type === USER_GOLD_CHANGE_TYPE_PLUS) {
      setAmount(Number(gold) + Number(calculationAmount));
    } else if (type === USER_GOLD_CHANGE_TYPE_MINUS) {
      setAmount(Number(gold) - Number(calculationAmount));
    }
  }, [gold, type, calculationAmount, setAmount]);

  useEffect(() => {
    goldEffect();
  }, [goldEffect]);

  const putGoldUpdate = async (params: {
    memberId: number;
    type: string;
    amount: number;
    description: string;
  }) => {
    return (await fetcher.put(userKeys.goldUpdate[0], params)).data;
  };

  const { mutate: goldUpdate } = useMutation({
    mutationFn: putGoldUpdate,
    onSuccess: () => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([userKeys.info(params)][0]);
      toastOpen({
        description: 'Gold 수량이 변경 되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'Gold 수량 변경에 실패하였습니다.',
        status: 'error'
      });
    }
  });
  return {
    amount,
    type,
    description,
    setType,
    setDescription,
    calculationAmount,
    setCalculationAmount,
    goldUpdate
  };
};

export default useGoldUpdateHooks;

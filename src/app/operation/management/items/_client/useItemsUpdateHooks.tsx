'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToast from '@/common/hook/useToast';

import {
  USER_ITEM_CHANGE_TYPE_PLUS,
  USER_ITEM_CHANGE_TYPE_MINUS
} from '@/common/constant';

const useItemsUpdateHooks = ({ itemAmount }: { itemAmount: number }) => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();

  const [calculationAmount, setCalculationAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(itemAmount || 0);
  const [type, setType] = useState(USER_ITEM_CHANGE_TYPE_PLUS);
  const [description, setDescription] = useState('');

  const itemEffect = useCallback(() => {
    if (type === USER_ITEM_CHANGE_TYPE_PLUS) {
      setAmount(Number(itemAmount) + Number(calculationAmount));
    } else if (type === USER_ITEM_CHANGE_TYPE_MINUS) {
      setAmount(Number(itemAmount) - Number(calculationAmount));
    }
  }, [itemAmount, type, calculationAmount, setAmount]);

  useEffect(() => {
    itemEffect();
  }, [itemEffect]);

  const putItemUpdate = async (params: {
    memberId: number;
    category: string;
    type: string;
    amount: number;
    description: string;
  }) => {
    return (await fetcher.put(userKeys.itemsUpdate[0], params)).data;
  };

  const { mutate: itemUpdate } = useMutation({
    mutationFn: putItemUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries([userKeys.itemsUpdate][0]);
      toastOpen({
        description: 'Item 수량이 변경 되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'Item 수량 변경에 실패하였습니다.',
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
    itemUpdate
  };
};

export default useItemsUpdateHooks;

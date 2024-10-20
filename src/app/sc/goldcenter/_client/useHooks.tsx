import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { scManagerKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import useToast from '@/common/hook/useToast';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useUtils } from '@/common/hook/useUtils';

const useHooks = () => {
  const { toastOpen } = useToast();
  const { randomUint32, fromHexToDec } = useUtils();
  const queryClient = useQueryClient();

  const [revenuePot, setRevenuePot] = useState<string>('');
  const [inGamePot, setInGamePot] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [addrType, setAddrType] = useState<string>(' ');

  const postRevenuePot = async () => {
    return (await fetcher.post(scManagerKeys.revenuePot[0])).data;
  };

  const { mutate: calculate } = useMutation({
    mutationFn: postRevenuePot,
    onSuccess: () => {
      queryClient.invalidateQueries(scManagerKeys.goldInfo);
      toastOpen({
        description: 'Revenue Pot 정산요청이 되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: 'Revenue Pot 정산요청에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const getGoldInfo = async () => {
    const data = (
      await fetcher.post('/rpc', {
        id: randomUint32(),
        data: {
          method: 'getBalance',
          params: {}
        }
      })
    ).data;

    return data?.result;
  };

  const { data: goldInfo, status } = useQuery(
    [...scManagerKeys.goldInfo],
    getGoldInfo
  );

  const getTokenTransferList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof scManagerKeys)['tokenTransferList']>
  >) => {
    const [_key, params] = queryKey;
    const { page, addrType } = params;
    const result = (
      await fetcher.get('/token-transfer', {
        page: page ? page + 1 : 0,
        addrType
      })
    ).data;
    return {
      ...result,
      data: [...result.data].map((item: any, index) => {
        return {
          ...item,
          id: new Date(item.timestamp).toLocaleString() + index
        };
      })
    };
  };

  const { data: tokenTransferList } = useQuery(
    [...scManagerKeys.tokenTransferList({ page, addrType })],
    getTokenTransferList
  );

  useEffect(() => {
    if (goldInfo) {
      if (status === 'success' && goldInfo.revenuePot > 0) {
        setDisabled(false);
      }
      setInGamePot(
        new BigNumber(fromHexToDec(goldInfo.inGamePot))
          .dividedBy(10 ** 18)
          .toString()
      );
      setRevenuePot(
        new BigNumber(fromHexToDec(goldInfo.revenuePot))
          .dividedBy(10 ** 18)
          .toString()
      );
    }
  }, [goldInfo, fromHexToDec, status]);

  return {
    revenuePot,
    inGamePot,
    calculate,
    disabled,
    tokenTransferList,
    page,
    setPage,
    addrType,
    setAddrType
  };
};

export default useHooks;

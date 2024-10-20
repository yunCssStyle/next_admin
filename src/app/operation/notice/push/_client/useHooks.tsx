'use client';

import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { fetcher } from '@/common/api';
import { pushMessageKeys } from '@/common/key/serverKey';
import { useState } from 'react';
import useToast from '@/common/hook/useToast';

type TPushMessageInfo = {
  title: string;
  description: string;
  reason: string;
};

type TPushMessageInfoUpdate = TPushMessageInfo & {
  id: number;
};

const UseHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const getPushList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof pushMessageKeys)['list']>>) => {
    const [_key, page] = queryKey;
    return (await fetcher.get(`${_key}?page=${page}`)).data;
  };

  const { data: list } = useQuery(
    [...pushMessageKeys.list({ page })],
    getPushList
  );

  const [pushMessageInfo, setPushMessageInfo] = useState<TPushMessageInfo>({
    title: '',
    description: '',
    reason: ''
  });

  const postPushRegistration = async (params: TPushMessageInfo) => {
    return (await fetcher.post(pushMessageKeys.registration[0], params)).data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postPushRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries([pushMessageKeys.list({ page })][0]);
      toastOpen({
        description: '푸시 메시지가 등록되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '푸시 메시지가 등록에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const putPushUpdate = async (params: TPushMessageInfoUpdate) => {
    return (await fetcher.put(pushMessageKeys.update[0], params)).data;
  };

  const { mutate: update } = useMutation({
    mutationFn: putPushUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries([pushMessageKeys.list({ page })][0]);
      toastOpen({
        description: '푸시 메시지가 수정되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '푸시 메시지가 수정에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const deletePushList = async (params: { id: number }) => {
    return (
      await fetcher.delete(pushMessageKeys.delete[0], {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: deletePush } = useMutation({
    mutationFn: deletePushList,
    onSuccess: () => {
      queryClient.invalidateQueries([pushMessageKeys.list({ page })][0]);
      toastOpen({
        description: '푸시 메시지가 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '푸시 메시지가 삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    list,
    setPage,
    registration,
    pushMessageInfo,
    setPushMessageInfo,
    update,
    deletePush
  };
};

export default UseHooks;

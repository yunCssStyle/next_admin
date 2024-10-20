'use client';

import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { fetcher } from '@/common/api';
import { instanceMessageKeys } from '@/common/key/serverKey';
import { useState } from 'react';
import useToast from '@/common/hook/useToast';

const UseHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const getInstanceList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof instanceMessageKeys)['list']>
  >) => {
    const [_key, page] = queryKey;
    return (await fetcher.get(`${_key}?page=${page}`)).data;
  };

  const { data: list } = useQuery(
    [...instanceMessageKeys.list({ page })],
    getInstanceList
  );

  const [instanceMessageInfo, setInstanceMessageInfo] = useState({
    title: '',
    description: '',
    reason: ''
  });

  const postInstanceRegistration = async (params: {
    title: string;
    description: string;
    reason: string;
  }) => {
    return (await fetcher.post(instanceMessageKeys.registration[0], params))
      .data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postInstanceRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries([instanceMessageKeys.list({ page })][0]);
      toastOpen({
        description: '인스턴스 메시지가 등록되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '인스턴스 메시지가 등록에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const putInstanceUpdate = async (params: {
    id: number;
    title: string;
    description: string;
    reason: string;
  }) => {
    return (await fetcher.put(instanceMessageKeys.update[0], params)).data;
  };

  const { mutate: update } = useMutation({
    mutationFn: putInstanceUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries([instanceMessageKeys.list({ page })][0]);
      toastOpen({
        description: '인스턴스 메시지가 수정되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '인스턴스 메시지가 수정에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const deleteInstanceList = async (params: { id: number }) => {
    return (
      await fetcher.delete(instanceMessageKeys.delete[0], {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: deleteInstance } = useMutation({
    mutationFn: deleteInstanceList,
    onSuccess: () => {
      queryClient.invalidateQueries([instanceMessageKeys.list({ page })][0]);
      toastOpen({
        description: '인스턴스 메시지가 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '인스턴스 메시지 삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    list,
    setPage,
    registration,
    instanceMessageInfo,
    setInstanceMessageInfo,
    update,
    deleteInstance
  };
};

export default UseHooks;

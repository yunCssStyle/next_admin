import { useState } from 'react';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import useToast from '@/common/hook/useToast';
import _ from 'lodash';
import dayjs from 'dayjs';
import { MEMBER_NOT_FOUND } from '@/common/constant';

const useHooks = () => {
  const queryClient = useQueryClient();
  const { toastOpen } = useToast();

  const [memberId, setMemberId] = useState<string | number>('');
  const [expiredDateTime, setExpiredDateTime] = useState<string | number>('');

  const getInspectWlList = async ({ queryKey }: QueryFunctionContext) => {
    const [_key] = queryKey;
    const result = (await fetcher.get(`${_key}`)).data.whiteLists;

    return _.chain(result)
      .filter((item) => item)
      .map((item) => ({
        id: item.memberId,
        memberId: item.memberId,
        expiredDateTime: item.expiredDateTime
      }))
      .value();
  };

  const { data: inspectWlList } = useQuery(
    [...operationKeys.inspectWlList],
    getInspectWlList
  );

  const postInspectWlRegistration = async (params: {
    memberId: number | string;
    expire: string | number;
  }) => {
    const expireMinutes = dayjs().utc().diff(params.expire, 'minutes');
    const value = { ...params, expire: Math.abs(expireMinutes) + 2 };
    return (await fetcher.post(operationKeys.inspectWlRegistration[0], value))
      .data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postInspectWlRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.inspectWlList);
      toastOpen({
        description: '점검 WL 명단이 등록되었습니다.',
        status: 'success'
      });
      setMemberId('');
      setExpiredDateTime('');
    },
    onError: (e: any) => {
      if (e?.client_code === MEMBER_NOT_FOUND) {
        toastOpen({
          description:
            '존재하지 않는 UID 입니다. 다른 UID를 입력 하여 등록해 주세요.',
          status: 'warning'
        });
      } else {
        toastOpen({
          description: '점검 WL 명단 등록에 실패하였습니다.',
          status: 'error'
        });
      }
    }
  });

  const deleteInspectWL = async (params: { memberId: string }) => {
    return (
      await fetcher.delete(`${operationKeys.inspectWlDelete[0]}`, {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: remove } = useMutation({
    mutationFn: deleteInspectWL,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.inspectWlList);
      toastOpen({
        description: '점검 명단이 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '점검 명단 삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    memberId,
    setMemberId,
    expiredDateTime,
    setExpiredDateTime,
    inspectWlList,
    registration,
    remove
  };
};

export default useHooks;

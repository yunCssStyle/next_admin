import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import useToast from '@/common/hook/useToast';
import { inspectLimitType } from '@/common/config';
import dayjs from 'dayjs';
import { INSPECT_LIMIT_TYPE_WEB } from '@/common/constant';

const useInspectUpdateHooks = () => {
  const queryClient = useQueryClient();
  const { toastOpen } = useToast();

  const [scope, setScope] = useState(inspectLimitType[0].value);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const postInspectLimitDetail = async (params: { id: string }) => {
    return (await fetcher.post(operationKeys.inspectLimitDetail[0], params))
      .data;
  };

  const { mutate: detail } = useMutation({
    mutationFn: postInspectLimitDetail,
    onSuccess: (data) => {
      const start = dayjs(data.startDateTime)
        .add(9, 'hour')
        .format('YYYY-MM-DD HH:mm:ss');
      const end = dayjs(data.endDateTime)
        .add(9, 'hour')
        .format('YYYY-MM-DD HH:mm:ss');
      setScope(data.scope);
      setTitle(data.title);
      setMessage(data.message);
      setStartDateTime(start);
      setEndDateTime(end);
    },
    onError: () => {
      toastOpen({
        description: '접속 차단 스케쥴 상세 내용 가져오기에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const putInspectLimitUpdate = async (params: {
    id: string;
    scope: string;
    title: string;
    message: string;
    startDateTime: string;
    endDateTime: string;
  }) => {
    const request = {
      ...params,
      title: params.scope === INSPECT_LIMIT_TYPE_WEB ? '-' : params.title,
      startDateTime: dayjs(params.startDateTime)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: dayjs(params.endDateTime).utc().format('YYYY-MM-DD HH:mm:ss')
    };
    return (
      await fetcher.put(operationKeys.inspectLimitRegistration[0], request)
    ).data;
  };

  const { mutate: update } = useMutation({
    mutationFn: putInspectLimitUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.inspectLimit);
      toastOpen({
        description: '접속 차단 스케쥴이 수정되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '접속 차단 스케쥴 수정에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  const deleteInspectLimit = async (params: { id: string }) => {
    return (
      await fetcher.delete(`${operationKeys.inspectLimitDelete[0]}`, {
        data: params,
        withCredentials: true
      })
    ).data;
  };

  const { mutate: remove } = useMutation({
    mutationFn: deleteInspectLimit,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.inspectLimit);
      toastOpen({
        description: '해당 접속 차단 스케쥴이 삭제되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '해당 접속 차단 스케쥴 삭제에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    scope,
    setScope,
    title,
    setTitle,
    message,
    setMessage,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    detail,
    update,
    remove
  };
};

export default useInspectUpdateHooks;

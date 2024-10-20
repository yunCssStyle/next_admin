import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import useToast from '@/common/hook/useToast';
import { inspectLimitType } from '@/common/config';
import dayjs from 'dayjs';
import { INSPECT_LIMIT_TYPE_WEB } from '@/common/constant';

const useInspectCreateHooks = () => {
  const queryClient = useQueryClient();
  const { toastOpen } = useToast();

  const [scope, setScope] = useState(inspectLimitType[0].value);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const postInspectLimitRegistration = async (params: {
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
      await fetcher.post(operationKeys.inspectLimitRegistration[0], request)
    ).data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postInspectLimitRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.inspectLimit);
      toastOpen({
        description: '접속 차단 스케쥴이 등록되었습니다.',
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: '접속 차단 스케쥴 등록에 실패하였습니다.',
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
    registration
  };
};

export default useInspectCreateHooks;

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
import { inspectLimitType } from '@/common/config';

const useKickCreateHooks = () => {
  const queryClient = useQueryClient();
  const { toastOpen } = useToast();

  const [scope, setScope] = useState(inspectLimitType[0].value);
  const [description, setDescription] = useState('');

  const getAccessUser = async ({ queryKey }: QueryFunctionContext) => {
    const [_key] = queryKey;
    return (await fetcher.get(`${_key}`)).data;
  };

  const { data: accessUser } = useQuery(
    [...operationKeys.accessUser],
    getAccessUser
  );

  const getKickAllValid = async ({ queryKey }: QueryFunctionContext) => {
    const [_key, params] = queryKey;
    return (await fetcher.post(`${_key}`, params)).data;
  };

  const { data: kickAllValid } = useQuery(
    [...operationKeys.kickAllConfirm({ scope })],
    getKickAllValid
  );

  const postKickAllRegistration = async (params: {
    scope: string;
    description: string;
  }) => {
    return (await fetcher.post(operationKeys.kickAllRegistration[0], params))
      .data;
  };

  const { mutate: registration } = useMutation({
    mutationFn: postKickAllRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries(operationKeys.kickAll);
      toastOpen({
        description: `${scope} Kick이 등록되었습니다.`,
        status: 'success'
      });
    },
    onError: () => {
      toastOpen({
        description: `${scope} Kick 등록에 실패하였습니다.`,
        status: 'error'
      });
    }
  });

  return {
    scope,
    setScope,
    description,
    setDescription,
    accessUser,
    kickAllValid,
    registration
  };
};

export default useKickCreateHooks;

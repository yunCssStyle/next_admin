import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import _ from 'lodash';

const useNickNameUpdateList = (memberId: number) => {
  const getNicknameUpdateList = async ({ queryKey }: QueryFunctionContext) => {
    const [_key] = queryKey;
    const result = (await fetcher.get(`${_key}?memberId=${memberId}`)).data
      .histories;
    return _.map(result, (item, index) => {
      return {
        ...item,
        id: `${item.logId}-${index}`
      };
    });
  };

  const { data: nicknameUpdateList } = useQuery(
    [...userKeys.nicknameHistory],
    getNicknameUpdateList
  );

  return { nicknameUpdateList };
};

export default useNickNameUpdateList;

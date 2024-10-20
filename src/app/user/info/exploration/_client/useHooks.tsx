import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { searchUserType } from '@/common/config';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { userKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';

interface IResponseBody {
  memberId: number;
  nickname: string;
  startDate: string | Date;
  endDate: string | Date;
}

const UseHooks = () => {
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';

  const [type, setType] = useState('');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [provider, setProvider] = useState('');

  const searchEffect = useCallback(() => {
    if (searchType) {
      setType(
        searchType === searchUserType[2].value ||
          searchType === searchUserType[3].value
          ? 'EMAIL'
          : searchType
      );
      setKeyword(searchParams.get('keyword') || '');
      setProvider(
        searchType === searchUserType[2].value ||
          searchType === searchUserType[3].value
          ? searchType
          : ''
      );
    }
  }, [searchParams, searchType]);

  useEffect(() => {
    searchEffect();
  }, [searchEffect]);

  // 유저 조회 > 유저 정보
  // 탐사
  const postExploration = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['exploration']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '')
      return {
        memberId: 0,
        nickname: '',
        startDate: '',
        endDate: ''
      };
    return (await fetcher.post(_key, params)).data as IResponseBody;
  };

  const { data: explorationDateRange } = useQuery(
    [...userKeys.exploration({ type, keyword, provider })],
    postExploration
  );

  return { explorationDateRange };
};

export default UseHooks;

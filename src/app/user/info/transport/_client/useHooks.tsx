'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { searchUserType } from '@/common/config';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { userKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import _ from 'lodash';

interface IResponseBody {
  memberId: number;
  nickname: string;
  transports: {
    seq?: number;
    date: string | Date;
    fee: number;
    amount: number;
    status: string;
  }[];
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

  // 유저 조회 > 유저 정보 & 운영 관리 > 유저 관리
  // 수송
  const postTransportList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['transport']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '')
      return {
        memberId: 0,
        nickname: '',
        transports: []
      };
    const result = (await fetcher.post(_key, params)).data as IResponseBody;
    if ((typeof result as string) === 'string') return result as IResponseBody;
    return {
      ...result,
      transports: _.map(result.transports, (item, index) => {
        return { ...item, seq: index + 1, id: index };
      })
    };
  };

  const { data: transportList } = useQuery(
    [...userKeys.transport({ type, keyword, provider })],
    postTransportList
  );
  return { transportList };
};

export default UseHooks;

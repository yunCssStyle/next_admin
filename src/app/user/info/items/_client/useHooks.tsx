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
  items: {
    name: number;
    amount: number;
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
  // 채굴권
  const postItemsList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['items']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '')
      return {
        memberId: 0,
        nickname: '',
        items: []
      };
    const result = (await fetcher.post(_key, params)).data as IResponseBody;
    if ((typeof result as string) === 'string') return result as IResponseBody;
    return {
      ...result,
      items: _.map(result.items, (item, index) => {
        return { ...item, id: item.name + index };
      })
    };
  };

  const { data: itemsList } = useQuery(
    [...userKeys.items({ type, keyword, provider })],
    postItemsList
  );
  return { itemsList };
};

export default UseHooks;

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
  mines: {
    mineId: number;
    level: number;
    miningPower: number;
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
  const postMiningRightsList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['miningrights']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '')
      return {
        memberId: 0,
        nickname: '',
        mines: []
      };
    const result = (await fetcher.post(_key, params)).data as IResponseBody;
    if ((typeof result as string) === 'string') return result as IResponseBody;
    return {
      ...result,
      mines: _.map(result.mines, (item) => {
        return { ...item, id: item.mineId };
      })
    };
  };

  const { data: miningrightsList } = useQuery(
    [...userKeys.miningrights({ type, keyword, provider })],
    postMiningRightsList
  );
  return { miningrightsList };
};

export default UseHooks;

'use client';

import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchUserType } from '@/common/config';

interface IResponseBody {
  memberId: number;
  nickname: string;
  signUpDate: string;
  lastLoginDate: string;
  platform: string;
  email: string;
  appConnect: boolean;
  webConnect: boolean;
  status: string;
  gold: number;
  packingGold: number;
  mp: number;
  tier: string;
  blockExpireDate: string;
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
  // 기본 정보
  const postUserInfo = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['info']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '')
      return {
        memberId: 0,
        nickname: '',
        signUpDate: '',
        lastLoginDate: '',
        platform: '',
        email: '',
        appConnect: false,
        webConnect: false,
        status: '',
        gold: 0,
        packingGold: 0,
        mp: 0,
        tier: '',
        blockExpireDate: ''
      };
    return (await fetcher.post(_key, params)).data as IResponseBody;
  };

  const { data: userInfo } = useQuery(
    [...userKeys.info({ type, keyword, provider })],
    postUserInfo
  );

  return { userInfo };
};

export default UseHooks;

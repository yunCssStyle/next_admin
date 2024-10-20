'use client';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys, userKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { paymentPlatformType, searchUserType } from '@/common/config';
import { useSearchParams } from 'next/navigation';
import { USER_PLATFORM_TYPE_ALL } from '@/common/constant';

interface IResponseBody {
  memberId: number;
  nickname: string;
  signUpDate: string;
  lastLoginDate: string;
  platform: string;
  email: string;
  connect: boolean;
  status: string;
  gold: number;
  packingGold: number;
  mp: number;
  tier: string;
}

const useHooks = () => {
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';

  const [types, setTypes] = useState('');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [provider, setProvider] = useState('');

  const searchEffect = useCallback(() => {
    if (searchType) {
      setTypes(
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
        connect: false,
        status: '',
        gold: 0,
        packingGold: 0,
        mp: 0,
        tier: ''
      };
    return (await fetcher.post(_key, params)).data as IResponseBody;
  };

  const { data: userInfo } = useQuery(
    [...userKeys.info({ type: types, keyword, provider })],
    postUserInfo
  );

  const [type, setType] = useState<string>(paymentPlatformType[0].value);
  const [startDateTime, setStartDateTime] = useState<string>();
  const [endDateTime, setEndDateTime] = useState<string>();
  const [memberId, setMemberId] = useState<number>();
  const [orderId, setOrderId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState({
    startDateTime,
    endDateTime,
    type,
    memberId,
    orderId
  });

  const postPaymentList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof operationKeys)['paymentList']>
  >) => {
    const [_key, params] = queryKey;
    let values = {
      ...params
    };
    if (params.startDateTime) values.startDateTime = params.startDateTime;
    if (params.endDateTime) values.endDateTime = params.endDateTime;
    if (params.type)
      values.type = params.type === USER_PLATFORM_TYPE_ALL ? '' : params.type;
    if (!values.startDateTime || !values.endDateTime) return {};
    const result = (await fetcher.post(_key, values)).data.purchases;
    return {
      ...result,
      content: _.map(result.content, (item, index) => {
        return {
          ...item,
          id: `${item.logId}-${index}`
        };
      })
    };
  };

  const { data: paymentList } = useQuery(
    [...operationKeys.paymentList({ ...filter, page })],
    postPaymentList
  );

  return {
    type,
    setType,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    memberId,
    setMemberId,
    orderId,
    setOrderId,
    page,
    setPage,
    paymentList,
    setFilter,
    userInfo
  };
};

export default useHooks;

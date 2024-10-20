import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import dayjs from 'dayjs';
import { fetcher } from '@/common/api';
import _ from 'lodash';
import { useState } from 'react';
import { paymentPlatformType } from '@/common/config';

const useHooks = () => {
  const [type, setType] = useState<string>(paymentPlatformType[0].value);
  const [startDateTime, setStartDateTime] = useState<string>();
  const [endDateTime, setEndDateTime] = useState<string>();
  const [memberId, setMemberId] = useState<number | string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState({
    startDateTime,
    endDateTime,
    type,
    memberId,
    orderId
  });

  const postLogList = async ({
    queryKey
  }: QueryFunctionContext<
    ReturnType<(typeof operationKeys)['paymentList']>
  >) => {
    const [_key, params] = queryKey;
    const values = {
      ...params,
      type: params.type === paymentPlatformType[0].value ? '' : params.type,
      startDateTime: params.startDateTime
        ? dayjs(params.startDateTime).format('YYYY-MM-DD HH:mm:ss')
        : '',
      endDateTime: params.endDateTime
        ? dayjs().format('YYYY-MM-DD HH:mm:ss')
        : ''
    };

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

  const { data: paymentList, refetch } = useQuery(
    [...operationKeys.paymentList({ ...filter, page })],
    postLogList,
    {
      enabled: false
    }
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
    refetch
  };
};

export default useHooks;

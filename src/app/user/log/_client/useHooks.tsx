import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { userKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import _ from 'lodash';
import { PAGE_SIZE } from '@/common/constant';

const useHooks = () => {
  const [keyword, setKeyword] = useState<number>();
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [logId, setLogId] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [filter, setFilter] = useState({
    keyword,
    startDateTime,
    endDateTime,
    logId
  });

  const handleFilter = async () => {
    setFilter({
      keyword,
      startDateTime,
      endDateTime,
      logId
    });
  };

  const postLogList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['logs']>>) => {
    const [_key, params] = queryKey;
    const values = {
      ...params,
      startDateTime: dayjs(params.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: dayjs(params.endDateTime).format('YYYY-MM-DD HH:mm:ss')
    };
    if (
      values.startDateTime === 'Invalid Date' ||
      values.endDateTime === 'Invalid Date'
    )
      return [];
    const result = (await fetcher.post(_key, values)).data;

    setTotalPage(Math.ceil(result.length / PAGE_SIZE));

    return _.map(result, (item, index) => {
      let logContents = [];
      for (let i = 1; i < 10; i++) {
        item[`column${i}`] && logContents.push(item[`column${i}`]);
      }
      return {
        ...item,
        id: `${item.request_id}-${index}`,
        logContents: logContents
      };
    });
  };

  const { data: logData, isLoading } = useQuery(
    [...userKeys.logs({ ...filter })],
    postLogList
  );

  return {
    keyword,
    setKeyword,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    logId,
    setLogId,
    page,
    setPage,
    logData,
    totalPage,
    handleFilter,
    isLoading
  };
};

export default useHooks;

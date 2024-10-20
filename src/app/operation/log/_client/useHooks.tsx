import { useState } from 'react';
import dayjs from 'dayjs';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { operationKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import _ from 'lodash';

const useHooks = () => {
  const [startDateTime, setStartDateTime] = useState<string>('');
  const [endDateTime, setEndDateTime] = useState<string>('');
  const [logId, setLogId] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState({
    startDateTime,
    endDateTime,
    logId
  });

  const handleFilter = () => {
    setFilter({
      startDateTime,
      endDateTime,
      logId
    });
  };

  const postLogList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof operationKeys)['logs']>>) => {
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
      return {};
    const result = (await fetcher.post(_key, values)).data.adminLogs;
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

  const { data: logList } = useQuery(
    [...operationKeys.logs({ ...filter, page })],
    postLogList
  );

  return {
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    logId,
    setLogId,
    page,
    setPage,
    logList,
    handleFilter
  };
};

export default useHooks;

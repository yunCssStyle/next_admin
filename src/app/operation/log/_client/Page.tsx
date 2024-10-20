'use client';

import { Box, Paper } from '@mui/material';
import {
  CommonButton,
  SelectCheckbox,
  SelectDateTimeRange
} from '@/common/component/Form';
import { adminLogList } from '@/common/config';
import Typography from '@mui/material/Typography';
import { log } from '@/app/operation/log/_client/columns/log';
import { DataTable } from '@/common/component/Table';
import useHooks from '@/app/operation/log/_client/useHooks';
import _ from 'lodash';

const Page = () => {
  const {
    startDateTime,
    endDateTime,
    setEndDateTime,
    setStartDateTime,
    logId,
    setLogId,
    page,
    setPage,
    logList,
    handleFilter
  } = useHooks();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', pb: 2 }}>
        <Typography variant={'h5'}>작업 로그</Typography>
      </Box>
      <Box sx={{ p: 2, mb: 2 }} component={Paper}>
        <Box sx={{ pb: 2 }}>
          <Typography variant={'h6'} sx={{ pb: 0.5 }}>
            조회 기간
          </Typography>
          <SelectDateTimeRange
            seconds={true}
            handle={(value) => {
              setStartDateTime(value.startDateTime as string);
              setEndDateTime(value.endDateTime as string);
            }}
          />
        </Box>

        <Box sx={{ pb: 2 }}>
          <Typography variant={'h6'}>조회 로그명</Typography>
          <Box>
            <SelectCheckbox
              checkAll={true}
              checkList={adminLogList}
              handle={(values) => {
                setLogId(
                  _.chain(values)
                    .filter((item) => item.checked === true)
                    .map((item: { label: string; value: number }) => item.value)
                    .value() as unknown as number[]
                );
              }}
            />
          </Box>
        </Box>

        <Box>
          <CommonButton
            disabled={!startDateTime || !endDateTime || logId.length < 1}
            handle={handleFilter}
          />
        </Box>
      </Box>

      <DataTable
        columns={log}
        data={logList?.content || []}
        page={page}
        totalPage={logList?.totalPages || 0}
        minHeight={578}
        autoRowHeight={true}
        handlePage={setPage}
      />
    </>
  );
};

export default Page;

'use client';

import { Box, Paper } from '@mui/material';
import {
  CommonButton,
  QuantityInput,
  SelectCheckbox,
  SelectDateTimeRange
} from '@/common/component/Form';
import { logList } from '@/common/config';
import Typography from '@mui/material/Typography';
import { log } from '@/app/user/log/_client/columns/log';
import { DataTable } from '@/common/component/Table';
import useHooks from '@/app/user/log/_client/useHooks';
import _ from 'lodash';
import { PAGE_SIZE } from '@/common/constant';

const Page = () => {
  const {
    logData,
    keyword,
    setKeyword,
    logId,
    setLogId,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    handleFilter,
    page,
    setPage,
    totalPage,
    isLoading
  } = useHooks();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', pb: 2 }}>
        <Typography variant={'h5'}>유저 로그 조회</Typography>
      </Box>
      <Box sx={{ p: 2, mb: 2 }} component={Paper}>
        <Typography variant={'h6'} sx={{ pb: 0.5 }}>
          UID
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, pb: 2 }}>
          <Box sx={{ width: 300 }}>
            <QuantityInput
              placeholder={'조회하실 유저의 UID를 입력해주세요.'}
              defaultValue={keyword}
              handle={setKeyword}
              fullWidth={true}
            />
          </Box>
          <Typography
            variant={'caption'}
            sx={{ color: 'red', alignSelf: 'end' }}
          >
            * [UID = 앱 노출 UID - 104328]
          </Typography>
        </Box>

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
          <Box sx={{ overflowY: 'auto', maxHeight: 220 }}>
            <SelectCheckbox
              checkAll={true}
              checkList={logList}
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
            disabled={!keyword || !endDateTime || logId.length < 1}
            handle={handleFilter}
          />
        </Box>
      </Box>

      <DataTable
        columns={log}
        data={logData}
        pageSize={PAGE_SIZE}
        page={page || 0}
        handlePage={setPage}
        totalPage={totalPage}
        minHeight={578}
        autoRowHeight={true}
        clientPagination={true}
        loading={isLoading}
      />
    </>
  );
};

export default Page;

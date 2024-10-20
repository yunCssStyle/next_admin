'use client';

import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import {
  CommonButton,
  SearchInput,
  SearchSelect,
  SelectDateTimeRange
} from '@/common/component/Form';
import { paymentPlatformType } from '@/common/config';
import { DataTable } from '@/common/component/Table';
import { payment } from '@/app/operation/payment/_client/columns/payment';
import useHooks from '@/app/operation/payment/_client/useHooks';

const Page = () => {
  const {
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
  } = useHooks();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', pb: 2 }}>
        <Typography variant={'h5'}>결제 관리</Typography>
      </Box>

      <Box sx={{ p: 2, mb: 2 }} component={Paper}>
        <Box sx={{ display: 'flex', pb: 1, gap: 1 }}>
          <SearchSelect
            selectOptions={paymentPlatformType}
            defaultSelect={type}
            handle={setType}
          />
          <SelectDateTimeRange
            seconds={true}
            handle={(value) => {
              setStartDateTime(value.startDateTime as string);
              setEndDateTime(value.endDateTime as string);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SearchInput
            placeholder={'UID를 입력해주세요.'}
            halfwidth={true}
            defaultValue={memberId}
            handle={setMemberId}
          />
          <SearchInput
            placeholder={'영수증 번호를 입력해주세요.'}
            halfwidth={true}
            defaultValue={orderId}
            handle={setOrderId}
          />
        </Box>

        <Typography
          variant={'caption'}
          sx={{ display: 'flex', color: 'red', alignSelf: 'start', pb: 1 }}
        >
          * [UID = 앱 노출 UID - 104328]
        </Typography>

        <CommonButton
          disabled={
            (!startDateTime && !endDateTime && !memberId && !orderId) ||
            (!!startDateTime && !endDateTime)
          }
          fullWidth={true}
          handle={async () => {
            await setFilter({
              startDateTime,
              endDateTime,
              type,
              memberId,
              orderId
            });
            await refetch();
          }}
        />
      </Box>

      <DataTable
        columns={payment}
        data={paymentList?.content}
        totalPage={paymentList?.totalPages}
        page={page}
        handlePage={setPage}
        minHeight={578}
        autoRowHeight={true}
      />
    </>
  );
};

export default Page;

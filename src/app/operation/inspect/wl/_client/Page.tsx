'use client';

import { Box, FormControl, Paper, Typography } from '@mui/material';
import {
  CommonButton,
  QuantityInput,
  SelectDateTime
} from '@/common/component/Form';
import { wl } from '@/app/operation/inspect/wl/_client/columns/wl';
import { DataTable } from '@/common/component/Table';
import useHooks from '@/app/operation/inspect/wl/_client/useHooks';
import _ from 'lodash';
import dayjs from 'dayjs';

const Page = () => {
  const {
    memberId,
    setMemberId,
    expiredDateTime,
    setExpiredDateTime,
    inspectWlList,
    registration
  } = useHooks();

  return (
    <>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          점검 WL 등록
        </Typography>
        <FormControl variant={'standard'} error={false} fullWidth={true}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <QuantityInput
              aria-describedby={'search-input-text'}
              placeholder={'UID를 입력해주세요.'}
              defaultValue={memberId}
              handle={setMemberId}
            />
            <SelectDateTime
              defaultDateTime={dayjs(expiredDateTime)}
              disabledPast={true}
              timezone={'UTC'}
              handle={setExpiredDateTime}
            />
            <CommonButton
              disabled={
                memberId === '' ||
                expiredDateTime === '' ||
                !!_.find(inspectWlList, {
                  memberId: parseInt(memberId as string)
                })
              }
              label={'등록'}
              searchButton={true}
              handle={() => registration({ memberId, expire: expiredDateTime })}
            />
          </Box>
        </FormControl>
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          점검 WL 명단
        </Typography>
        <DataTable columns={wl} data={inspectWlList} minHeight={578} />
      </Box>
    </>
  );
};

export default Page;

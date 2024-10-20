'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { DataTable } from '@/common/component/Table';
import { payment } from '@/app/user/info/payment/_client/columns/payment';
import {
  CommonButton,
  SearchInput,
  SearchSelect
} from '@/common/component/Form';
import { paymentPlatformType } from '@/common/config';
import useHooks from '@/app/user/info/payment/_client/useHooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA, USER_PLATFORM_TYPE_ALL } from '@/common/constant';
import dayjs from 'dayjs';

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
    userInfo
  } = useHooks();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((userInfo as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    } else {
      setMemberId(userInfo?.memberId);
      setStartDateTime(userInfo?.signUpDate);
      setEndDateTime(dayjs().utc().format('YYYY-MM-DD HH:mm:ss'));
      setFilter({
        startDateTime: userInfo?.signUpDate,
        endDateTime: dayjs().utc().format('YYYY-MM-DD HH:mm:ss'),
        type,
        memberId: userInfo?.memberId,
        orderId
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, routerEffect]);

  return (
    <>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={userInfo?.memberId} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={userInfo?.nickname} />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <SearchSelect
          selectOptions={paymentPlatformType}
          defaultSelect={type}
          handle={setType}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SearchInput
            placeholder={'영수증 번호를 입력해주세요.'}
            halfwidth={true}
            defaultValue={orderId}
            handle={setOrderId}
          />
          <CommonButton
            searchButton={true}
            handle={() => {
              setFilter({
                startDateTime,
                endDateTime,
                type,
                memberId,
                orderId
              });
            }}
          />
        </Box>
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

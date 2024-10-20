'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import ModalNickName from '@/app/user/info/information/_client/ModalNickName';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { CommonButton } from '@/common/component/Form';
import useHooks from '@/app/user/info/information/_client/useHooks';
import _ from 'lodash';
import { userStatus, userTire } from '@/common/config';
import { rowStyle } from '@/common/theme/styles';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NO_SEARCH_DATA } from '@/common/constant';
import { useUtils } from '@/common/hook/useUtils';

const Page = () => {
  const { modal } = popupKeys;
  const { Modal, modalOpen } = useModal(modal);

  const { userInfo } = useHooks();
  const { numberWithCommas } = useUtils();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((userInfo as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
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
            <CommonButton
              label={'변경 이력'}
              variant={'contained'}
              size={'small'}
              sx={{ ml: 2 }}
              handle={() => {
                modalOpen(<ModalNickName userInfo={userInfo} />);
              }}
            />
          </ListItem>
        </List>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                가입일시
              </TableCell>
              <TableCell align="left">{userInfo?.signUpDate}</TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                최종 접속일
              </TableCell>
              <TableCell align="left">{userInfo?.lastLoginDate}</TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                연동된 ID (구글/애플)
              </TableCell>
              <TableCell align="left">
                {userInfo?.platform} / {userInfo?.email}
              </TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                App 접속 상태
              </TableCell>
              <TableCell align="left">
                {userInfo?.appConnect ? '로그인' : '로그아웃'}
              </TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                Web 접속 상태
              </TableCell>
              <TableCell align="left">
                {userInfo?.webConnect ? '로그인' : '로그아웃'}
              </TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                계정 상태
              </TableCell>
              <TableCell align="left">
                {`${
                  _.find(userStatus, { value: userInfo?.status })?.label || '-'
                }${
                  userInfo?.blockExpireDate
                    ? ` (${userInfo?.blockExpireDate})`
                    : ''
                }`}
              </TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                보유 Gold
              </TableCell>
              <TableCell align="left">
                {numberWithCommas(userInfo?.gold || '0')} Gold
              </TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                MP
              </TableCell>
              <TableCell align="left">{userInfo?.mp}</TableCell>
              <TableCell align="right" />
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                티어
              </TableCell>
              <TableCell align="left">
                {_.find(userTire, { value: userInfo?.tier })?.label}
              </TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal />
    </>
  );
};

export default Page;

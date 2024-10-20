'use client';

import {
  Box,
  Button,
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
  TableRow,
  Tooltip
} from '@mui/material';
import ModalNickName from '@/app/operation/management/information/_client/ModalNickName';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ModalKick from '@/app/operation/management/information/_client/ModalKick';
import ModalNickUpdate from '@/app/operation/management/information/_client/ModalNickUpdate';
import ModalStateUpdate from '@/app/operation/management/information/_client/ModalStateUpdate';
import ModalGoldUpdate from '@/app/operation/management/information/_client/ModalGoldUpdate';
import { CommonButton } from '@/common/component/Form';
import { rowStyle } from '@/common/theme/styles';
import useHooks from '@/app/operation/management/information/_client/useHooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import {
  INSPECT_LIMIT_TYPE_APP,
  INSPECT_LIMIT_TYPE_WEB,
  NO_SEARCH_DATA
} from '@/common/constant';
import _ from 'lodash';
import { userStatus, userTire } from '@/common/config';
import { useUtils } from '@/common/hook/useUtils';

const Page = () => {
  const { modal } = popupKeys;
  const { Modal, modalOpen } = useModal(modal);

  const { userInfo } = useHooks();
  const { numberWithCommas } = useUtils();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/operation/management?empty=true');
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
            <Box>
              <CommonButton
                label={'변경 이력'}
                variant={'contained'}
                size={'small'}
                sx={{ ml: 2 }}
                handle={() => {
                  modalOpen(<ModalNickName userInfo={userInfo} />);
                }}
              />

              <Tooltip
                title={
                  <>
                    유저의 닉네임을 변경하기 전<br />
                    반드시 Kick을 먼저 진행 후 변경해 주세요
                  </>
                }
              >
                <Button
                  variant={'contained'}
                  size={'small'}
                  sx={{ ml: 2 }}
                  onClick={() => {
                    modalOpen(<ModalNickUpdate userInfo={userInfo} />);
                  }}
                >
                  닉네임 변경
                </Button>
              </Tooltip>
            </Box>
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
              <TableCell align="right">
                <CommonButton
                  label={'Kick'}
                  variant={'contained'}
                  size={'small'}
                  handle={() => {
                    modalOpen(
                      <ModalKick
                        userInfo={userInfo}
                        scope={INSPECT_LIMIT_TYPE_APP}
                      />
                    );
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                Web 접속 상태
              </TableCell>
              <TableCell align="left">
                {userInfo?.webConnect ? '로그인' : '로그아웃'}
              </TableCell>
              <TableCell align="right">
                <CommonButton
                  label={'Kick'}
                  variant={'contained'}
                  size={'small'}
                  handle={() => {
                    modalOpen(
                      <ModalKick
                        userInfo={userInfo}
                        scope={INSPECT_LIMIT_TYPE_WEB}
                      />
                    );
                  }}
                />
              </TableCell>
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
              <TableCell align="right">
                <CommonButton
                  label={'변경'}
                  variant={'contained'}
                  size={'small'}
                  handle={() => {
                    modalOpen(<ModalStateUpdate userInfo={userInfo} />);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                보유 Gold
              </TableCell>
              <TableCell align="left">
                {numberWithCommas(userInfo?.gold || '0')} Gold
              </TableCell>
              <TableCell align="right">
                <Tooltip
                  title={
                    <>
                      유저의 Gold를 변경하기 전<br />
                      반드시 Kick을 먼저 진행 후 변경해 주세요
                    </>
                  }
                >
                  <Button
                    variant={'contained'}
                    size={'small'}
                    sx={{ ml: 2 }}
                    onClick={() => {
                      modalOpen(<ModalGoldUpdate userInfo={userInfo} />);
                    }}
                  >
                    변경
                  </Button>
                </Tooltip>
              </TableCell>
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

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
  TableRow,
  Typography
} from '@mui/material';
import {
  CommonButton,
  DescriptionInput,
  SearchSelect
} from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import { inspectLimitType } from '@/common/config';
import React from 'react';
import { rowStyle } from '@/common/theme/styles';
import useKickCreateHooks from '@/app/operation/inspect/kick/_client/useKickCreateHooks';
import Avatar from '@mui/material/Avatar';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import WebIcon from '@mui/icons-material/Web';
import ModalKickCreateConfirm from '@/app/operation/inspect/kick/_client/ModalKickCreateConfirm';

const ModalKickCreate = ({
  modalKey
}: {
  modalKey?: string | readonly string[];
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { modalOpen: confirmOpen, Modal: Confirm } = useModal(
    `${modalKey}_confirm`
  );

  const {
    scope,
    setScope,
    description,
    setDescription,
    accessUser,
    kickAllValid,
    registration
  } = useKickCreateHooks();

  const handleKickCreate = () => {
    confirmOpen(
      <ModalKickCreateConfirm
        modalKey={`${modalKey}_confirm`}
        handle={() => {
          registration({ scope, description });
          modalClose();
        }}
      />
    );
  };

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}
      >
        Kick 하기
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ minWidth: 500, display: 'flex' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AppSettingsAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'접속중인 APP 유저 수'}
              secondary={`${accessUser?.app || 0} 명`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WebIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'접속중인 WEB 유저 수'}
              secondary={`${accessUser?.web || 0} 명`}
            />
          </ListItem>
        </List>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                Kick 범위
              </TableCell>
              <TableCell
                align="left"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <SearchSelect
                  selectOptions={inspectLimitType}
                  defaultSelect={scope}
                  handle={setScope}
                />
                <Typography
                  variant={'caption'}
                  sx={{ ml: 1, color: 'green', fontSize: 14 }}
                >
                  {kickAllValid?.maintenance ? '* 접속 차단 상태' : ''}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                사유
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  textArea={true}
                  placeholder={'사유를 입력해 주세요.'}
                  defaultValue={description}
                  handle={setDescription}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'취소'}
          variant={'outlined'}
          size={'large'}
          handle={() => {
            modalClose();
          }}
        />

        <CommonButton
          disabled={!description}
          label={'Kick'}
          variant={'contained'}
          size={'large'}
          handle={handleKickCreate}
        />
      </Box>
      <Confirm />
    </Box>
  );
};

export default ModalKickCreate;

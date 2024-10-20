'use client';

import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
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
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { popupKeys } from '@/common/key';
import useModal from '@/common/hook/useModal';
import {
  CommonButton,
  DescriptionInput,
  SearchInput
} from '@/common/component/Form';
import useAlert from '@/common/hook/useAlert';
import { rowStyle } from '@/common/theme/styles';
import useNickUpdateHooks from '@/app/operation/management/information/_client/useNickUpdateHooks';

const ModalNickUpdate = ({ userInfo }: { userInfo: any }) => {
  const { memberId, nickname } = userInfo;
  const {
    nick,
    changeNick,
    description,
    setDescription,
    handleValidation,
    valid,
    validMessage,
    nickUpdate
  } = useNickUpdateHooks();
  const { modal } = popupKeys;
  const { modalClose } = useModal(modal);
  const { Alert, alertOpen, alertClose } = useAlert();

  const handleNickUpdate = () => {
    alertOpen({
      title: '유저 닉네임 변경',
      description:
        '<span style="color:red">반드시  변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        nickUpdate({
          nickname: nick,
          memberId: memberId,
          description: description
        });
        alertClose();
        modalClose();
      }
    });
  };

  return (
    <Box sx={{ width: '600px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        유저 닉네임 변경
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={memberId} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={nickname} />
          </ListItem>
        </List>
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          새로운 닉네임
        </Typography>
        <FormControl variant={'standard'} error={false} fullWidth={true}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <SearchInput
              aria-describedby={'search-input-text'}
              width={'50%'}
              defaultValue={nick}
              handle={(value: string) => changeNick(value)}
            />
            <CommonButton
              label={'확인'}
              searchButton={true}
              handle={handleValidation}
            />
          </Box>
          <FormHelperText id={'search-input-text'} error={valid === 'invalid'}>
            {validMessage}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          변경 사유
        </Typography>
        <DescriptionInput
          textArea={true}
          placeholder={'사유를 입력 하세요.'}
          defaultValue={description}
          handle={(value: string) => setDescription(value)}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'취소'}
          variant={'outlined'}
          size={'large'}
          handle={modalClose}
        />
        <CommonButton
          disabled={!valid || valid === 'invalid' || description.length < 1}
          label={'확인'}
          variant={'contained'}
          size={'large'}
          handle={handleNickUpdate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalNickUpdate;

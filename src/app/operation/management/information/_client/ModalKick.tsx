'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { popupKeys } from '@/common/key';
import useModal from '@/common/hook/useModal';
import { CommonButton, DescriptionInput } from '@/common/component/Form';
import useKickHooks from '@/app/operation/management/information/_client/useKickHooks';
import { INSPECT_LIMIT_TYPE_WEB } from '@/common/constant';

const ModalKick = ({
  userInfo,
  scope
}: {
  userInfo: any;
  scope: 'web' | 'app' | string;
}) => {
  const { memberId, nickname } = userInfo;
  const { modal } = popupKeys;
  const { modalClose } = useModal(modal);
  const { description, setDescription, kick } = useKickHooks();

  const handleKick = () => {
    kick({ memberId, description, scope });
    modalClose();
  };

  return (
    <Box sx={{ width: '900px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        유저 Kick
      </Typography>
      <Typography
        variant={'subtitle1'}
        sx={{ textAlign: 'center', pb: 1, color: '#ff0000' }}
      >
        해당 유저의 {scope === INSPECT_LIMIT_TYPE_WEB ? '웹' : '앱'} 접속 로그인
        상태를 해제 하시겠습니까?
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
          Kick 사유
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
          disabled={description.length < 1}
          label={'Kick 완료'}
          variant={'contained'}
          size={'large'}
          handle={handleKick}
        />
      </Box>
    </Box>
  );
};

export default ModalKick;

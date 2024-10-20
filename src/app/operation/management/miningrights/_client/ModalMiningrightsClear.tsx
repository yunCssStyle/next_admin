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
import useModal from '@/common/hook/useModal';
import useAlert from '@/common/hook/useAlert';
import { CommonButton, DescriptionInput } from '@/common/component/Form';
import useMiningRightClearHooks from '@/app/operation/management/miningrights/_client/useMiningRightClearHooks';

const ModalMiningrightsClear = ({
  modalKey,
  params
}: {
  modalKey?: string;
  params: any;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();
  const { description, setDescription, miningRightClear } =
    useMiningRightClearHooks();

  const handleModalMiningrightsClear = () => {
    alertOpen({
      title: '해당 채굴권을 해제하시겠습니까?',
      description:
        '<span style="color:red">반드시 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        miningRightClear({
          memberId: params.memberId,
          mineId: params.mineId,
          description: description
        });
        alertClose();
        modalClose();
      }
    });
  };

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        유저의 채굴권 장착을 해제 하시겠습니까?
      </Typography>
      <Typography
        variant={'subtitle1'}
        sx={{ textAlign: 'center', pb: 1, color: '#ff0000' }}
      >
        주의! 채굴권은 해제만 가능하며 장착은 불가능 합니다.
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={params.memberId} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={params.nickname} />
          </ListItem>
        </List>
      </Box>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemText
              primary="채굴권 레벨"
              secondary={`레벨 ${params.level}`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary="MP" secondary={params.miningPower} />
          </ListItem>
        </List>
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          해제 사유
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
          label={'해제'}
          variant={'contained'}
          size={'large'}
          handle={handleModalMiningrightsClear}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalMiningrightsClear;

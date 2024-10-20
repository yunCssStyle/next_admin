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
import {
  CommonButton,
  DescriptionInput,
  QuantityInput
} from '@/common/component/Form';
import useMiningRightsUpdateHooks from '@/app/operation/management/miningrights/_client/useMiningRightsUpdateHooks';
import { popupKeys } from '@/common/key';

const ModalMiningrightsUpdate = ({ userInfo }: { userInfo: any }) => {
  const { modal } = popupKeys;
  const { modalClose } = useModal(modal);
  const { Alert, alertOpen, alertClose } = useAlert();
  const {
    miningRightsUpdate,
    mineLevel,
    setMineLevel,
    description,
    setDescription
  } = useMiningRightsUpdateHooks();

  const handleModalMiningrightsClear = () => {
    alertOpen({
      title: '해당 유저에게 채굴권을 추가하시겠습니까?',
      description:
        '<span style="color:red">반드시 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        miningRightsUpdate({
          memberId: userInfo.memberId,
          mineLevel: mineLevel,
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
        채굴권 추가
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'UID'} secondary={userInfo.memberId} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={userInfo.nickname} />
          </ListItem>
        </List>
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          채굴권 레벨
        </Typography>
        <QuantityInput defaultValue={mineLevel} handle={setMineLevel} />
      </Box>
      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          추가 사유
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
          disabled={description.length < 1 || mineLevel < 1}
          label={'추가'}
          variant={'contained'}
          size={'large'}
          handle={handleModalMiningrightsClear}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalMiningrightsUpdate;

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
import {
  CommonButton,
  DescriptionInput,
  SelectDateTime,
  SelectRadio
} from '@/common/component/Form';
import useAlert from '@/common/hook/useAlert';
import { blockStatus } from '@/common/config';
import useStateUpdateHooks from '@/app/operation/management/information/_client/useStateUpdateHooks';

const ModalStateUpdate = ({ userInfo }: { userInfo: any }) => {
  const { modal } = popupKeys;
  const { modalClose } = useModal(modal);
  const { Alert, alertOpen, alertClose } = useAlert();

  const {
    state,
    setState,
    date,
    setDate,
    description,
    setDescription,
    stateUpdate
  } = useStateUpdateHooks();

  const handleStateUpdate = () => {
    alertOpen({
      title: '유저 상태 변경',
      description:
        '<span style="color:red">반드시 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        let params: {
          memberId: number;
          state: string | number;
          date?: string | Date;
          description: string;
        } = {
          memberId: userInfo.memberId,
          state,
          description
        };
        if (date) params.date = date;
        stateUpdate(params);
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
        유저 상태 변경
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
          이용 제한 상태
        </Typography>
        <SelectRadio
          defaultRadio={state}
          radioList={blockStatus}
          handle={(value) => {
            setState(value);
          }}
        />
        {state === blockStatus[2].value ? (
          <SelectDateTime
            seconds={true}
            disabledPast={true}
            handle={setDate}
            timezone={'UTC'}
          />
        ) : null}
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
          disabled={
            !state || !description || (state === blockStatus[2].value && !date)
          }
          label={'확인'}
          variant={'contained'}
          size={'large'}
          handle={handleStateUpdate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalStateUpdate;

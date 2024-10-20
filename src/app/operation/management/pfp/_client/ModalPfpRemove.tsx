import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import useModal from '@/common/hook/useModal';
import useAlert from '@/common/hook/useAlert';
import { CommonButton, DescriptionInput } from '@/common/component/Form';
import usePfpRemoveHooks from '@/app/operation/management/pfp/_client/usePfpRemoveHooks';

const ModalPfpRemove = ({
  modalKey,
  params
}: {
  modalKey?: string;
  params: any;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();
  const { description, setDescription, removePfp } = usePfpRemoveHooks();

  const handlePfpRemove = () => {
    alertOpen({
      title: '해당 PFP를 삭제하시겠습니까?',
      description:
        '<span style="color:red">반드시 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        removePfp({
          memberId: params.memberId,
          id: params.id,
          description: description,
          page: params.page
        });
        alertClose();
        modalClose();
      }
    });
  };

  return (
    <Box sx={{ width: '700px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        유저 PFP 삭제
      </Typography>

      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemText
              primary={'컬랙션'}
              secondary={params.collectionName}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary={'토큰 ID'} secondary={params.tokenId} />
          </ListItem>
        </List>
      </Box>

      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemText
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              primary={
                <>
                  Luck
                  <br />
                  (B+W+L)
                </>
              }
              secondary={`${params.luck.basic}+${params.luck.whiteList}+${params.luck.legend}`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              primary={
                <>
                  Silver
                  <br />
                  Tongue
                  <br />
                  (B+W+L)
                </>
              }
              secondary={`${params.silverTongue.basic}+${params.silverTongue.whiteList}+${params.silverTongue.legend}`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              primary={
                <>
                  Stamina
                  <br />
                  (B+W+L)
                </>
              }
              secondary={`${params.stamina.basic}+${params.stamina.whiteList}+${params.stamina.legend}`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              primary={
                <>
                  Intuition
                  <br />
                  (B+W+L)
                </>
              }
              secondary={`${params.intuition.basic}+${params.intuition.whiteList}+${params.intuition.legend}`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText
              sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              primary={
                <>
                  스탯 합
                  <br />
                  (B+W+L)
                </>
              }
              secondary={`${params.stats.basic}+${params.stats.whiteList}+${params.stats.legend}`}
            />
          </ListItem>
        </List>
      </Box>

      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          삭제 사유
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
          label={'확인'}
          variant={'contained'}
          size={'large'}
          handle={handlePfpRemove}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalPfpRemove;

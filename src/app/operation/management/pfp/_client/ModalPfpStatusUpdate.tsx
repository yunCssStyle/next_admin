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
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Textarea from '@/common/component/Form/TextArea';
import { CommonButton, QuantityInput } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import useAlert from '@/common/hook/useAlert';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { rowStyle } from '@/common/theme/styles';

const ModalPfpStatusUpdate = ({ modalKey }: { modalKey?: string }) => {
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();

  const handleStateUpdate = () => {
    alertOpen({
      title: 'PFP 스탯을 변경 하시겠습니까?',
      description:
        '<span style="color:red">반드시 아래의 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      content: (
        <>
          <Box component={Paper} sx={{ px: 2, mb: 2, width: 650 }}>
            <List sx={{ display: 'flex', width: '100%' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FingerprintIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'UID'} secondary={'123456'} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CoPresentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="닉네임" secondary={'Mine01'} />
              </ListItem>
            </List>
          </Box>

          <Typography variant={'h6'} sx={{ display: 'block', pb: 1 }}>
            PFP 기본 정보
          </Typography>
          <Box component={Paper} sx={{ px: 2, mb: 2 }}>
            <List sx={{ display: 'flex', width: '100%' }}>
              <ListItem>
                <ListItemText primary="컬랙션" secondary={'HAVAH friends'} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem />
              <ListItem>
                <ListItemText primary="토큰 ID" secondary={'#1234'} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem />
              <ListItem>
                <ListItemText primary="Basic" secondary={'80 ~ 100'} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem />
              <ListItem>
                <ListItemText primary="White List" secondary={'40'} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem />
              <ListItem>
                <ListItemText primary="Legend" secondary={'40'} />
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end'
            }}
          >
            <Typography variant={'h6'} sx={{ display: 'block', pb: 1 }}>
              변경 전
            </Typography>
            <Typography
              variant={'caption'}
              sx={{ display: 'block', pb: 1, textAlign: 'right' }}
            >
              스탯 값 [ B = Basic ], [ W = White List ], [ L = Legend ]
            </Typography>
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
                  secondary={'40+10+12'}
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
                  secondary={'15+10+14'}
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
                  secondary={'18+15+5'}
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
                  secondary={'27+5+8'}
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
                  secondary={'100+40+40'}
                />
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end'
            }}
          >
            <Typography variant={'h6'} sx={{ display: 'block', pb: 1 }}>
              변경 후
            </Typography>
            <Typography
              variant={'caption'}
              sx={{ display: 'block', pb: 1, textAlign: 'right' }}
            >
              스탯 값 [ B = Basic ], [ W = White List ], [ L = Legend ]
            </Typography>
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
                  secondary={'40+10+12'}
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
                  secondary={'15+10+14'}
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
                  secondary={'18+15+5'}
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
                  secondary={'27+5+8'}
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
                  secondary={'100+40+40'}
                />
              </ListItem>
            </List>
          </Box>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableBody>
                <TableRow sx={rowStyle}>
                  <TableCell component="th" scope="row" width={'30%'}>
                    변경 사유
                  </TableCell>
                  <TableCell align="right">오류 조치</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ),
      isCancel: true,
      ok: () => {
        alertClose();
        modalClose();
      }
    });
  };

  return (
    <Box sx={{ width: '1200px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        PFP 스탯 변경
      </Typography>

      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ display: 'flex', width: '100%' }}>
          <ListItem>
            <ListItemText primary="컬랙션" secondary={'HAVAH friends'} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary="토큰 ID" secondary={'#1234'} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary="Basic" secondary={'80 ~ 100'} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary="White List" secondary={'40'} />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemText primary="Legend" secondary={'40'} />
          </ListItem>
        </List>
      </Box>

      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          변경 스탯 입력
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell component="th" width={'14%'}>
                  스탯
                </TableCell>
                <TableCell component="th" width={'14%'}>
                  Luck
                </TableCell>
                <TableCell component="th" width={'14%'}>
                  Silver Tongue
                </TableCell>
                <TableCell component="th" width={'14%'}>
                  Stamina
                </TableCell>
                <TableCell component="th" width={'14%'}>
                  Intuition
                </TableCell>
                <TableCell component="th" width={'14%'}>
                  스탯 합
                </TableCell>
                <TableCell component="th">부여 가능 합 (범위)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" width={'14%'}>
                  Basic
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={40}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={15}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={18}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={27}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>100</TableCell>
                <TableCell>80 ~ 100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width={'14%'}>
                  White List
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    readOnly={true}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    readOnly={true}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    readOnly={true}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    readOnly={true}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>40</TableCell>
                <TableCell>40</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" width={'14%'}>
                  Legend
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>
                  <QuantityInput
                    defaultValue={10}
                    handle={(value) => {
                      console.log(value);
                    }}
                  />
                </TableCell>
                <TableCell width={'14%'}>40</TableCell>
                <TableCell>40</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant={'caption'}
          sx={{ display: 'block', pt: 1, color: 'red' }}
        >
          * 스탯 합이 부여 가능한 범위가 아닙니다. 스탯 수치를 다시 입력하세요.
        </Typography>
      </Box>

      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          변경 사유
        </Typography>
        <Textarea placeholder={'사유를 입력 하세요.'} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'취소'}
          variant={'outlined'}
          size={'large'}
          handle={modalClose}
        />
        <CommonButton
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

export default ModalPfpStatusUpdate;

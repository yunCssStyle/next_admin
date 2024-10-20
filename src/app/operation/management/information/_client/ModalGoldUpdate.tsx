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
  QuantityInput,
  SelectRadio
} from '@/common/component/Form';
import useAlert from '@/common/hook/useAlert';
import { indecrease } from '@/common/config';
import { rowStyle } from '@/common/theme/styles';
import useGoldUpdateHooks from '@/app/operation/management/information/_client/useGoldUpdateHooks';
import _ from 'lodash';
import { useUtils } from '@/common/hook/useUtils';

const ModalGoldUpdate = ({ userInfo }: { userInfo: any }) => {
  const { memberId, nickname, gold } = userInfo;
  const { modal } = popupKeys;
  const { modalClose } = useModal(modal);
  const { Alert, alertOpen, alertClose } = useAlert();
  const {
    amount,
    type,
    description,
    setType,
    setDescription,
    calculationAmount,
    setCalculationAmount,
    goldUpdate
  } = useGoldUpdateHooks(gold);
  const { numberWithCommas } = useUtils();

  const handleStateUpdate = () => {
    alertOpen({
      title: '유저의 Gold 수량을 변경 하시겠습니까?',
      description:
        '<span style="color:red">반드시 아래의 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      content: (
        <>
          <Box component={Paper} sx={{ px: 2, mb: 2 }} key={'goldbox0'}>
            <List sx={{ display: 'flex', width: '100%' }}>
              <ListItem key={'goldlist01'}>
                <ListItemAvatar>
                  <Avatar>
                    <FingerprintIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'UID'} secondary={memberId} />
              </ListItem>
              <Divider orientation={'vertical'} flexItem key={'golddivider'} />
              <ListItem key={'goldlist02'}>
                <ListItemAvatar>
                  <Avatar>
                    <CoPresentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="닉네임" secondary={nickname} />
              </ListItem>
            </List>
          </Box>
          <TableContainer component={Paper} sx={{ mb: 2 }} key={'goldtable0'}>
            <Table>
              <TableBody>
                <TableRow sx={rowStyle} key={'gold변경0'}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={'30%'}
                    key={'gold변경00'}
                  >
                    변경 사유
                  </TableCell>
                  <TableCell align="right" key={'gold변경01'}>
                    {description}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} sx={{ mb: 2 }} key={'goldTable1'}>
            <Table sx={{ minWidth: 450 }}>
              <TableBody>
                <TableRow sx={rowStyle} key={'gold변경1'}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={'30%'}
                    key={'gold변경10'}
                  >
                    변경 전 수량
                  </TableCell>
                  <TableCell align="left" key={'gold변경11'}>
                    {gold}
                  </TableCell>
                </TableRow>
                <TableRow sx={rowStyle} key={'gold변경2'}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={'30%'}
                    key={'gold변경20'}
                  >
                    수량 증감 선택
                  </TableCell>
                  <TableCell align="left" key={'gold변경21'}>
                    {_.find(indecrease, { value: type })?.label}
                  </TableCell>
                </TableRow>
                <TableRow sx={rowStyle} key={'gold변경3'}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={'30%'}
                    key={'gold변경30'}
                  >
                    증감 수량
                  </TableCell>
                  <TableCell align="left" key={'gold변경31'}>
                    {calculationAmount}
                  </TableCell>
                </TableRow>
                <TableRow sx={rowStyle} key={'gold변경4'}>
                  <TableCell
                    component="th"
                    scope="row"
                    width={'30%'}
                    key={'gold변경40'}
                  >
                    변경 후 수량
                  </TableCell>
                  <TableCell align="left" key={'gold변경41'}>
                    {amount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ),
      isCancel: true,
      ok: () => {
        goldUpdate({
          memberId: memberId,
          type: type,
          amount: calculationAmount,
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
        유저 Gold 수량 변경
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
          변경 사유
        </Typography>
        <DescriptionInput
          textArea={true}
          placeholder={'사유를 입력 하세요.'}
          defaultValue={description}
          handle={(value: string) => setDescription(value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableBody>
            <TableRow sx={rowStyle} key={'gold변경5'}>
              <TableCell
                component="th"
                scope="row"
                width={'30%'}
                key={'gold변경50'}
              >
                <Typography variant={'h6'}>현재 보유 수량</Typography>
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 18 }} key={'gold변경51'}>
                {numberWithCommas(gold)}
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }} key={'gold변경52'}>
                Gold
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          증감 수량 입력
        </Typography>

        <SelectRadio
          defaultRadio={type}
          radioList={indecrease}
          handle={(value) => {
            setType(value as string);
          }}
        />
        <QuantityInput
          defaultValue={calculationAmount}
          placeholder={'수량을 입력하세요.'}
          fullWidth={true}
          endAdornment={true}
          decimal={true}
          handle={(value) => {
            setCalculationAmount(value);
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableBody>
            <TableRow sx={rowStyle} key={'gold변경6'}>
              <TableCell
                component="th"
                scope="row"
                width={'30%'}
                key={'gold변경60'}
              >
                <Typography variant={'h6'}>최종 보유 수량</Typography>
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 18 }} key={'gold변경61'}>
                {numberWithCommas(amount.toFixed(6))}
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }} key={'gold변경62'}>
                Gold
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
          handle={modalClose}
        />
        <CommonButton
          disabled={
            amount === gold ||
            String(amount) === 'NaN' ||
            amount < 0 ||
            description.length < 1
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

export default ModalGoldUpdate;

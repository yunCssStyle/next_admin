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
import useItemsUpdateHooks from '@/app/operation/management/items/_client/useItemsUpdateHooks';

const ModalItemsUpdate = ({
  modalKey,
  params
}: {
  modalKey?: string | readonly string[];
  params?: any;
}) => {
  const { memberId, nickname } = params;
  const { modalClose } = useModal(modalKey as string);
  const { Alert, alertOpen, alertClose } = useAlert();
  const {
    amount,
    type,
    description,
    setType,
    setDescription,
    calculationAmount,
    setCalculationAmount,
    itemUpdate
  } = useItemsUpdateHooks({ itemAmount: params.amount });

  const handleStateUpdate = () => {
    alertOpen({
      title: `수량을 변경 하시겠습니까?`,
      description:
        '<span style="color:red">반드시 변경 내용이 맞는지 확인 후 결정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        itemUpdate({
          memberId: memberId,
          category: params.name,
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
        {params.name} 수량 변경
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
            <TableRow sx={rowStyle} key={'items변경5'}>
              <TableCell
                component="th"
                scope="row"
                width={'30%'}
                key={'items변경50'}
              >
                <Typography variant={'h6'}>현재 보유 수량</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: 18 }}
                key={'items변경51'}
              >
                {params.amount}
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }} key={'items변경52'}>
                EA
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
          endAdornmentLabel={'EA'}
          handle={(value) => {
            setCalculationAmount(value);
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableBody>
            <TableRow sx={rowStyle} key={'items변경6'}>
              <TableCell
                component="th"
                scope="row"
                width={'30%'}
                key={'items변경60'}
              >
                <Typography variant={'h6'}>최종 보유 수량</Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: 18 }}
                key={'items변경61'}
              >
                {amount}
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }} key={'items변경62'}>
                EA
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
            amount === params.amount || amount < 0 || description.length < 1
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

export default ModalItemsUpdate;

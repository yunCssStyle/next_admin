import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import Textarea from '@/common/component/Form/TextArea';
import { popupKeys } from '@/common/key';
import useModal from '@/common/hook/useModal';
import { CommonButton } from '@/common/component/Form';
import { rowStyle } from '@/common/theme/styles';

const ModalPayment = ({ modalKey }: { modalKey?: string }) => {
  const { modalClose } = useModal(modalKey || popupKeys.modal);
  const handleKick = () => {
    modalClose();
  };

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        결제 환불
      </Typography>
      <Typography
        variant={'subtitle1'}
        sx={{ textAlign: 'center', pb: 1, color: '#ff0000' }}
      >
        반드시 아래의 환불 내용이 맞는지 확인 후 결정해 주세요.
      </Typography>

      <TableContainer component={Paper} sx={{ px: 2, mb: 2 }}>
        <Table>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                결제 일시
              </TableCell>
              <TableCell align="left">2021-10-01[00:00:00]</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                영수증 번호
              </TableCell>
              <TableCell align="left">GPA-1234-1234-1234-123344</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                UID
              </TableCell>
              <TableCell align="left">#1234</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                스토어
              </TableCell>
              <TableCell align="left">구글/애플</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                결제 상품
              </TableCell>
              <TableCell align="left">닉네임 변경권</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                금액
              </TableCell>
              <TableCell align="left">10.00 $</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box component={Paper} sx={{ p: 2, mb: 2 }}>
        <Typography variant={'h6'} sx={{ pb: 1 }}>
          환불 사유
        </Typography>
        <Textarea placeholder={'환불 사유를 입력 하세요.'} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'취소'}
          variant={'outlined'}
          size={'large'}
          handle={modalClose}
        />
        <CommonButton
          label={'환불 완료'}
          variant={'contained'}
          size={'large'}
          handle={handleKick}
        />
      </Box>
    </Box>
  );
};

export default ModalPayment;

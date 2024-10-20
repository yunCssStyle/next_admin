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
import { CommonButton, DescriptionInput } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import useAlert from '@/common/hook/useAlert';
import useHooks from '@/app/operation/notice/push/_client/useHooks';
import { rowStyle } from '@/common/theme/styles';

const ModalPushCreate = ({
  modalKey
}: {
  modalKey?: string | readonly string[];
}) => {
  const { registration, pushMessageInfo, setPushMessageInfo } = useHooks();
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();

  const handlePushCreate = () => {
    alertOpen({
      title: '푸시 메시지 등록',
      description:
        '<span style="color:red">반드시 등록 내용이 맞는지 확인 후 완료해 주세요.</span>',
      isCancel: true,
      ok: () => {
        registration(pushMessageInfo);
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
        sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}
      >
        푸시 메시지 등록
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                제목
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  placeholder={'제목을 입력해주세요.'}
                  defaultValue={pushMessageInfo.title}
                  handle={(value: string) => {
                    setPushMessageInfo({
                      ...pushMessageInfo,
                      title: value
                    });
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                메시지 문구
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  textArea={true}
                  placeholder={'메시지 문구를 입력해주세요.'}
                  handle={(value: string) => {
                    setPushMessageInfo({
                      ...pushMessageInfo,
                      description: value
                    });
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                비고
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  textArea={true}
                  placeholder={'비고란을 입력해주세요.'}
                  handle={(value: string) => {
                    setPushMessageInfo({
                      ...pushMessageInfo,
                      reason: value
                    });
                  }}
                />
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
          disabled={!pushMessageInfo.title || !pushMessageInfo.description}
          label={'등록'}
          variant={'contained'}
          size={'large'}
          handle={handlePushCreate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalPushCreate;

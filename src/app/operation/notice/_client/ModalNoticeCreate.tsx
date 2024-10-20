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
import useHooks from '@/app/operation/notice/_client/useHooks';
import { rowStyle } from '@/common/theme/styles';

const ModalNoticeCreate = ({
  modalKey
}: {
  modalKey?: string | readonly string[];
}) => {
  const { registration, instanceMessageInfo, setInstanceMessageInfo } =
    useHooks();
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();
  const handleNoticeCreate = () => {
    alertOpen({
      title: '인스턴스 메시지 등록',
      description:
        '<span style="color:red">반드시 등록 내용이 맞는지 확인 후 완료해 주세요.</span>',
      isCancel: true,
      ok: () => {
        registration(instanceMessageInfo);
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
        인스턴스 메시지 등록
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle} key={'문구페이지2'}>
              <TableCell
                component="th"
                scope="row"
                width={'20%'}
                key={'문구페이지cell1'}
              >
                메시지 문구
              </TableCell>
              <TableCell align="left" key={'문구페이지cell2'}>
                <DescriptionInput
                  textArea={true}
                  placeholder={'메시지 문구를 입력해주세요.'}
                  handle={(value: string) => {
                    setInstanceMessageInfo({
                      ...instanceMessageInfo,
                      description: value
                    });
                  }}
                />
                <Typography
                  variant={'caption'}
                  sx={{ color: 'red', fontSize: 11 }}
                >
                  * 최대 4줄, 한줄 당 최대 27자
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle} key={'문구페이지3'}>
              <TableCell
                component="th"
                scope="row"
                width={'20%'}
                key={'문구페이지cell1'}
              >
                비고
              </TableCell>
              <TableCell align="left" key={'문구페이지cell2'}>
                <DescriptionInput
                  textArea={true}
                  placeholder={'비고란을 입력해주세요.'}
                  handle={(value: string) => {
                    setInstanceMessageInfo({
                      ...instanceMessageInfo,
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
          handle={() => {
            modalClose();
          }}
        />

        <CommonButton
          disabled={
            !instanceMessageInfo.reason || !instanceMessageInfo.description
          }
          label={'등록'}
          variant={'contained'}
          size={'large'}
          handle={handleNoticeCreate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalNoticeCreate;

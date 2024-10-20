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
import {
  CommonButton,
  DescriptionInput,
  QuantityInput
} from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import { rowStyle } from '@/common/theme/styles';
import useWlCollectionUpdateHooks from '@/app/operation/wlcollection/_client/useWlCollectionUpdateHooks';
import useAlert from '@/common/hook/useAlert';

const ModalWlCollectionUpdate = ({
  modalKey,
  params
}: {
  modalKey?: string;
  params?: any;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();
  const {
    collectionName,
    setCollectionName,
    contractAddr,
    setContractAddr,
    stat,
    setStat,
    update
  } = useWlCollectionUpdateHooks(params.row);

  const handleCollectionUpdate = () => {
    alertOpen({
      title: '컬렉션 수정',
      description:
        '<span style="color:red">반드시 수정 내용이 맞는지 확인 후 완료해 주세요.</span>',
      isCancel: true,
      ok: () => {
        update({
          collectionId: params.id,
          collectionName,
          contractAddr,
          stat
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
        sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}
      >
        컬렉션을 수정하시겠습니까?
      </Typography>
      <Typography
        variant={'caption'}
        sx={{ display: 'block', pb: 1, color: 'red', textAlign: 'center' }}
      >
        * 반드시 아래의 등록 내용이 맞는지 확인 후 완료해 주세요
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                컬렉션
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  defaultValue={collectionName}
                  handle={setCollectionName}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                컨트렉트 주소
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  defaultValue={contractAddr}
                  handle={setContractAddr}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                White List 보너스
              </TableCell>
              <TableCell align="left">
                <QuantityInput defaultValue={stat} handle={setStat} />
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
          disabled={collectionName === '' || contractAddr === ''}
          label={'수정'}
          variant={'contained'}
          size={'large'}
          handle={handleCollectionUpdate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalWlCollectionUpdate;

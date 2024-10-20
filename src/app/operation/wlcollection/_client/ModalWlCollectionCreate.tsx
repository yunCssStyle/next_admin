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
import useAlert from '@/common/hook/useAlert';
import { rowStyle } from '@/common/theme/styles';
import useWlCollectionCreateHooks from '@/app/operation/wlcollection/_client/useWlCollectionCreateHooks';

const ModalWlCollectionCreate = ({
  modalKey
}: {
  modalKey?: string | readonly string[];
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
    registration
  } = useWlCollectionCreateHooks();

  const handleCollectionCreate = () => {
    alertOpen({
      title: '컬렉션 등록',
      description:
        '<span style="color:red">반드시 등록 내용이 맞는지 확인 후 완료해 주세요.</span>',
      isCancel: true,
      ok: () => {
        registration({ collectionName, contractAddr, stat });
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
        컬렉션 등록
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
                  placeholder={'컬렉션명을 입력해주세요.'}
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
                  placeholder={'컨트렉트 주소를 입력해주세요.'}
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
                <QuantityInput
                  placeholder={'0'}
                  defaultValue={stat}
                  handle={setStat}
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
          disabled={collectionName === '' || contractAddr === ''}
          label={'등록'}
          variant={'contained'}
          size={'large'}
          handle={handleCollectionCreate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalWlCollectionCreate;

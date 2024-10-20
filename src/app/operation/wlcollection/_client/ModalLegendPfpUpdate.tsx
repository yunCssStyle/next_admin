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
import { CommonButton, QuantityInput } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import { rowStyle } from '@/common/theme/styles';
import useWlCollectionListHooks from '@/app/operation/wlcollection/_client/useWlCollectionListHooks';
import { useCallback, useEffect } from 'react';

const ModalLegendPfpUpdate = ({
  modalKey,
  params
}: {
  modalKey?: string;
  params?: any;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { legendStat, setLegendStat, updateLegendCollection } =
    useWlCollectionListHooks();

  const legendStatInit = useCallback(() => {
    setLegendStat(params.row.stat);
  }, [setLegendStat, params.row.stat]);

  useEffect(() => {
    legendStatInit();
  }, [legendStatInit]);

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}
      >
        레전드 PFP 스탯 변경
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                컬렉션
              </TableCell>
              <TableCell align="left">{params.row.collectionName}</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                컨트렉트 주소
              </TableCell>
              <TableCell align="left">{params.row.contractAddr}</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                White List 보너스
              </TableCell>
              <TableCell align="left">{params.row.wlbonus}</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                Legend 토큰 ID
              </TableCell>
              <TableCell align="left">{params.row.tokenId}</TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                Legend 보너스
              </TableCell>
              <TableCell align="left">
                <QuantityInput
                  defaultValue={legendStat}
                  handle={setLegendStat}
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
          label={'변경 완료'}
          variant={'contained'}
          size={'large'}
          handle={() => {
            updateLegendCollection({
              collectionId: params.row.collectionId,
              tokenId: params.row.tokenId,
              stat: legendStat
            });
            modalClose();
          }}
        />
      </Box>
    </Box>
  );
};

export default ModalLegendPfpUpdate;

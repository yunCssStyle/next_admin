import { GridColDef } from '@mui/x-data-grid';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import dayjs from 'dayjs';
import { Box, Chip, Tooltip } from '@mui/material';
import { useUtils as utils } from '@/common/hook/useUtils';

export const goldcenter: GridColDef[] = [
  {
    field: 'txHash',
    headerName: 'Tx Hash',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <Tooltip title={params.value} arrow>
          <Chip
            label={params.value}
            variant="outlined"
            onClick={() => {
              window.open(
                `${process.env.NEXT_PUBLIC_SCAN_URL}/txn/${params.value}`
              );
            }}
          />
        </Tooltip>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <>
          {dayjs(params.value).format('YYYY.MM.DD')}
          <br />
          {dayjs(params.value).format('HH:mm:ss')}
        </>
      );
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'fromAddr',
    headerName: 'From',
    headerAlign: 'center',
    renderCell: (params) => {
      const { isContractAddress } = utils();
      const isContract = isContractAddress(params.value);
      const isThisContract =
        process.env.NEXT_PUBLIC_SCORE_ADDRESS === params.value;
      return (
        <Tooltip title={params.value} arrow>
          <Chip
            label={params.value}
            variant={isContract && isThisContract ? 'filled' : 'outlined'}
            onClick={
              isContract
                ? undefined
                : () => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_SCAN_URL}/address/${params.value}`
                    );
                  }
            }
          />
        </Tooltip>
      );
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'arrow',
    headerName: '',
    headerAlign: 'center',
    renderCell: () => {
      return <ArrowRightAltIcon />;
    },
    align: 'center',
    sortable: false,
    width: 50
  },
  {
    field: 'toAddr',
    headerName: 'To',
    headerAlign: 'center',
    renderCell: (params) => {
      const { isContractAddress } = utils();
      const isContract = isContractAddress(params.value);
      const isThisContract =
        process.env.NEXT_PUBLIC_SCORE_ADDRESS === params.value;
      return (
        <Tooltip title={params.value} arrow>
          <Chip
            label={params.value}
            variant={isContract && isThisContract ? 'filled' : 'outlined'}
            onClick={
              isContract && isThisContract
                ? undefined
                : () => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_SCAN_URL}/address/${params.value}`
                    );
                  }
            }
          />
        </Tooltip>
      );
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    headerAlign: 'center',
    renderCell: (params) => {
      const { isContractAddress, numberWithCommas } = utils();
      const isContract = isContractAddress(params.row.toAddr);
      const isThisContract =
        process.env.NEXT_PUBLIC_SCORE_ADDRESS === params.row.toAddr;
      return (
        <Box
          sx={{ color: isContract && isThisContract ? 'deepskyblue' : 'red' }}
        >
          {isContract && isThisContract ? '+' : '-'}{' '}
          {numberWithCommas(params.value)} {params.row.scoreSymbol}
        </Box>
      );
    },
    align: 'right',
    sortable: false,
    flex: 1
  },
  {
    field: 'scoreName',
    headerName: 'Token Name',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  }
];

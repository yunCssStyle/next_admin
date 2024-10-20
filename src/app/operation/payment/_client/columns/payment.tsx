import { GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import { Box } from '@mui/material';
import { paymentType, platformType } from '@/common/config';
import { useToast as toast } from '@/common/hook/useToast';
import dayjs from 'dayjs';

export const payment: GridColDef[] = [
  {
    field: 'date',
    headerName: '일시',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <>
          {dayjs(params.value).format('YYYY/MM/DD')}
          <br />
          {dayjs(params.value).format('HH:mm:ss')}
        </>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'memberId',
    headerName: 'UID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'type',
    headerName: '스토어',
    headerAlign: 'center',
    renderCell: (params) => {
      return _.find(platformType, { value: params.value })?.label;
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'itemId',
    headerName: '결제 상품',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'data',
    headerName: '결제 토큰',
    headerAlign: 'center',
    renderCell: (params) => {
      const { toastOpen } = toast();
      const data = JSON.parse(params.value)?.purchaseToken
        ? JSON.parse(params.value)?.purchaseToken
        : JSON.parse(params.value)?.receiptData;
      return (
        <Box
          component={'span'}
          sx={{
            wordBreak: 'break-all',
            py: 2,
            display: 'block',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(data);
              toastOpen({
                description: '결제 토큰이 복사되었습니다.',
                status: 'info'
              });
            } catch (e: any) {
              toastOpen({
                description: '결제 토큰 복사에 실패하였습니다.',
                status: 'error'
              });
            }
          }}
        >
          {data}
        </Box>
      );
    },
    align: 'center',
    sortable: false,
    flex: 2
  },
  {
    field: 'orderId',
    headerName: '영수증 번호',
    headerAlign: 'center',
    renderCell: (params) => {
      const { toastOpen } = toast();
      const data = params.value;
      return (
        <Box
          component={'span'}
          sx={{
            wordBreak: 'break-all',
            py: 2,
            display: 'block',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(data);
              toastOpen({
                description: '영수증 번호가 복사되었습니다.',
                status: 'info'
              });
            } catch (e: any) {
              toastOpen({
                description: '영수증 번호 복사에 실패하였습니다.',
                status: 'error'
              });
            }
          }}
        >
          {data}
        </Box>
      );
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'status',
    headerName: '상태',
    headerAlign: 'center',
    renderCell: (params) => {
      return _.find(paymentType, { value: params.value })?.label;
    },
    align: 'center',
    sortable: false,
    flex: 1
  }
];

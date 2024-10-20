import { GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import { transportStatus } from '@/common/config';

export const transport: GridColDef[] = [
  {
    field: 'seq',
    headerName: '순번',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return `수송 ${params.value}`;
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'date',
    headerName: '수송시각',
    renderCell: (params) => {
      return String(params.value).padStart(2, '0') + ':00';
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'fee',
    headerName: '수송 수수료',
    renderCell: (params) => {
      return `${
        params.value ? params.value.toLocaleString('en-US') + ' Gold' : '-'
      }`;
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'amount',
    headerName: '획득 골드',
    renderCell: (params) => {
      return `${
        params.value ? params.value.toLocaleString('en-US') + ' Gold' : '-'
      }`;
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'status',
    headerName: '수송 상태',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return _.find(transportStatus, { value: params.value })?.label;
    },
    sortable: false,
    flex: 1
  }
];

import { GridColDef } from '@mui/x-data-grid';

export const miningrights: GridColDef[] = [
  {
    field: 'mineId',
    headerName: '채굴권 ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'level',
    headerName: '채굴권 레벨',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return `레벨 ${params.formattedValue}`;
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'miningPower',
    headerName: 'MP',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return params.formattedValue ? params.formattedValue : '-';
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'equipped',
    headerName: '장착 유무',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return params.formattedValue ? '장착' : '미장착';
    },
    sortable: false,
    flex: 1
  }
];

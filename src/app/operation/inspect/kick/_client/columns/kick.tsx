import { GridColDef } from '@mui/x-data-grid';

export const kick: GridColDef[] = [
  {
    field: 'dateTime',
    headerName: '일시',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'scope',
    headerName: '킥 범위',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'description',
    headerName: '사유',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'worker',
    headerName: '작업자',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  }
];

import { GridColDef } from '@mui/x-data-grid';

export const items: GridColDef[] = [
  {
    field: 'name',
    headerName: '아이템 종류',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'amount',
    headerName: '보유 수량',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  }
];

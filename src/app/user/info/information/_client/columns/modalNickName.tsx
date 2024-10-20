import { GridColDef } from '@mui/x-data-grid';

export const modalNickName: GridColDef[] = [
  {
    field: 'date',
    headerName: '변경 일시',
    sortable: false,
    flex: 1
  },
  {
    field: 'beforeNickname',
    headerName: '변경전 닉네임',
    sortable: false,
    flex: 1
  },
  {
    field: 'afterNickname',
    headerName: '변경후 닉네임',
    sortable: false,
    flex: 1
  },
  {
    field: 'method',
    headerName: '변경 방법',
    sortable: false,
    flex: 1
  },
  {
    field: 'reason',
    headerName: '변경 사유',
    sortable: false,
    flex: 1
  },
  {
    field: 'worker',
    headerName: '작업자',
    sortable: false,
    flex: 1
  }
];

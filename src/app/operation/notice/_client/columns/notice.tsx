import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const notice: GridColDef[] = [
  {
    field: 'registerDateTime',
    headerName: '등록일시',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <>
          {dayjs(params.formattedValue as string).format('YYYY-MM-DD')}
          <br />
          {dayjs(params.formattedValue as string).format('HH:mm:ss')}
        </>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'description',
    headerName: '메시지',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 2
  },
  {
    field: 'reason',
    headerName: '비고',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 2
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

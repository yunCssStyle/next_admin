import { GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

export const log: GridColDef[] = [
  {
    field: 'datetime',
    headerName: '일시',
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
    field: 'uuid',
    headerName: 'UID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'nickname',
    headerName: '닉네임',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <>{params.formattedValue ? (params.formattedValue as string) : '-'}</>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'log_id',
    headerName: '로그 ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'log_name',
    headerName: '로그명',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'logContents',
    headerName: '요청 내용',
    headerAlign: 'center',
    align: 'left',
    renderCell: (params) => {
      return (
        <Box
          sx={{ display: 'flex', flexDirection: 'column', p: 1, width: '100%' }}
        >
          {_.map(params.formattedValue as string[], (item, index) => (
            <Box key={index} sx={{ wordBreak: 'break-all' }}>
              &middot; {item}
            </Box>
          ))}
        </Box>
      );
    },
    sortable: false,
    flex: 2
  }
];

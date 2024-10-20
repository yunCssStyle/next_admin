import { GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

export const log: GridColDef[] = [
  {
    field: 'requestDateTime',
    headerName: '요청 일시',
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
    field: 'worker',
    headerName: '작업자',
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
    field: 'remoteIp',
    headerName: 'IP',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'logAction',
    headerName: '액션',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'requestContent',
    headerName: '요청 내용',
    headerAlign: 'center',
    align: 'left',
    renderCell: (params) => {
      const logs = _.split(params.value, '|');
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            wordBreak: 'break-all',
            p: 1
          }}
        >
          {_.map(logs, (item, index) => {
            return (
              <Box
                key={`log-${index}`}
                sx={{
                  position: 'relative',
                  pl: item === 'null' ? 0 : 1,
                  my: item === 'null' ? 0 : 0.2
                }}
              >
                {item === 'null' ? (
                  ''
                ) : (
                  <>
                    <Box
                      component={'span'}
                      sx={{ position: 'absolute', left: 0 }}
                    >
                      &middot;
                    </Box>{' '}
                    {item}
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      );
    },
    sortable: false,
    flex: 1
  }
];

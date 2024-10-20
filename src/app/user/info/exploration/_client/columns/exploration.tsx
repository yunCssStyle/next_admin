import { GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export const exploration: GridColDef[] = [
  {
    field: 'startDate',
    headerName: '탐사 시작 시간',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'endDate',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1.15 }}>
          탐사 완료 예상 시간
          <br />
          (단축시간 반영됨)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  }
];

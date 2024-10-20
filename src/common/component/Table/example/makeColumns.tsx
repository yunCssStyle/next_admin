import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', sortable: false, flex: 1 },
  { field: 'lastName', headerName: 'Last name', sortable: false, flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    sortable: false,
    flex: 1
  },
  {
    field: 'visits',
    headerName: 'Visits',
    type: 'number',
    sortable: false,
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    sortable: false,
    flex: 1
  },
  {
    field: 'progress',
    headerName: 'Progress',
    sortable: false,
    flex: 1
  }
];

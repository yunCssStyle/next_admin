import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CommonButton } from '@/common/component/Form';
import useHooks from '@/app/operation/inspect/wl/_client/useHooks';

const RemoveWlItem = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { remove } = useHooks();
  return (
    <>
      <CommonButton
        label={'삭제'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          remove({ memberId: params.row.memberId });
        }}
      />
    </>
  );
};

export const wl: GridColDef[] = [
  {
    field: 'memberId',
    headerName: 'UID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'expiredDateTime',
    headerName: '점검 WL 유지기간',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'management',
    headerName: '삭제',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <RemoveWlItem params={params} />
  }
];

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { CommonButton } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import ModalLegendPfpUpdate from '@/app/operation/wlcollection/_client/ModalLegendPfpUpdate';
import { Box } from '@mui/material';

const WlCollectionListModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(
    `collectionListModifyModal${params.id}`
  );

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <CommonButton
        label={'변경'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(
            <ModalLegendPfpUpdate
              modalKey={`collectionListModifyModal${params.id}`}
              params={params}
            />
          );
        }}
      />
      <Modal />
    </Box>
  );
};

export const wlcollectionList: GridColDef[] = [
  {
    field: 'createDateTime',
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
    field: 'collectionName',
    headerName: '컬렉션',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'contractAddr',
    headerName: '컨트렉트 주소',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => {
      return params.value;
    },
    flex: 2
  },
  {
    field: 'tokenId',
    headerName: '토큰 ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'wlbonus',
    headerName: 'WL 보너스',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'stat',
    headerName: 'Legend 보너스',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'legendBonusUpdate',
    headerName: '관리',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => <WlCollectionListModal params={params} />,
    flex: 1.1
  }
];

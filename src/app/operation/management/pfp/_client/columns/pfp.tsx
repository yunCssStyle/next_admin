'use client';

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import useModal from '@/common/hook/useModal';
import ModalPfpRemove from '@/app/operation/management/pfp/_client/ModalPfpRemove';
import { CommonButton } from '@/common/component/Form';

/* Todo : 추후 기능 추가
import ModalPfp from '@/app/operation/management/pfp/_client/ModalPfp';
import ModalPfpStatusUpdate from '@/app/operation/management/pfp/_client/ModalPfpStatusUpdate';
*/

/* Todo : 추후 기능 추가
const StatusModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`statusModal${params.id}`);
  return (
    <>
      <CommonButton
        label={'이력'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(<ModalPfp />);
        }}
      />
      <Modal />
    </>
  );
};

const StatusModifyModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`statusModifyModal${params.id}`);
  return (
    <>
      <CommonButton
        label={'변경'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(
            <ModalPfpStatusUpdate modalKey={`statusModifyModal${params.id}`} />
          );
        }}
      />
      <Modal />
    </>
  );
};*/

const PfpRemoveModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`pfpRemoveModal${params.id}`);

  return (
    <>
      <CommonButton
        disabled={params.row.status}
        label={'삭제'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(
            <ModalPfpRemove
              modalKey={`pfpRemoveModal${params.id}`}
              params={params.row}
            />
          );
        }}
      />
      <Modal />
    </>
  );
};

export const pfp: GridColDef[] = [
  {
    field: 'status',
    headerName: '상태',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>{params.row.status ? '장착' : '보유'}</Box>
      );
    },
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'collectionName',
    headerName: '컬렉션',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    width: 200
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
    field: 'luck',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          LUCK
          <br />
          (B+W+L)
        </Box>
      );
    },
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          {params.row.luck.basic}+{params.row.luck.whiteList}+
          {params.row.luck.legend}
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'silverTongue',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Silver
          <br />
          Tongue
          <br />
          (B+W+L)
        </Box>
      );
    },
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          {params.row.silverTongue.basic}+{params.row.silverTongue.whiteList}+
          {params.row.silverTongue.legend}
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'stamina',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Stamina
          <br />
          (B+W+L)
        </Box>
      );
    },
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          {params.row.stamina.basic}+{params.row.stamina.whiteList}+
          {params.row.stamina.legend}
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'intuition',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Intuition
          <br />
          (B+W+L)
        </Box>
      );
    },
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          {params.row.intuition.basic}+{params.row.intuition.whiteList}+
          {params.row.intuition.legend}
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'stats',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          스탯 합<br />
          (B+W+L)
        </Box>
      );
    },
    renderCell: (params) => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          {params.row.stats.basic}+{params.row.stats.whiteList}+
          {params.row.stats.legend}
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  /* Todo : 추후 기능 추가
  {
    field: 'statsHistory',
    headerName: '스탯 이력',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <StatusModal params={params} />
  },
  {
    field: 'statsModify',
    headerName: '스탯 변경',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <StatusModifyModal params={params} />
  },*/
  {
    field: 'pfpRemove',
    headerName: 'PFP 삭제',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <PfpRemoveModal params={params} />
  }
];

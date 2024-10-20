'use client';

import { GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
/* Todo : 추후 기능 추가
import { GridRenderCellParams } from '@mui/x-data-grid';
import useModal from '@/common/hook/useModal';
import ModalPfp from '@/app/user/info/pfp/_client/ModalPfp';
import { popupKeys } from '@/common/key';
import { CommonButton } from '@/common/component/Form';*/

/* Todo : 추후 기능 추가
const HistoryModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(`${modal}${params.id}`);
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
};*/

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
  }
  /* Todo : 추후 기능 추가
  ,{
    field: 'statsHistory',
    headerName: '스탯 이력',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <HistoryModal params={params} />
  }*/
];

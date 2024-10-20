import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import ModalInspectUpdate from '@/app/operation/inspect/_client/ModalInspectUpdate';
import { inspectLimitType } from '@/common/config';
import _ from 'lodash';

const InspectManagementModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`inspectUpdateModal${params.id}`);

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <CommonButton
        label={'관리'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(
            <ModalInspectUpdate
              modalKey={`inspectUpdateModal${params.id}`}
              id={params.id as string}
            />
          );
        }}
      />
      <Modal />
    </Box>
  );
};

export const inspect: GridColDef[] = [
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
    field: 'scope',
    headerName: '범위',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return (
        <>
          {
            _.find(inspectLimitType, (item) => params.value === item.value)
              ?.label
          }
        </>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'message',
    headerName: '메시지',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 2
  },
  {
    field: 'dateRange',
    headerName: '접속 차단 기간',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          {dayjs(params.row.startDateTime).format('YYYY-MM-DD HH:mm:ss')} ~
          <br />
          {dayjs(params.row.endDateTime).format('YYYY-MM-DD HH:mm:ss')}
        </>
      );
    },
    flex: 1
  },
  {
    field: 'management',
    headerName: '관리',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => <InspectManagementModal params={params} />,
    flex: 1
  }
];

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useModal from '@/common/hook/useModal';
import { Button, Tooltip } from '@mui/material';
import ModalMiningrightsClear from '@/app/operation/management/miningrights/_client/ModalMiningrightsClear';

const MiningrightsClearModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`miningrightClearModal${params.id}`);
  return (
    <>
      {params.row.equipped ? (
        <Tooltip
          title={
            <>
              유저의 채굴권을 해제하기 전<br />
              반드시 Kick을 먼저 진행 후 해제해 주세요
            </>
          }
        >
          <Button
            variant={'contained'}
            size={'small'}
            onClick={() => {
              modalOpen(
                <ModalMiningrightsClear
                  modalKey={`miningrightClearModal${params.id}`}
                  params={params.row}
                />
              );
            }}
          >
            해제
          </Button>
        </Tooltip>
      ) : (
        <Button
          disabled={!params.row.equipped}
          variant={'contained'}
          size={'small'}
          onClick={() => {
            modalOpen(
              <ModalMiningrightsClear
                modalKey={`miningrightClearModal${params.id}`}
                params={params.row}
              />
            );
          }}
        >
          해제
        </Button>
      )}
      <Modal />
    </>
  );
};

export const miningrights: GridColDef[] = [
  {
    field: 'mineId',
    headerName: '채굴권 ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'level',
    headerName: '채굴권 레벨',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return `레벨 ${params.formattedValue}`;
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'miningPower',
    headerName: 'MP',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return params.formattedValue ? params.formattedValue : '-';
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'equipped',
    headerName: '장착 유무',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      return params.formattedValue ? '장착' : '미장착';
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'miningrightsClear',
    headerName: '채굴권 해제',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <MiningrightsClearModal params={params} />
  }
];

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useModal from '@/common/hook/useModal';
import { Button, Tooltip } from '@mui/material';
import ModalItemsUpdate from '@/app/operation/management/items/_client/ModalItemsUpdate';

const ItemModifyModal = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { modalOpen, Modal } = useModal(`itemsUpdateModal${params.id}`);
  return (
    <>
      <Tooltip
        title={
          <>
            유저의 아이템 수량을 변경하기 전<br />
            반드시 Kick을 먼저 진행 후 해제해 주세요
          </>
        }
      >
        <Button
          variant={'contained'}
          size={'small'}
          onClick={() => {
            modalOpen(
              <ModalItemsUpdate
                modalKey={`itemsUpdateModal${params.id}`}
                params={params.row}
              />
            );
          }}
        >
          변경
        </Button>
      </Tooltip>
      <Modal />
    </>
  );
};

export const items: GridColDef[] = [
  {
    field: 'name',
    headerName: '아이템 종류',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'amount',
    headerName: '보유 수량',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'amountModify',
    headerName: '수량 변경',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1,
    renderCell: (params) => <ItemModifyModal params={params} />
  }
];

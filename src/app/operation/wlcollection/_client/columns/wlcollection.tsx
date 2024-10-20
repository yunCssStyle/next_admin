import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import ModalWlCollectionList from '@/app/operation/wlcollection/_client/ModalWlCollectionList';
import useAlert from '@/common/hook/useAlert';
import ModalWlCollectionUpdate from '@/app/operation/wlcollection/_client/ModalWlCollectionUpdate';
import useHooks from '@/app/operation/wlcollection/_client/useHooks';
import useWlCollectionListHooks from '@/app/operation/wlcollection/_client/useWlCollectionListHooks';

const WlCollectionModals = ({
  params
}: {
  params: GridRenderCellParams<any, any, any>;
}) => {
  const { Alert, alertOpen, alertClose } = useAlert(
    `collectionRemoveAlert${params.id}`
  );
  const { setInit } = useWlCollectionListHooks();
  const { modalOpen, Modal } = useModal(
    `collectionManagerModal${params.id}`,
    setInit
  );
  const { modalOpen: modifyOpen, Modal: ModifyModal } = useModal(
    `collectionModifyModal${params.id}`
  );
  const { removeCollection } = useHooks();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <CommonButton
        label={'관리'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modalOpen(<ModalWlCollectionList params={params} />);
        }}
      />
      <CommonButton
        label={'수정'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          modifyOpen(
            <ModalWlCollectionUpdate
              modalKey={`collectionModifyModal${params.id}`}
              params={params}
            />
          );
        }}
      />
      <CommonButton
        label={'삭제'}
        variant={'contained'}
        size={'small'}
        handle={() => {
          alertOpen({
            title: '컬렉션을 삭제하시겠습니까?',
            description: `<span style="color:red">반드시 삭제하시려는 컬렉션이 맞는지 확인 후 삭제 해 주세요.<br/>삭제시 Legend PFP도 함께 삭제 됩니다.</span>`,
            ok: () => {
              removeCollection({ collectionId: params.id as number });
              alertClose();
            },
            cancel: () => {
              alertClose();
            },
            isCancel: true
          });
        }}
      />
      <Modal />
      <ModifyModal />
      <Alert />
    </Box>
  );
};

export const wlcollection: GridColDef[] = [
  {
    field: 'id',
    headerName: 'No.',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
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
    flex: 2
  },
  {
    field: 'havahContract',
    headerName: '컨트렉트 주소',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => {
      return params.value;
    },
    flex: 3
  },
  {
    field: 'stat',
    headerName: 'WL 보너스',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'management',
    headerName: '관리',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    renderCell: (params) => {
      return <WlCollectionModals params={params} />;
    },
    width: 220
  }
];

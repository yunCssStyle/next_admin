'use client';

import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import { DataTable } from '@/common/component/Table';
import { kick } from '@/app/operation/inspect/kick/_client/columns/kick';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import ModalKickCreate from '@/app/operation/inspect/kick/_client/ModalKickCreate';
import useHooks from '@/app/operation/inspect/kick/_client/useHooks';

const Page = () => {
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(modal);

  const { page, setPage, kickAllList } = useHooks();

  const handleKickCreate = () => {
    modalOpen(<ModalKickCreate modalKey={modal} />);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 2 }}>
        <CommonButton
          label={'Kick 하기'}
          searchButton={true}
          handle={handleKickCreate}
        />
      </Box>

      <DataTable
        columns={kick}
        data={kickAllList?.content}
        page={page}
        totalPage={kickAllList?.totalPages || 0}
        minHeight={578}
        autoRowHeight={true}
        handlePage={setPage}
      />
      <Modal />
    </>
  );
};

export default Page;

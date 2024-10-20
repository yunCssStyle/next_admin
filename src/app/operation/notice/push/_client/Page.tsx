'use client';

import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import { DataTable } from '@/common/component/Table';
import { push } from '@/app/operation/notice/push/_client/columns/push';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import ModalPushCreate from '@/app/operation/notice/push/_client/ModalPushCreate';
import UseHooks from '@/app/operation/notice/push/_client/useHooks';

const Page = () => {
  const { list, setPage } = UseHooks();
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(modal);

  const handlePushCreate = () => {
    modalOpen(<ModalPushCreate modalKey={modal} />);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 2 }}>
        <CommonButton
          label={'등록하기'}
          searchButton={true}
          handle={handlePushCreate}
        />
      </Box>

      <DataTable
        columns={push}
        data={list?.push}
        page={list?.page || 0}
        totalPage={list?.totalPages || 0}
        minHeight={578}
        autoRowHeight={true}
        handlePage={setPage}
      />
      <Modal />
    </>
  );
};

export default Page;

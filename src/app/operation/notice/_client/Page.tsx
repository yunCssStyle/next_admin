'use client';

import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import { DataTable } from '@/common/component/Table';
import { notice } from '@/app/operation/notice/_client/columns/notice';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import ModalNoticeCreate from '@/app/operation/notice/_client/ModalNoticeCreate';
import UseHooks from '@/app/operation/notice/_client/useHooks';

const Page = () => {
  const { list, setPage } = UseHooks();
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(modal);

  const handleNoticeCreate = () => {
    modalOpen(<ModalNoticeCreate modalKey={modal} />);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 2 }}>
        <CommonButton
          label={'등록하기'}
          searchButton={true}
          handle={handleNoticeCreate}
        />
      </Box>

      <DataTable
        columns={notice}
        data={list?.instance || []}
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

'use client';

import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';
import { DataTable } from '@/common/component/Table';
import { inspect } from '@/app/operation/inspect/_client/columns/inspect';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import ModalInspectCreate from '@/app/operation/inspect/_client/ModalInspectCreate';
import useHooks from '@/app/operation/inspect/_client/useHooks';
import _ from 'lodash';

const Page = () => {
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(modal);

  const { page, setPage, inspectLimitList } = useHooks();

  const handleInspectCreate = () => {
    modalOpen(<ModalInspectCreate modalKey={modal} />);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 2 }}>
        <CommonButton
          label={'등록하기'}
          searchButton={true}
          handle={handleInspectCreate}
        />
      </Box>

      <DataTable
        columns={inspect}
        data={_.filter(inspectLimitList?.content, (item) => item)}
        page={page}
        totalPage={inspectLimitList?.totalPages || 0}
        minHeight={578}
        autoRowHeight={true}
        handlePage={setPage}
      />
      <Modal />
    </>
  );
};

export default Page;

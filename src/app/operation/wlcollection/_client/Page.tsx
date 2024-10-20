'use client';

import { Box, Paper } from '@mui/material';
import { CommonButton, SearchInput } from '@/common/component/Form';
import Typography from '@mui/material/Typography';
import { DataTable } from '@/common/component/Table';
import { wlcollection } from '@/app/operation/wlcollection/_client/columns/wlcollection';
import useModal from '@/common/hook/useModal';
import { popupKeys } from '@/common/key';
import ModalWlCollectionCreate from '@/app/operation/wlcollection/_client/ModalWlCollectionCreate';
import useHooks from '@/app/operation/wlcollection/_client/useHooks';
import { PAGE_SIZE } from '@/common/constant';

const Page = () => {
  const { modal } = popupKeys;
  const { modalOpen, Modal } = useModal(modal);

  const {
    collectionName,
    setCollectionName,
    page,
    setPage,
    wlcollectionList,
    searchWlcollection
  } = useHooks();

  const handleWlcollectionCreate = () => {
    modalOpen(<ModalWlCollectionCreate modalKey={modal} />);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'end', pb: 2 }}>
        <Typography variant={'h5'}>WL 컬렉션 관리</Typography>
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mb: 2 }}
        component={Paper}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SearchInput
            placeholder={'컬렉션명을 입력해주세요.'}
            width={400}
            defaultValue={collectionName}
            handle={setCollectionName}
            handleKeyDown={searchWlcollection}
          />
          <CommonButton searchButton={true} handle={searchWlcollection} />
        </Box>
        <CommonButton
          label={'등록하기'}
          searchButton={true}
          handle={handleWlcollectionCreate}
        />
      </Box>

      <DataTable
        columns={wlcollection}
        data={wlcollectionList?.content || []}
        totalPage={wlcollectionList?.totalPages || 0}
        pageSize={PAGE_SIZE}
        minHeight={578}
        page={page}
        handlePage={setPage}
      />
      <Modal />
    </>
  );
};

export default Page;

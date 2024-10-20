'use client';

import { Box, Paper, Typography } from '@mui/material';
import { CommonButton, SearchInput } from '@/common/component/Form';
import { DataTable } from '@/common/component/Table';
import { wlcollectionList } from '@/app/operation/wlcollection/_client/columns/wlcollectionList';
import useWlCollectionListHooks from '@/app/operation/wlcollection/_client/useWlCollectionListHooks';
import { PAGE_SIZE } from '@/common/constant';

const ModalWlCollectionList = ({ params }: { params: any }) => {
  const {
    filter,
    collectionList,
    page,
    setPage,
    setSearchFilter,
    searchWlcollection,
    isLoading
  } = useWlCollectionListHooks(params.id);

  return (
    <Box sx={{ width: '1150px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}
      >
        컬렉션 관리
      </Typography>

      <Box sx={{ p: 2, mb: 2 }} component={Paper}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SearchInput
            placeholder={'토큰ID를 입력해주세요.'}
            width={400}
            defaultValue={filter}
            handle={setSearchFilter}
            handleKeyDown={searchWlcollection}
          />
          <CommonButton searchButton={true} handle={searchWlcollection} />
        </Box>
      </Box>

      <DataTable
        columns={wlcollectionList}
        data={collectionList}
        pageSize={PAGE_SIZE}
        page={page}
        handlePage={setPage}
        totalPage={Math.ceil(collectionList.length / PAGE_SIZE)}
        minHeight={578}
        autoRowHeight={true}
        clientPagination={true}
        loading={isLoading}
      />
    </Box>
  );
};

export default ModalWlCollectionList;

'use client';

import { Tabs } from '@/common/component/Nav';
import { useSelectedLayoutSegment as SelectedLayoutSegment } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import {
  CommonButton,
  QuantityInput,
  SearchInput,
  SearchSelect
} from '@/common/component/Form';
import { searchUserType } from '@/common/config';
import { ReactNode } from 'react';
import { useHooks as hooks } from '@/app/operation/management/_client/useHooks';

const template = ({ children }: { children: ReactNode }) => {
  const segment = SelectedLayoutSegment();
  const { handleSearch, type, setType, keyword, setKeyword, Alert } = hooks();

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, pb: 1 }}>
        <SearchSelect
          selectOptions={searchUserType}
          defaultSelect={(type as string) || searchUserType[0].value}
          handle={setType}
        />
        {type === searchUserType[0].value ? (
          <QuantityInput
            defaultValue={keyword}
            handle={setKeyword}
            handleKeyDown={handleSearch}
            placeholder={'조회하실 유저의 정보를 입력해 주세요.'}
          />
        ) : (
          <SearchInput
            defaultValue={keyword}
            handle={setKeyword}
            handleKeyDown={handleSearch}
          />
        )}
        <CommonButton
          disabled={!keyword}
          handle={handleSearch}
          searchButton={true}
        />

        <Typography variant={'caption'} sx={{ color: 'red', alignSelf: 'end' }}>
          * [UID = 앱 노출 UID - 104328]
        </Typography>
      </Box>
      {segment ? <Tabs /> : null}
      {children}
      <Alert />
    </>
  );
};

export default template;

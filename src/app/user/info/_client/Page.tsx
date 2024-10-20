'use client';

import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const empty = searchParams.get('empty') || '';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100% - 72px)'
      }}
    >
      <Typography variant={'h5'} sx={{ textAlign: 'center' }}>
        {empty ? (
          <Box component={'span'}>
            조회하신 정보와 일치하는 유저가 없습니다.
            <br />
            다시 입력해 조회해 주세요.
          </Box>
        ) : (
          '유저의 정보를 입력해 조회해 주세요.'
        )}
      </Typography>
    </Box>
  );
};

export default Page;

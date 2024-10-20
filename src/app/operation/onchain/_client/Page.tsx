'use client';

import { Box, Typography } from '@mui/material';
import { CommonButton } from '@/common/component/Form';

const Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100% - 72px)'
      }}
    >
      <Typography variant={'h5'}>
        온체인 지급은{' '}
        <CommonButton
          textTransform={'none'}
          label={'https://htool.vega.havah.io/'}
          variant={'text'}
          size={'large'}
          handle={() => {
            window.open('https://htool.vega.havah.io/');
          }}
        />
        에서 가능합니다.
      </Typography>
    </Box>
  );
};

export default Page;

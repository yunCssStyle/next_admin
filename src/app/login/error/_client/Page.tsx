'use client';

import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Typography variant={'h2'}>Error!</Typography>
      <Typography variant={'subtitle1'}>Something went wrong!</Typography>
      <Button
        variant={'contained'}
        startIcon={<RefreshIcon />}
        onClick={() => {
          location.replace('/login');
        }}
      >
        Try again
      </Button>
    </Box>
  );
}

export default Page;

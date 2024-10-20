'use client';

import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography, Box } from '@mui/material';
import Logger from '@/common/api/Logger';

export default function globalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Logger.error(`Error Boundary : ${error}`);

  return (
    <html>
      <body style={{ width: '100%', height: '100%' }}>
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
              location.reload();
              reset();
            }}
          >
            Try again
          </Button>
        </Box>
      </body>
    </html>
  );
}

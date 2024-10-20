import { Box, Button, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Typography variant={'h2'}>Not Found</Typography>
      <Typography variant={'subtitle1'}>
        Could not find requested resource
      </Typography>

      <Button variant={'contained'} startIcon={<RefreshIcon />} href={'/'}>
        Go Home
      </Button>
    </Box>
  );
}

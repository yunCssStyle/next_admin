import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
}

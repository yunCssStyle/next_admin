'use client';

import { SnackbarProvider } from 'notistack';
import { Top, Side } from '@/common/component/Nav';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import useToast from '@/common/hook/useToast';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');

const Template = ({ children }: { children: React.ReactNode }) => {
  const { Toast } = useToast();
  return usePathname().startsWith('/login') ? (
    children
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider maxSnack={3}>
        <main>
          <Top />
          <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 68.5px)' }}>
            <Side />
            <Box sx={{ p: 3, flexGrow: 1, width: 'calc(100% - 200px)' }}>
              {children}
            </Box>
          </Box>
        </main>
        <Toast />
      </SnackbarProvider>
    </LocalizationProvider>
  );
};
export default Template;

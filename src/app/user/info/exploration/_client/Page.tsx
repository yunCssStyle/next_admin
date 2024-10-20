'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { DataTable } from '@/common/component/Table';
import { exploration } from '@/app/user/info/exploration/_client/columns/exploration';
import { useRouter } from 'next/navigation';
import useHooks from '@/app/user/info/exploration/_client/useHooks';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA } from '@/common/constant';

const Page = () => {
  const router = useRouter();
  const { explorationDateRange } = useHooks();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((explorationDateRange as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
  }, [explorationDateRange, routerEffect]);

  return (
    <>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FingerprintIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'UID'}
              secondary={explorationDateRange?.memberId}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="닉네임"
              secondary={explorationDateRange?.nickname}
            />
          </ListItem>
        </List>
      </Box>

      <DataTable
        columns={exploration}
        data={
          explorationDateRange &&
          explorationDateRange?.startDate &&
          explorationDateRange?.endDate
            ? [
                {
                  id: 0,
                  startDate: explorationDateRange?.startDate,
                  endDate: explorationDateRange?.endDate
                }
              ]
            : []
        }
      />
    </>
  );
};

export default Page;

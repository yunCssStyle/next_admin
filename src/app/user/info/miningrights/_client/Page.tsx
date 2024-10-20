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
import { miningrights } from '@/app/user/info/miningrights/_client/columns/miningrights';
import { DataTable } from '@/common/component/Table';
import useHooks from '@/app/user/info/miningrights/_client/useHooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA } from '@/common/constant';

const Page = () => {
  const { miningrightsList } = useHooks();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((miningrightsList as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
  }, [miningrightsList, routerEffect]);

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
              secondary={miningrightsList?.memberId}
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
              secondary={miningrightsList?.nickname}
            />
          </ListItem>
        </List>
      </Box>

      <DataTable columns={miningrights} data={miningrightsList?.mines} />
    </>
  );
};

export default Page;

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
import { transport } from '@/app/user/info/transport/_client/columns/transport';
import { useRouter } from 'next/navigation';
import useHooks from '@/app/user/info/transport/_client/useHooks';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA } from '@/common/constant';

const Page = () => {
  const router = useRouter();
  const { transportList } = useHooks();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((transportList as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
  }, [transportList, routerEffect]);

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
            <ListItemText primary={'UID'} secondary={transportList?.memberId} />
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
              secondary={transportList?.nickname}
            />
          </ListItem>
        </List>
      </Box>

      <DataTable columns={transport} data={transportList?.transports} />
    </>
  );
};

export default Page;

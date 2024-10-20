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
import { items } from '@/app/operation/management/items/_client/columns/items';
import useHooks from '@/app/operation/management/items/_client/useHooks';
import { DataTable } from '@/common/component/Table';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA } from '@/common/constant';

const Page = () => {
  const { itemsList } = useHooks();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((itemsList as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
  }, [itemsList, routerEffect]);

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
            <ListItemText primary={'UID'} secondary={itemsList?.memberId} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={itemsList?.nickname} />
          </ListItem>
        </List>
      </Box>

      <DataTable columns={items} data={itemsList?.items} />
    </>
  );
};

export default Page;

'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { DataTable } from '@/common/component/Table';
import { pfp } from '@/app/user/info/pfp/_client/columns/pfp';
import useHooks from '@/app/user/info/pfp/_client/useHooks';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NO_SEARCH_DATA, PAGE_SIZE } from '@/common/constant';

const Page = () => {
  const router = useRouter();
  const { pfpInfo, page, setPage } = useHooks();

  const routerEffect = useCallback(() => {
    router.push('/user/info?empty=true');
  }, [router]);

  useEffect(() => {
    if ((pfpInfo as unknown as string) === NO_SEARCH_DATA) {
      routerEffect();
    }
  }, [pfpInfo, routerEffect]);

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
            <ListItemText primary={'UID'} secondary={pfpInfo?.memberId} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CoPresentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="닉네임" secondary={pfpInfo?.nickname} />
          </ListItem>
        </List>
      </Box>
      <Typography
        variant={'caption'}
        sx={{ display: 'block', pb: 1, textAlign: 'right' }}
      >
        스탯 값 [ B = Basic ], [ W = White List ], [ L = Legend ]
      </Typography>
      <DataTable
        columns={pfp}
        data={pfpInfo?.pfp || []}
        totalPage={pfpInfo?.totalPage || 0}
        pageSize={PAGE_SIZE}
        minHeight={578}
        page={page}
        handlePage={setPage}
      />
    </>
  );
};

export default Page;

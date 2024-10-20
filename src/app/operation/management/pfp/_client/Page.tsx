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
import { pfp } from '@/app/operation/management/pfp/_client/columns/pfp';
import { useRouter } from 'next/navigation';
import useHooks from '@/app/operation/management/pfp/_client/useHooks';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA, PAGE_SIZE } from '@/common/constant';

const Page = () => {
  const router = useRouter();
  const { pfpInfo, page, setPage } = useHooks();

  const routerEffect = useCallback(() => {
    router.push('/operation/management?empty=true');
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
        pageSize={PAGE_SIZE}
        page={page || 0}
        handlePage={setPage}
        totalPage={pfpInfo?.totalPage || 0}
        minHeight={578}
      />
    </>
  );
};

export default Page;

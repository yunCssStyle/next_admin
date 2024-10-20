'use client';

import { useSession } from 'next-auth/react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { authRoleInfo } from '@/common/config';
import Avatar from '@mui/material/Avatar';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import WebIcon from '@mui/icons-material/Web';
import useHooks from '@/app/(page)/_client/useHooks';

const Page = () => {
  const { data: session } = useSession();
  const role: string = session?.user.role as string;
  const { accessUser } = useHooks();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Typography variant={'h5'} sx={{ mb: 4 }}>
        {session?.user.email} 계정은 {authRoleInfo[role]} 기능 이용이
        가능합니다.
      </Typography>
      <Box component={Paper} sx={{ px: 2, mb: 2 }}>
        <List sx={{ minWidth: 500, display: 'flex' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AppSettingsAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'접속중인 APP 유저 수'}
              secondary={`${accessUser?.app || 0} 명`}
            />
          </ListItem>
          <Divider orientation={'vertical'} flexItem />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WebIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={'접속중인 WEB 유저 수'}
              secondary={`${accessUser?.web || 0} 명`}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Page;

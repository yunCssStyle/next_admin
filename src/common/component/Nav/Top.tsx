'use clent';

import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { menuInfo, userMenuInfo } from '@/common/config';
import _ from 'lodash';
import { CommonButton } from '@/common/component/Form';
import Link from 'next/link';

const Top = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavMenu = (link: string) => {
    router.push(`/${link}`);
  };

  const handleUserMenu = () => {
    setAnchorElUser(null);
    signOut();
  };

  return (
    <AppBar position="static" sx={{ zIndex: 1 }}>
      <Container fixed>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 4,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '0',
              color: 'inherit',
              textDecoration: 'none',
              textAlign: 'center'
            }}
          >
            <Link href={'/'} style={{ color: 'inherit' }}>
              MINE-warZ
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 3 }}>
            {_.map(menuInfo, (item, index) => {
              const isView = _.includes(item.role, session?.user.role);
              return isView ? (
                <CommonButton
                  label={item.name}
                  key={item.path + index}
                  variant={'text'}
                  handle={() =>
                    handleNavMenu(`${item.path}/${item.subMenu[0].path}`)
                  }
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    minWidth: 0,
                    fontWeight: `${item.path === segment ? 700 : 400}`,
                    transform: `${
                      item.path === segment ? 'scale(1.1)' : 'scale(1)'
                    }`
                  }}
                />
              ) : null;
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={session?.user.name}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{_.slice(session?.user.name, 0, 1)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              {_.map(userMenuInfo, (setting, index) => (
                <MenuItem
                  key={setting.name + index}
                  onClick={() => handleUserMenu()}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Top;

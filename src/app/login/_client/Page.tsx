'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter, useSearchParams } from 'next/navigation';
import useAlert from '@/common/hook/useAlert';

function Page() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('error');
  const { Alert, alertOpen, alertClose } = useAlert();

  const [_, setProviders] = useState(null);

  useEffect(() => {
    if (search === 'AccessDenied') {
      alertOpen({
        title: '계정이 존재하지 않습니다.',
        description: '<span style="color:red">관리자에게 문의 바랍니다.</span>',
        ok: () => {
          alertClose();
          route.replace('/');
        }
      });
    }
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogle = async () =>
    await signIn('google', {
      redirect: true,
      callbackUrl: '/'
    });

  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Typography variant={'h1'} textAlign={'center'}>
          Mine-warZ
          <br />
          Admin
        </Typography>

        <Button variant={'contained'} size={'large'} onClick={handleGoogle}>
          <GoogleIcon sx={{ mr: 1 }} />
          Google login
        </Button>
      </Box>
      <Alert />
    </Box>
  );
}

export default Page;

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
import { miningrights } from '@/app/operation/management/miningrights/_client/columns/miningrights';
import { DataTable } from '@/common/component/Table';
import useHooks from '@/app/operation/management/miningrights/_client/useHooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { NO_SEARCH_DATA } from '@/common/constant';
import { CommonButton } from '@/common/component/Form';
import { popupKeys } from '@/common/key';
import ModalMiningrightsUpdate from '@/app/operation/management/miningrights/_client/ModalMiningrightsUpdate';
import useModal from '@/common/hook/useModal';

const Page = () => {
  const { modal } = popupKeys;
  const { Modal, modalOpen } = useModal(modal);

  const { miningrightsList } = useHooks();
  const router = useRouter();

  const routerEffect = useCallback(() => {
    router.push('/operation/management?empty=true');
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

      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <CommonButton
          label={'채굴권 추가'}
          size={'medium'}
          handle={() => {
            modalOpen(
              <ModalMiningrightsUpdate
                userInfo={{
                  memberId: miningrightsList?.memberId,
                  nickname: miningrightsList?.nickname
                }}
              />
            );
          }}
        />
      </Box>

      <DataTable columns={miningrights} data={miningrightsList?.mines} />

      <Modal />
    </>
  );
};

export default Page;

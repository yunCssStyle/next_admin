import { Box, Typography } from '@mui/material';
import { CommonButton, DescriptionInput } from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import React, { useState } from 'react';
import useKickCreateHooks from '@/app/operation/inspect/kick/_client/useKickCreateHooks';

const ModalKickCreateConfirm = ({
  modalKey,
  handle
}: {
  modalKey?: string | readonly string[];
  handle: any;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const [kick, setKick] = useState('');
  const { kickAllValid: validate } = useKickCreateHooks();
  const handleKickCreate = () => {
    handle();
    modalClose();
  };

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant={validate?.maintenance ? 'h5' : 'h4'}
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 2,
          color: validate?.maintenance ? 'black' : 'red'
        }}
      >
        {validate?.maintenance
          ? 'Kick 하시겠습니까?'
          : '현재 접속 차단 상태가 아닙니다.'}
      </Typography>

      <Typography variant={'caption'}>
        {validate?.maintenance ? (
          <>
            접속한 유저에 대해 즉시 Kick을 진행하기 위해서는
            <br />
            아래의 입력란에 &apos;KICK&apos;을 입력해주세요.
          </>
        ) : (
          <>
            접속 차단 상태가 아님에도 불구하고 즉시 Kick을 진행하시겠다면,
            <br />
            아래의 입력란에 &apos;CONFIRM&apos;을 입력해주세요.
          </>
        )}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <DescriptionInput
          placeholder={validate?.maintenance ? 'KICK' : 'CONFIRM'}
          defaultValue={kick}
          handle={setKick}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'취소'}
          variant={'outlined'}
          size={'large'}
          handle={() => {
            modalClose();
          }}
        />

        <CommonButton
          disabled={
            validate?.maintenance ? kick !== 'KICK' : kick !== 'CONFIRM'
          }
          label={'Kick'}
          variant={'contained'}
          size={'large'}
          handle={handleKickCreate}
        />
      </Box>
    </Box>
  );
};

export default ModalKickCreateConfirm;

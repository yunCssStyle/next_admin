'use client';

import { fetcher } from '@/common/api';
import { userKeys } from '@/common/key/serverKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useToast from '@/common/hook/useToast';

const useNickUpdateHooks = () => {
  const { toastOpen } = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const searchKeyword = searchParams.get('keyword') || '';
  const searchProvider = searchParams.get('provider') || '';

  const [nick, setNick] = useState('');
  const [valid, setValid] = useState('');
  const [validMessage, setValidMessage] = useState(
    '* 영문과 숫자만을 이용하여 영문으로 시작하는 4-16자의 닉네임을 입력해주세요.'
  );
  const [description, setDescription] = useState('');

  const changeNick = (value: string) => {
    if (/^(?:[a-zA-Z][a-zA-Z0-9]{0,15})?$/.test(value)) setNick(value);
  };

  const getNicknameValidation = async (params: { nickname: string }) => {
    return (
      await fetcher.get(
        `${userKeys.nicknameValidation[0]}?nickname=${params.nickname}`
      )
    ).data;
  };

  const { mutate: nickValid } = useMutation({
    mutationFn: getNicknameValidation,
    onSuccess: (data) => {
      setValidMessage('* 사용이 가능한 닉네임 입니다.');
      setValid('valid');
    },
    onError: (error) => {
      setValidMessage(
        '* 사용할 수 없는 닉네임 입니다. 이미 사용 중 이거나 규칙에 어긋납니다.'
      );
      setValid('invalid');
    }
  });

  const handleValidation = () => {
    nickValid({ nickname: nick });
  };

  const putNicknameUpdate = async (params: {
    nickname: string;
    memberId: number;
    description: string;
  }) => {
    return (await fetcher.put(userKeys.nicknameUpdate[0], params)).data;
  };

  const { mutate: nickUpdate } = useMutation({
    mutationFn: putNicknameUpdate,
    onSuccess: (data) => {
      let params = {
        type: searchType,
        keyword: searchKeyword,
        provider: searchProvider
      };
      queryClient.invalidateQueries([userKeys.info(params)][0]);
      toastOpen({
        description: '닉네임이 변경 되었습니다.',
        status: 'success'
      });
    },
    onError: (error) => {
      toastOpen({
        description: '닉네임 변경에 실패하였습니다.',
        status: 'error'
      });
    }
  });

  return {
    nick,
    changeNick,
    description,
    setDescription,
    handleValidation,
    valid,
    validMessage,
    nickUpdate
  };
};

export default useNickUpdateHooks;

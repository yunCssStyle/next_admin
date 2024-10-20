'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { searchUserType } from '@/common/config';
import useAlert from '@/common/hook/useAlert';

export const useHooks = () => {
  const router = useRouter();
  const path = usePathname();
  const pathSplit = path.split('/');
  const searchParams = useSearchParams();
  const { Alert, alertOpen, alertClose } = useAlert('searchAlert');

  const [type, setType] = useState(
    searchParams.get('type')
      ? searchParams.get('type')
      : searchUserType[0].value || ''
  );

  const [keyword, setKeyword] = useState<string | number>(
    searchParams.get('keyword') || ''
  );

  const handleSearch = () => {
    if (type === searchUserType[0].value) {
      if (!/^$|[0-9]+$/g.test(keyword as string)) {
        alertOpen({
          title: '숫자만 입력해주세요.',
          description: 'UID는 숫자만 입력 가능합니다.',
          ok: () => {
            setKeyword('');
            alertClose();
          }
        });
        return;
      }
    }
    if (type === searchUserType[2].value) {
      if (!/^\S+@\S+\.\S+$/.test(keyword as string)) {
        alertOpen({
          title: '구글 이메일을 입력해주세요.',
          description: '이메일만 검색이 가능합니다.',
          ok: () => {
            setKeyword('');
            alertClose();
          }
        });
        return;
      }
    }
    if (type === searchUserType[3].value) {
      if (!/^\S+@\S+\.\S+$/.test(keyword as string)) {
        alertOpen({
          title: '애플 이메일을 입력해주세요.',
          description: '이메일만 검색이 가능합니다.',
          ok: () => {
            setKeyword('');
            alertClose();
          }
        });
        return;
      }
    }
    let params = type ? '?type=' + type : '';
    params += keyword ? (type ? '&' : '?') + 'keyword=' + keyword : '';
    if (pathSplit.length > 3) {
      router.push(`${path}/${params}`);
    } else {
      router.push(`/${pathSplit[1]}/${pathSplit[2]}/information/${params}`);
    }
  };

  return { handleSearch, type, setType, keyword, setKeyword, Alert };
};

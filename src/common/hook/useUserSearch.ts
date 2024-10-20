'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import _ from 'lodash';

export const useUserSearch = () => {
  const router = useRouter();
  const path = _.split(usePathname(), '/');

  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  const handleSearch = () => {
    let params = category ? '?category=' + category : '';
    params += keyword ? (category ? '&' : '?') + 'keyword=' + keyword : '';

    router.push(`/${path[1]}/${path[2]}/information/${params}`);
  };

  return { handleSearch, category, setCategory, keyword, setKeyword };
};

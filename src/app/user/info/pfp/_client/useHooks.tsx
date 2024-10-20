import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { searchUserType } from '@/common/config';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { userKeys } from '@/common/key/serverKey';
import { fetcher } from '@/common/api';
import { PAGE_SIZE } from '@/common/constant';

interface IStat {
  luck: number;
  silverTongue: number;
  stamina: number;
  intuition: number;
}

interface IPioneers {
  id: number;
  equipped: boolean;
  stat: IStat;
  statBonus: IStat;
  legendStatBonus: number;
  url: string;
  type: 'IMAGE' | 'MOVIE';
  name: string;
  tokenId: number;
  collectionId: number;
  collectionName: string;
}

interface IResponseBody {
  memberId: number;
  nickname: string;
  nextPage: number;
  total: number;
  hasMore: boolean;
  size: number;
  pioneers: IPioneers[];
}

interface IPfpInfo {
  totalPage: number;
  memberId: number;
  nickname: string;
  pfp: {
    id: number;
    status: boolean;
    collectionName: string;
    tokenId: number;
    luck: {
      basic: number;
      whiteList: number;
      legend: number;
    };
    silverTongue: {
      basic: number;
      whiteList: number;
      legend: number;
    };
    stamina: {
      basic: number;
      whiteList: number;
      legend: number;
    };
    intuition: {
      basic: number;
      whiteList: number;
      legend: number;
    };
    stats: {
      basic: number;
      whiteList: number;
      legend: number;
    };
  }[];
}

const UseHooks = () => {
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type') || '';

  const [type, setType] = useState('');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [provider, setProvider] = useState('');
  const [page, setPage] = useState(0);

  const searchEffect = useCallback(() => {
    if (searchType) {
      setType(
        searchType === searchUserType[2].value ||
          searchType === searchUserType[3].value
          ? 'EMAIL'
          : searchType
      );
      setKeyword(searchParams.get('keyword') || '');
      setProvider(
        searchType === searchUserType[2].value ||
          searchType === searchUserType[3].value
          ? searchType
          : ''
      );
    }
  }, [searchParams, searchType]);

  useEffect(() => {
    searchEffect();
  }, [searchEffect]);

  // 유저 조회 > 유저 정보 & 운영 관리 > 유저 관리보
  // PFP
  const postPfpList = async ({
    queryKey
  }: QueryFunctionContext<ReturnType<(typeof userKeys)['pfp']>>) => {
    const [_key, params] = queryKey;
    if (params.type === '') return {} as any;
    const result = (await fetcher.post(_key, params)).data as IResponseBody;

    if ((typeof result as string) === 'string')
      return result as IResponseBody & IPfpInfo;

    return {
      totalPage: Math.ceil(result.total / PAGE_SIZE),
      memberId: result.memberId,
      nickname: result.nickname,
      pfp: result.pioneers.map((item) => {
        if (!item.stat) {
          item.stat = {
            luck: 0,
            silverTongue: 0,
            stamina: 0,
            intuition: 0
          };
        }
        if (!item.statBonus) {
          item.statBonus = {
            luck: 0,
            silverTongue: 0,
            stamina: 0,
            intuition: 0
          };
        }
        return {
          id: item.id,
          status: item.equipped,
          collectionName: item.collectionName,
          tokenId: item.tokenId,
          luck: {
            basic: item.stat.luck,
            whiteList: item.statBonus.luck,
            legend: item.legendStatBonus
          },
          silverTongue: {
            basic: item.stat.silverTongue,
            whiteList: item.statBonus.silverTongue,
            legend: item.legendStatBonus
          },
          stamina: {
            basic: item.stat.stamina,
            whiteList: item.statBonus.stamina,
            legend: item.legendStatBonus
          },
          intuition: {
            basic: item.stat.intuition,
            whiteList: item.statBonus.intuition,
            legend: item.legendStatBonus
          },
          stats: {
            basic:
              item.stat.luck +
              item.stat.silverTongue +
              item.stat.stamina +
              item.stat.intuition,
            whiteList:
              item.statBonus.luck +
              item.statBonus.silverTongue +
              item.statBonus.stamina +
              item.statBonus.intuition,
            legend: item.legendStatBonus
          }
        };
      })
    } as IPfpInfo;
  };

  const { data: pfpInfo } = useQuery(
    [...userKeys.pfp({ type, keyword, provider, page })],
    postPfpList
  );

  return { pfpInfo, page, setPage };
};

export default UseHooks;

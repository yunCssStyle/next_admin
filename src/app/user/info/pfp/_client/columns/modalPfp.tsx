import { GridColDef } from '@mui/x-data-grid';
import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export const modalPfp: GridColDef[] = [
  {
    field: 'changeDateTime',
    headerName: '일시',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const row = params.row;
      return (
        <>
          {dayjs(row.changeDateTime).format('YYYY/MM/DD')}
          <br />
          {dayjs(row.changeDateTime).format('HH:mm:ss')}
        </>
      );
    },
    sortable: false,
    flex: 1
  },
  {
    field: 'collectionName',
    headerName: '컬렉션',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    width: 200
  },
  {
    field: 'tokenId',
    headerName: '토큰 ID',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'luck',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          LUCK
          <br />
          (B+W+L)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'silverTongue',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Silver
          <br />
          Tongue
          <br />
          (B+W+L)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'stamina',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Stamina
          <br />
          (B+W+L)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'intuition',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          Intuition
          <br />
          (B+W+L)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'stats',
    renderHeader: () => {
      return (
        <Box sx={{ lineHeight: 1 }}>
          스탯 합<br />
          (B+W+L)
        </Box>
      );
    },
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'reason',
    headerName: '변경 사유',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    flex: 1
  },
  {
    field: 'worker',
    headerName: '작업자',
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    width: 150
  }
];

// todo : 테스트 데이터 추후 삭제
export const rowsData = (lens: number) => {
  const data = (): any => {
    return {
      changeDateTime: faker.date.anytime(),
      collectionName: faker.internet.displayName(),
      tokenId: `#${faker.number.int({ min: 1, max: 10000 })}`,
      luck: `${faker.number.int({ min: 1, max: 25 })}+${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({ min: 1, max: 25 })}`,
      silverTongue: `${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({ min: 1, max: 25 })}`,
      stamina: `${faker.number.int({ min: 1, max: 25 })}+${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({ min: 1, max: 25 })}`,
      intuition: `${faker.number.int({ min: 1, max: 25 })}+${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({ min: 1, max: 25 })}`,
      stats: `${faker.number.int({ min: 1, max: 25 })}+${faker.number.int({
        min: 1,
        max: 25
      })}+${faker.number.int({ min: 1, max: 25 })}`,
      reason: `스탯 변경권`,
      worker: faker.internet.displayName()
    };
  };
  return _.map([...Array(lens)], () => {
    return { ...data(), id: faker.string.uuid() };
  });
};

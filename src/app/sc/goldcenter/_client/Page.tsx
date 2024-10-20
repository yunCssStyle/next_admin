'use client';

import Typography from '@mui/material/Typography';
import {
  Box,
  Divider,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Chip
} from '@mui/material';

import { CommonButton } from '@/common/component/Form';
import useHooks from '@/app/sc/goldcenter/_client/useHooks';
import { DataTable } from '@/common/component/Table';
import { goldcenter } from '@/app/sc/goldcenter/_client/columns/goldcenter';
import { useUtils } from '@/common/hook/useUtils';

const Page = () => {
  const {
    revenuePot,
    inGamePot,
    calculate,
    disabled,
    tokenTransferList,
    page,
    setPage,
    addrType,
    setAddrType
  } = useHooks();
  const { numberWithCommas } = useUtils();

  return (
    <>
      <Typography variant={'h5'} sx={{ mb: 2 }}>
        In Game Pot
      </Typography>
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          mb: 2
        }}
      >
        <Typography variant={'body2'} sx={{ mb: 1 }}>
          In Game Pot 보유 수량
        </Typography>
        <Typography variant={'h6'} sx={{ flexGrow: 1, textAlign: 'center' }}>
          {numberWithCommas(inGamePot)}{' '}
          <Chip label={'MZT'} sx={{ display: 'inline', fontSize: 10 }} />
        </Typography>
      </Box>
      <Divider sx={{ m: 4 }} />
      <Typography variant={'h5'} sx={{ mb: 2 }}>
        Revenue Pot
      </Typography>
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography variant={'body2'}>Revenue Pot 보유 수량</Typography>
        <Typography variant={'h6'} sx={{ flexGrow: 1, textAlign: 'center' }}>
          {numberWithCommas(revenuePot)}{' '}
          <Chip label={'MZT'} sx={{ display: 'inline', fontSize: 10 }} />
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', mt: 2, mb: 4, gap: 1 }}>
        <CommonButton
          disabled={disabled}
          label={'Revenue Pot 정산 요청'}
          searchButton={true}
          fullWidth={true}
          handle={() => calculate()}
        />
      </Box>
      <Divider sx={{ m: 4 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant={'h5'}>MZT Transfer History</Typography>
        <FormControl size={'small'}>
          <Select
            sx={{ minWidth: 100 }}
            value={addrType}
            onChange={(e) => {
              setPage(0);
              setAddrType(e.target.value as string);
            }}
          >
            <MenuItem value={' '}>All</MenuItem>
            <MenuItem value={'1'}>Inflow</MenuItem>
            <MenuItem value={'0'}>Outflow</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataTable
        columns={goldcenter}
        data={tokenTransferList?.data}
        totalPage={Math.ceil(tokenTransferList?.listSize / 20)}
        page={page}
        handlePage={setPage}
        minHeight={578}
        autoRowHeight={true}
      />
    </>
  );
};

export default Page;

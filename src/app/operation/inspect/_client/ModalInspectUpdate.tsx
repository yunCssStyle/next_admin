import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import {
  CommonButton,
  DescriptionInput,
  SearchSelect,
  SelectDateTimeRange
} from '@/common/component/Form';
import useModal from '@/common/hook/useModal';
import useAlert from '@/common/hook/useAlert';
import { inspectLimitType } from '@/common/config';
import React, { useCallback, useEffect } from 'react';
import { rowStyle } from '@/common/theme/styles';
import useInspectUpdateHooks from '@/app/operation/inspect/_client/useInspectUpdateHooks';
import dayjs from 'dayjs';
import { INSPECT_LIMIT_TYPE_APP } from '@/common/constant';

const ModalInspectUpdate = ({
  modalKey,
  id
}: {
  modalKey?: string | readonly string[];
  id: string;
}) => {
  const { modalClose } = useModal(modalKey || '');
  const { Alert, alertOpen, alertClose } = useAlert();
  const {
    scope,
    setScope,
    title,
    setTitle,
    message,
    setMessage,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    detail,
    update,
    remove
  } = useInspectUpdateHooks();

  const handleNoticeUpdate = () => {
    alertOpen({
      title: '접속 차단 스케쥴 수정',
      description:
        '<span style="color:red">반드시 수정 내용이 맞는지 확인 후 수정해 주세요.</span>',
      isCancel: true,
      ok: () => {
        update({
          id,
          scope,
          title,
          message,
          startDateTime,
          endDateTime
        });
        alertClose();
        modalClose();
      }
    });
  };

  const handleNoticeRemove = () => {
    alertOpen({
      title: '접속 차단 스케쥴 삭제',
      description:
        '<span style="color:red">반드시 삭제 하시려는 스케쥴이 맞는지 확인 후 삭제해 주세요.</span>',
      isCancel: true,
      ok: () => {
        remove({ id });
        alertClose();
        modalClose();
      }
    });
  };

  const initEffect = useCallback(() => {
    detail({ id });
  }, [detail, id]);

  useEffect(() => {
    initEffect();
  }, [initEffect]);

  return (
    <Box sx={{ width: '650px' }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}
      >
        접속 차단 스케쥴 수정
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                차단 범위
              </TableCell>
              <TableCell align="left">
                <SearchSelect
                  selectOptions={inspectLimitType}
                  defaultSelect={scope}
                  handle={setScope}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                메시지
              </TableCell>
              <TableCell align="left">
                <DescriptionInput
                  textArea={true}
                  placeholder={
                    scope === INSPECT_LIMIT_TYPE_APP
                      ? '메시지를 입력하세요.'
                      : '<div>\n' +
                        '  <h5>Title</h5>\n' +
                        '    <ul>\n' +
                        '      <li>desc 1</li>\n' +
                        '      <li>desc 2</li>\n' +
                        '    </ul>\n' +
                        '</div>\n' +
                        '<div>\n' +
                        '  <h5>Title2</h5>\n' +
                        '    <ul>\n' +
                        '      <li>desc 1</li>\n' +
                        '      <li>desc 2</li>\n' +
                        '    </ul>\n' +
                        '</div>'
                  }
                  defaultValue={message}
                  handle={(value: string) => setMessage(value)}
                />
              </TableCell>
            </TableRow>
            <TableRow sx={rowStyle}>
              <TableCell component="th" scope="row" width={'20%'}>
                접속 차단 시작/종료 일시
              </TableCell>
              <TableCell align="left">
                <SelectDateTimeRange
                  defaultStartDateTime={dayjs(startDateTime)}
                  defaultEndDateTime={dayjs(endDateTime)}
                  disabledPast={false}
                  timeZone={'UTC'}
                  seconds={true}
                  handle={(value) => {
                    setStartDateTime(value.startDateTime as string);
                    setEndDateTime(value.endDateTime as string);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
        <CommonButton
          label={'닫기'}
          variant={'outlined'}
          size={'large'}
          handle={() => {
            modalClose();
          }}
        />
        <CommonButton
          label={'삭제'}
          variant={'contained'}
          size={'large'}
          handle={handleNoticeRemove}
        />
        <CommonButton
          disabled={!message || !startDateTime || !endDateTime}
          label={'수정'}
          variant={'contained'}
          size={'large'}
          handle={handleNoticeUpdate}
        />
      </Box>
      <Alert />
    </Box>
  );
};

export default ModalInspectUpdate;

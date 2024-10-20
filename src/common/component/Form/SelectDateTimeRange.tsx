'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DateOrTimeView, DateTimePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SelectDateTimeRange = ({
  defaultStartDateTime,
  defaultEndDateTime,
  seconds,
  disabledPast,
  timeZone,
  handle
}: {
  defaultStartDateTime?: dayjs.Dayjs | string;
  defaultEndDateTime?: dayjs.Dayjs | string;
  seconds?: boolean;
  disabledPast?: boolean;
  timeZone?: string;
  handle?: (value: {
    startDateTime: string | dayjs.Dayjs | null;
    endDateTime: string | dayjs.Dayjs | null;
  }) => void;
}) => {
  const [startDateTime, setStartDateTime] = useState<
    dayjs.Dayjs | string | null
  >(null);
  const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | string | null>(
    null
  );
  let viewOptions: DateOrTimeView[] = [
    'year',
    'month',
    'day',
    'hours',
    'minutes'
  ];
  if (seconds) viewOptions.push('seconds');

  useEffect(() => {
    if (startDateTime && endDateTime) {
      if (handle)
        handle({
          startDateTime: dayjs(startDateTime).format(),
          endDateTime: dayjs(endDateTime).format()
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateTime, endDateTime]);

  useEffect(() => {
    if (defaultStartDateTime && defaultEndDateTime) {
      setStartDateTime(dayjs(defaultStartDateTime));
      setEndDateTime(dayjs(defaultEndDateTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStartDateTime, defaultEndDateTime]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 550
      }}
    >
      <DateTimePicker
        slotProps={{
          textField: {
            size: 'small',
            sx: {
              ['input[type="text"]:disabled']: {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)'
              }
            },
            InputProps: { disabled: true }
          },
          actionBar: {
            actions: []
          }
        }}
        disablePast={disabledPast}
        ampm={false}
        timezone={timeZone ? timeZone : 'system'}
        value={startDateTime}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        closeOnSelect={false}
        onChange={(date) => {
          setStartDateTime(dayjs(date));
        }}
        views={viewOptions}
      />
      <ArrowForwardIcon sx={{ mx: 1 }} />
      <DateTimePicker
        slotProps={{
          textField: {
            size: 'small',
            sx: {
              ['input[type="text"]:disabled']: {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)'
              }
            },
            InputProps: { disabled: true }
          },
          actionBar: {
            actions: []
          }
        }}
        disabled={!startDateTime}
        disablePast={disabledPast}
        minDateTime={startDateTime}
        ampm={false}
        timezone={timeZone ? timeZone : 'system'}
        value={endDateTime}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        closeOnSelect={false}
        onAccept={(date) => {
          setEndDateTime(dayjs(date));
        }}
        views={viewOptions}
      />
    </Box>
  );
};

export default SelectDateTimeRange;

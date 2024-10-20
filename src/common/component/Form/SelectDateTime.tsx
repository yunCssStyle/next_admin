'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DateTimePicker, DateOrTimeView } from '@mui/x-date-pickers';

const SelectDateTime = ({
  defaultDateTime,
  seconds,
  disabledPast,
  timezone,
  handle
}: {
  defaultDateTime?: dayjs.Dayjs;
  seconds?: boolean;
  disabledPast?: boolean;
  timezone?: string;
  handle?: (e: string) => void;
}) => {
  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(null);
  let viewOptions: DateOrTimeView[] = [
    'year',
    'month',
    'day',
    'hours',
    'minutes'
  ];
  if (seconds) viewOptions.push('seconds');

  useEffect(() => {
    if (defaultDateTime) {
      setDateTime(dayjs(defaultDateTime));
    }
  }, [defaultDateTime]);

  return (
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
      value={dateTime}
      timezone={timezone ? timezone : 'system'}
      timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
      closeOnSelect={false}
      onChange={(date) => {
        setDateTime(dayjs(date));
        if (handle) handle(dayjs(date).format());
      }}
      views={viewOptions}
    />
  );
};

export default SelectDateTime;

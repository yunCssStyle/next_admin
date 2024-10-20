import { useState, ChangeEvent } from 'react';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import _ from 'lodash';

const SelectRadio = ({
  defaultRadio,
  radioList,
  handle,
  disabledItem
}: {
  defaultRadio?: string | number;
  radioList?: { value: string | number; label: string }[];
  handle?: (value: string | number) => void;
  disabledItem?: string[];
}) => {
  const [state, setState] = useState(defaultRadio || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setState(value);
    if (handle) handle(value);
  };

  return (
    <RadioGroup row value={state} onChange={handleChange}>
      {_.map(radioList, (item, index) => (
        <FormControlLabel
          disabled={disabledItem && _.includes(disabledItem, item.value)}
          control={<Radio />}
          value={item.value}
          label={item.label}
          key={item.label + index}
        />
      ))}
    </RadioGroup>
  );
};

export default SelectRadio;

import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, Select } from '@mui/material';
import _ from 'lodash';
import MenuItem from '@mui/material/MenuItem';

const SearchSelect = ({
  selectOptions,
  defaultSelect,
  size,
  fullwidth,
  handle
}: {
  selectOptions?: { value: string; label: string }[];
  defaultSelect?: string;
  size?: 'small' | 'medium';
  fullwidth?: boolean;
  handle?: (e: string) => void;
}) => {
  const [selectValue, setSelectValue] = useState(defaultSelect || '');
  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value as string);
    if (handle) handle(e.target.value as string);
  };

  useEffect(() => {
    setSelectValue(defaultSelect || '');
  }, [defaultSelect]);

  return (
    <FormControl size={size ? size : 'small'} fullWidth={fullwidth}>
      <Select value={selectValue} onChange={handleSelectChange}>
        {_.map(selectOptions || [], (item, index) => (
          <MenuItem value={item.value} key={item.label + index}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SearchSelect;

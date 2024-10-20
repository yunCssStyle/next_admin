import { ReactNode } from 'react';
import { TextField } from '@mui/material';

const SearchInput = ({
  defaultValue,
  placeholder,
  fullwidth,
  halfwidth,
  ariaDescribedby,
  endAdornment,
  handle,
  handleKeyDown,
  readOnly,
  width
}: {
  defaultValue?: string | number;
  placeholder?: string;
  fullwidth?: boolean;
  halfwidth?: boolean;
  ariaDescribedby?: string;
  endAdornment?: ReactNode;
  handle?: (e: string) => void;
  handleKeyDown?: () => void;
  readOnly?: boolean;
  width?: string | number;
}) => {
  return (
    <TextField
      onChange={(e: any) => {
        if (handle) handle((e.target.value as string) || '');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (handleKeyDown) handleKeyDown();
        }
      }}
      value={defaultValue}
      placeholder={
        placeholder ? placeholder : '조회하실 유저의 정보를 입력해 주세요.'
      }
      fullWidth={fullwidth}
      size={'small'}
      aria-describedby={ariaDescribedby}
      sx={width ? (halfwidth ? { width: '50%' } : { width: width }) : null}
      InputProps={{
        endAdornment: endAdornment ? endAdornment : null
      }}
      disabled={readOnly}
    />
  );
};

export default SearchInput;

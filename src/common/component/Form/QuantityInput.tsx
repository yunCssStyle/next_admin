import { InputAdornment, TextField } from '@mui/material';

const QuantityInput = ({
  defaultValue,
  placeholder,
  fullWidth,
  handle,
  handleKeyDown,
  endAdornment,
  endAdornmentLabel,
  readOnly,
  decimal
}: {
  defaultValue?: number | string;
  placeholder?: string;
  fullWidth?: boolean;
  handle?: (e: number) => void;
  handleKeyDown?: () => void;
  endAdornment?: boolean;
  endAdornmentLabel?: string;
  readOnly?: boolean;
  decimal?: boolean;
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      onChange={(e: any) => {
        const value = e.target.value;
        if (decimal) {
          if (!/^[\d]*\.?[\d]{0,6}$/.test(value)) return;
        } else {
          if (!/^(?!0\d)([0-9]+)?(\.[0-9]+)?$/g.test(value)) return;
        }

        if (handle) handle(e.target.value as string as unknown as number);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (handleKeyDown) handleKeyDown();
        }
      }}
      value={defaultValue}
      placeholder={placeholder ? placeholder : '0'}
      size={'small'}
      disabled={readOnly}
      InputProps={{
        endAdornment: endAdornment ? (
          <InputAdornment position="start">
            {endAdornmentLabel ? endAdornmentLabel : 'Gold'}
          </InputAdornment>
        ) : null
      }}
    />
  );
};

export default QuantityInput;

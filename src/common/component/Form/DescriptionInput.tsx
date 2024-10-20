import { TextField } from '@mui/material';

const DescriptionInput = ({
  defaultValue,
  placeholder,
  readOnly,
  handle,
  textArea
}: {
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  handle?: (e: string) => void;
  textArea?: boolean;
}) => {
  return (
    <>
      <TextField
        fullWidth={true}
        multiline={textArea}
        rows={textArea ? 5 : 1}
        onChange={(e: any) => {
          if (handle) handle((e.target.value as string) || '');
        }}
        value={defaultValue}
        placeholder={placeholder ? placeholder : '사유를 입력해 주세요.'}
        size={'small'}
        disabled={readOnly}
      />
    </>
  );
};

export default DescriptionInput;

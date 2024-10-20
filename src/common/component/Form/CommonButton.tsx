import Button from '@mui/material/Button';

const CommonButton = ({
  label,
  variant,
  size,
  fullWidth,
  halfwidth,
  searchButton,
  sx,
  handle,
  disabled,
  textTransform
}: {
  label?: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  halfwidth?: boolean;
  searchButton?: boolean;
  sx?: any;
  handle?: () => void;
  disabled?: boolean;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}) => {
  let so = { ...sx };
  if (halfwidth) {
    so = { ...so, width: '50%' };
  }
  if (searchButton) {
    so = { ...so, height: '40px' };
  }
  if (textTransform) {
    so = { ...so, textTransform: textTransform };
  }
  return (
    <Button
      fullWidth={fullWidth}
      sx={so}
      size={size ? size : 'large'}
      variant={variant ? variant : 'contained'}
      onClick={handle ? handle : () => {}}
      disabled={disabled}
    >
      {label ? label : '조회'}
    </Button>
  );
};

export default CommonButton;

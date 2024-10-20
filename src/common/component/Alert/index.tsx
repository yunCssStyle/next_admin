'use client';

import { ReactNode } from 'react';
import { Alert } from '@/common/component/Alert/style';
import useAlert from '@/common/hook/useAlert';
import { Box } from '@mui/material';
import { CommonButton } from '@/common/component/Form';

type contents = {
  title: string;
  description: string | ReactNode;
  content?: ReactNode;
  isCancel?: boolean;
  buttonDisable?: boolean;
  cancelText?: string;
  cancel?: () => void;
  okText?: string;
  ok?: () => void;
};

const Index = ({ contents }: { contents: contents }) => {
  const { alertClose } = useAlert();
  const {
    title,
    description,
    content,
    isCancel,
    buttonDisable,
    cancelText,
    cancel,
    okText,
    ok
  } = contents;

  return (
    <Alert>
      <div className={`contents--wrap`}>
        <h2>{title}</h2>
        {typeof description === 'string' ? (
          <Box
            sx={{ pt: 2, pb: 1 }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <Box sx={{ pt: 2, pb: 1 }}>{description}</Box>
        )}
        {content ? <Box sx={{ py: 2 }}>{content}</Box> : null}
      </div>
      {buttonDisable ? null : (
        <div className={`button--wrap${isCancel ? ' confirm' : ' alert'}`}>
          {isCancel ? (
            <CommonButton
              label={cancelText ? cancelText : '취소'}
              variant={'outlined'}
              handle={cancel ? cancel : alertClose}
            />
          ) : null}
          <CommonButton
            label={okText ? okText : '확인'}
            variant={'contained'}
            handle={ok ? ok : alertClose}
          />
        </div>
      )}
    </Alert>
  );
};

export default Index;

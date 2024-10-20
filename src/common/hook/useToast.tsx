'use client';

import { useStore } from '@/common/hook/useStore';
import { Alert, Snackbar, Slide, SlideProps } from '@mui/material';
import { VariantType, useSnackbar } from 'notistack';
import _ from 'lodash';

type contents = {
  description: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  time?: number;
};

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { getStore: modalData, setStore: setModalData } = useStore({
    key: 'toast',
    initData: {
      isOpen: false,
      contents: {
        description: 'This is a Toast message!',
        status: 'error',
        time: 6000
      }
    }
  });

  const toastOpen = (value: contents) => {
    setModalData({
      isOpen: true,
      contents: _.merge(modalData.contents, value)
    });

    setTimeout(() => {
      toastClose();
    }, 3000);
  };

  const toastClose = () => {
    setModalData({ isOpen: false });
  };

  const notiOpen = ({
    description,
    variant
  }: {
    description: string | React.ReactNode;
    variant: VariantType;
  }) => {
    enqueueSnackbar(description, { variant });
  };

  const TransitionUp = (props: Omit<SlideProps, 'direction'>) => {
    return <Slide {...props} direction="up" />;
  };

  const Toast = () => (
    <>
      <Snackbar
        open={modalData?.isOpen}
        autoHideDuration={modalData.contents?.time}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={TransitionUp}
        onClose={toastClose}
      >
        <Alert
          onClose={toastClose}
          severity={modalData.contents?.status}
          sx={{ width: '100%' }}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: modalData.contents?.description
            }}
          />
        </Alert>
      </Snackbar>
    </>
  );

  return { Toast, toastOpen, toastClose, notiOpen };
};

export default useToast;

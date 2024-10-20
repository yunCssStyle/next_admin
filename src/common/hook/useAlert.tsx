'use client';

import { ReactNode } from 'react';
import { useStore } from '@/common/hook/useStore';
import { ModalDiv } from '@/common/hook/style';
import AlertComponent from '@/common/component/Alert';
import { popupKeys } from '@/common/key';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';

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

type modalData = {
  key: string | readonly string[];
  initData: {
    isOpen: boolean;
    contents: contents;
  };
};

export default function useAlert(key?: string | readonly string[]) {
  const { alert } = popupKeys;

  const { getStore: modalData, setStore: setModalData } = useStore({
    key: key ? key : alert,
    initData: {
      isOpen: false,
      contents: {
        title: '',
        description: null,
        content: null
      }
    }
  });

  const alertOpen = (contents: contents) => {
    setModalData({
      isOpen: true,
      contents: _.merge(modalData.contents, contents)
    });
  };

  const alertClose = () => {
    setModalData({ isOpen: false });
  };

  const Alert = () => (
    <>
      <Modal
        open={modalData?.isOpen}
        onClose={alertClose}
        aria-labelledby="modal-alert-title"
        aria-describedby="modal-alert-description"
        hideBackdrop={true}
      >
        <ModalDiv>
          <button className={'close'} onClick={alertClose}>
            <CloseIcon />
          </button>
          <AlertComponent contents={modalData.contents} />
        </ModalDiv>
      </Modal>
    </>
  );

  return { Alert, alertOpen, alertClose };
}

'use client';

import { useState, ReactNode } from 'react';
import { useStore } from '@/common/hook/useStore';
import { Modal as ModalComponent } from '@mui/material';
import { ModalDiv } from '@/common/hook/style';
import CloseIcon from '@mui/icons-material/Close';

export default function useModal(
  key: string | readonly string[],
  closeHandler?: () => void
) {
  const [contentsElement, setContentsElement] = useState<React.ReactNode>(
    <></>
  );

  const { getStore: modalData, setStore: setModalData } = useStore({
    key: key,
    initData: { isOpen: false }
  });

  const modalOpen = (contents: ReactNode | null) => {
    setContentsElement(contents);
    setModalData({ isOpen: true });
  };

  const modalClose = () => {
    setModalData({ isOpen: false });
    if (closeHandler) closeHandler();
  };

  const Modal = () => (
    <>
      <ModalComponent
        open={modalData?.isOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <ModalDiv>
          <div className={'contents'}>
            <button className={'close'} onClick={modalClose}>
              <CloseIcon />
            </button>
            {contentsElement}
          </div>
        </ModalDiv>
      </ModalComponent>
    </>
  );

  return { Modal, modalOpen, modalClose };
}

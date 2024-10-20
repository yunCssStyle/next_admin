'use client';

import styled from '@emotion/styled';

export const ModalDiv = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 200px;
  max-height: calc(100% - 100px);
  background: #fff;
  border-radius: 10px;
  padding: 20px 15px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .contents {
    width: 100%;
  }

  button.close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
  }
`;

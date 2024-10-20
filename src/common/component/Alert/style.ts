'use client';

import styled from '@emotion/styled';

export const Alert = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  .contents--wrap {
  }
  .button--wrap {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    gap: 10px;
    &.alert {
      button {
        width: 100%;
      }
    }
    &.confirm {
      button {
        width: calc(50% - 5px);
      }
    }
  }
`;

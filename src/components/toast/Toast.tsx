import React, { useState } from 'react';
import { StyledToastContainer } from './ToastContainer';
import {AlertIcon} from '../icon/Icon';
import { LightTheme } from '../../util/LightTheme';

export enum ToastType {
  ALERT = 'ALERT',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

interface ToastProps {
  message: string;
  type: ToastType;
  show?: boolean;
}

const Toast = ({ message, type, show }: ToastProps) => {
  const [isShown, setIsShown] = useState<boolean>(show ?? true);

  const iconMap = {
    [ToastType.ALERT]: <AlertIcon />,
    [ToastType.ERROR]: <AlertIcon color={"#ffffff"}/>,
    [ToastType.SUCCESS]: null,
  };

  const toastIcon = iconMap[type] || null;

  const close = () => {
    setIsShown(false);
  }

  return (
    <>
      {isShown && (
        <StyledToastContainer
          type={type}
          theme={LightTheme}
          onClick={close}
        >
          <>
            {toastIcon}
            <p>{message}</p>
          </>
          <button onClick={close}>X</button>
        </StyledToastContainer>
      )}
    </>
  );
};

export default Toast;

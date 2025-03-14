import styled from 'styled-components';
import { ToastType } from './Toast';
import { Theme } from '../../util/LightTheme';

interface ToastContainerProps {
  type: ToastType;
  theme: Theme;
}

export const StyledToastContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  position: fixed;
  bottom: 16px;
  left: 16px;
  height: 60px;
  min-width: 200px;
  justify-content: center;
  border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);

    border: 1px solid
    ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.errorContainer;
        case ToastType.SUCCESS:
          return props.theme.colors.white;
        case ToastType.ERROR:
          return props.theme.colors.errorContainer;
        default:
          return props.theme.colors.errorContainer;
      }
    }};
  background: ${(props: ToastContainerProps) => {
    switch (props.type) {
      case ToastType.ALERT:
        return props.theme.colors.outline;
      case ToastType.SUCCESS:
        return props.theme.colors.main;
      case ToastType.ERROR:
        return props.theme.colors.errorContainer;
      default:
    }
  }};

  p {
    color: ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.error;
        case ToastType.SUCCESS:
          return props.theme.colors.white;
        default:
          return props.theme.colors.white;
      }
    }};
    margin: 0;
    font-variant-numeric: lining-nums tabular-nums;
    /* Body-2 */
    font-family: ${({ theme }) => theme.font.default};
    font-size: 16px;
    font-style: normal;
    font-weight: ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return '500';
          case ToastType.SUCCESS:
            return 'Bold';
      }
    }};
    line-height: 110%; /* 13.2px */
    letter-spacing: -0.12px;
  }
  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

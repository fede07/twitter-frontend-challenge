import styled from 'styled-components';

export enum ButtonAltVariant {
  DEFAULT = 'DEFAULT',
  OUTLINED = 'OUTLINED',
  FULFILLED = 'FULFILLED',
  GHOST = 'GHOST',
  WHITE = 'WHITE',
}

export enum ButtonAltSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

interface ButtonAltProps {
  variant: ButtonAltVariant;
  size: ButtonAltSize;
}

export const StyledButtonAlt = styled.button<ButtonAltProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  max-height: ${(props) => {
    switch (props.size) {
      case ButtonAltSize.SMALL:
        return '32px';
      case ButtonAltSize.MEDIUM:
        return '40px';
      case ButtonAltSize.LARGE:
        return '48px';
    }
  }};

  height: 100%;

  background: ${(props) => {
    switch (props.variant) {
      case ButtonAltVariant.DEFAULT:
        return props.theme.colors.main;
      case ButtonAltVariant.OUTLINED:
        return props.theme.colors.white;
      case ButtonAltVariant.FULFILLED:
        return props.theme.colors.success;
      case ButtonAltVariant.GHOST:
        return props.theme.colors.black;
      case ButtonAltVariant.WHITE:
        return props.theme.colors.white;
      default:
        return props.theme.colors.main;
    }
  }};
  border-radius: 40px;
  border: ${(props) =>
    props.variant === ButtonAltVariant.OUTLINED ? '1px solid' : 'none'};

  font-family: ${(props) => props.theme.font.default};
  font-style: normal;
  font-weight: 800;
  font-size: ${(props) => {
    switch (props.size) {
      case ButtonAltSize.SMALL:
        return '12px';
      case ButtonAltSize.MEDIUM:
        return '14px';
      case ButtonAltSize.LARGE:
        return '16px';
    }
  }};

  color: ${(props) =>
    props.variant === ButtonAltVariant.OUTLINED
      ? props.theme.colors.black
      : props.theme.colors.white};

  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:active {
    transform: scale(0.95);
  }

  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case ButtonAltVariant.DEFAULT:
          return props.theme.hover.default;
        case ButtonAltVariant.OUTLINED:
          return props.theme.hover.outlined;
        case ButtonAltVariant.FULFILLED:
          return props.theme.hover.fulfilled;
        case ButtonAltVariant.GHOST:
          return props.theme.hover.ghost;
      }
    }};
  }
`;

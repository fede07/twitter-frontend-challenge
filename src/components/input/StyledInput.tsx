import styled from 'styled-components';

interface StyledInputProps {
  variant: InputVariant;
  inputSize: InputSize;
}

export enum InputVariant {
  DEFAULT = 'DEFAULT',
  OUTLINED = 'OUTLINED',
  FULFILLED = 'FULFILLED',
  GHOST = 'GHOST',
  WHITE = 'WHITE',
}

export enum InputSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export const StyledInput = styled.input<StyledInputProps>`
  display: flex;
    flex-direction: column;
  align-items: center;
  width: 100%;
    height: ${(props) => {
      switch (props.inputSize) {
        case InputSize.SMALL:
          return '20px';
        case InputSize.MEDIUM:
          return '48px';
        case InputSize.LARGE:
          return '56px';
        default:
          return '48px';
      }
    }};
  border: ${(props) => {
    switch (props.variant) {
      case InputVariant.OUTLINED:
        return '1px solid';
      case InputVariant.FULFILLED:
        return '1px solid';
      case InputVariant.GHOST:
        return '1px solid';
      case InputVariant.WHITE:
        return '1px solid';
      default:
        return 'none';
    }
  }}
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font.default}, serif;
  transition: all 0.3s ease-in-out;

  font-size: ${(props) => {
    switch (props.inputSize) {
      case InputSize.SMALL:
        return '12px';
      case InputSize.MEDIUM:
        return '14px';
      case InputSize.LARGE:
        return '16px';
      default:
        return '14px';
    }
  }};

  padding: ${(props) => {
    switch (props.inputSize) {
      case InputSize.SMALL:
        return '10px';
      case InputSize.MEDIUM:
        return '12px';
      case InputSize.LARGE:
        return '14px';
      default:
        return '12px';
    }
  }};
    
    
    
`;

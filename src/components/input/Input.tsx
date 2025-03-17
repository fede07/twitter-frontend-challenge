import {InputSize ,InputVariant ,StyledInput} from './StyledInput';
import { KeyboardEvent } from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (e: any) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  size: InputSize;
  variant?: InputVariant;
}

export const Input = ( {placeholder, type, value, size, variant, onChange, onKeyDown}: InputProps) => {
  return (
    <StyledInput
      type={type? type : "text"}
      placeholder={placeholder? placeholder : ""}
      value={value? value : ""}
      onChange={onChange}
      variant={variant? variant : InputVariant.OUTLINED}
      inputSize={size}
      onKeyDown={onKeyDown}
    />
  )
}

export default Input;

import {InputSize ,InputVariant ,StyledInput} from './StyledInput';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (e: any) => void;
  size: InputSize;
  variant?: InputVariant;
}

export const Input = ( {placeholder, type, value, size, variant, onChange}: InputProps) => {
  return (
    <StyledInput
      type={type? type : "text"}
      placeholder={placeholder? placeholder : ""}
      value={value? value : ""}
      onChange={onChange}
      variant={variant? variant : InputVariant.OUTLINED}
      inputSize={size}
    />
  )
}

export default Input;

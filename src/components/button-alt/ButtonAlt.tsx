import {ReactNode} from "react"
import {ButtonAltSize ,ButtonAltVariant ,StyledButtonAlt} from "./StyledButtonAlt"

interface ButtonAltProps {
  text?: string;
  variant: ButtonAltVariant;
  size: ButtonAltSize;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonAlt = ({text, variant, size, onClick, disabled, children} : ButtonAltProps) => {
  return (
    <StyledButtonAlt
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {text ? text : null}
      {children? children : null}
    </StyledButtonAlt>
  )
}

export default ButtonAlt;

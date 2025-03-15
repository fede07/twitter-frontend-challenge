import { ReactNode, MouseEventHandler } from "react";
import { ButtonType, StyledButton } from "./StyledButton";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined
  size: string;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  resizable?: boolean;
  children?: ReactNode;
}
const Button = ({ text, size, buttonType, onClick, disabled, type, resizable, children }: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
      type={type}
      resizable={resizable}
    >
      {children ? (
        <span>
              {children ? children : null}
      </span>
      ) : null}

      <p>{text}</p>
    </StyledButton>
  );
};

export default Button;

import React, { MouseEventHandler } from "react";
import { ButtonType, StyledButton } from "./StyledButton";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined
  size: string;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}
const Button = ({ text, size, buttonType, onClick, disabled, type }: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
      type={type}
    >
      {text}
    </StyledButton>
  );
};

export default Button;

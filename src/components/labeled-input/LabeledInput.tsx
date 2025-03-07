import React, { ChangeEvent } from "react";
import { StyledInputContainer } from "./InputContainer";
import { StyledInputTitle } from "./InputTitle";
import { StyledInputElement } from "./StyledInputElement";

interface InputWithLabelProps {
  id?: string;
  type?: "password" | "text";
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  errorText?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
}

const LabeledInput = ({
  id="",
  title,
  placeholder,
  required,
  error,
  errorText = "",
  onChange,
  onBlur,
  value,
  type = "text",
  name
}: InputWithLabelProps) => {
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const [focus, setFocus] = useState(false);

  // const handleFocus = () => {
  //   setFocus(true);
  // };
  //
  // const handleBlur = () => {
  //   setFocus(false);
  // };
  //
  // const handleClick = () => {
  //   if (!focus && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // };

  return (
    <>
      <StyledInputContainer
        className={`${error ? "error" : ""}`}
        //onClick={handleClick}
      >
        <StyledInputTitle
          className={`${error ? "error" : ""}`}
        >
          {title}
        </StyledInputTitle>
        <StyledInputElement
          id={id}
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={placeholder}
          //onFocus={handleFocus}
          onBlur={onBlur}
          onChange={onChange}
          className={error ? errorText : ""}
          //ref={inputRef}
        />
      </StyledInputContainer>
      {error && errorText && <span className="error-message">{errorText}</span>}
    </>

  );
};

export default LabeledInput;

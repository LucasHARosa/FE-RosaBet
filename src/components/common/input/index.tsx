import React, { HTMLInputTypeAttribute } from "react";
import InputMask from "react-input-mask";
import Text from "../text";
import { MaskType, mask } from "./utils";
import { InputBox, GroupInput } from "./styles";

export default function Input({
  name,
  value,
  handleValue,
  maskType = "NULL",
  placeholder,
  error = false,
  disabled = false,
  type = "text",
  height = "56px",
  border = 1,
  background,
  width = "auto",
  padding = "10px 12px",
  leftIcon,
  ...rest
}: InputProps) {
  return (
    <InputBox
      error={error}
      height={height}
      background={type==="checkbox"?"transparent":background}
      width={width}
      padding={padding}
      aria-disabled={disabled}
      border={type==="checkbox"? 0:border}
    >
      {leftIcon}
      <GroupInput>
        {(!!value || value === 0) && placeholder && (
          <Text htmlTag="small" font="label/body/xs/regular">
            {placeholder}
          </Text>
        )}
        <InputMask
          name={name}
          value={value}
          mask={mask[maskType]}
          placeholder={placeholder}
          maskChar={null}
          onChange={({ target }) => {
            handleValue && handleValue(target.value);
          }}
          disabled={disabled}
          type={type}
          autoComplete="off"
          {...rest}
        />
      </GroupInput>
    </InputBox>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
  handleValue?: (value: string) => void;
  maskType?: MaskType;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  border?:number;
  type?: HTMLInputTypeAttribute;
  height?: string;
  width?: string;
  background?: string;
  padding?: string;
  leftIcon?: JSX.Element;
}

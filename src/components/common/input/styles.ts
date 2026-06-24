import { typography } from "@/assets/themes/typograph";
import { colorPicker } from "@/utils/colorPicker";
import styled from "styled-components";

export const InputBox = styled.div<InputBoxProps>`
  display: flex;
  align-items: center;
  background-color: ${({ background, theme }) => background ? colorPicker(background) : theme.background.dynamic.whiteDynamic[4]};
  padding: ${({ padding }) => padding || "0 12px"};
  border-radius: 8px;
  gap: 8px;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  border: ${({ error, theme, border }) => `${border}px solid ${error ? theme.brand.primary[100]:theme.border.whiteDynamic[8] }` };
  
  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    color: ${({ theme, background}) => (background && background !== "transparent")? theme.text.absolute.whiteAbsolute[100]:theme.text.dynamic.whiteDynamic[100]};
    ${() => typography['label/body/m/regular']}

    &:disabled {
      opacity: 0.4;
    }
  }

  small {
    color: ${({ error,theme }) => (error ? theme.brand.primary[100] : theme.brand.secondary.accent.textYellow)};
  }

  &[aria-disabled="true"] {
    small {
      color: ${({ theme }) => theme.text.dynamic.whiteDynamic[80]};
    }
  }
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;

  input[type="checkbox"] {
    all: unset;
    border: 1px solid ${({ theme }) => theme.background.absolute.blackAbsolute[100]};
    color: ${({ theme }) => theme.background.absolute.blackAbsolute[100]};
    background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 120px;
    position: relative;
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background-color: ${({ theme }) => theme.brand.secondary.accent.textYellow};
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    display: block;
    width: 10px;
    height: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -77%) rotate(6deg);
  }
`;

interface InputBoxProps {
  error: boolean;
  height?: string;
  width?: string;
  background?: string;
  padding?: string;
  border:number;
}

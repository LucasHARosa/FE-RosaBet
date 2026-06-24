import { colorPicker } from "@/utils/colorPicker";
import styled from "styled-components";

interface Props {
  color?: string;
  bg?: string;
  font: string;
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  small,
  strong {
    display: ${({ hidden }) => (hidden ? "none" : "flex")};
    padding: ${({ bg }) => (bg ? "2px 6px" : "0")};
    border-radius: 4px;
    /* letter-spacing: -0.2px; */
    ${({ font }) => font}
    background-color: ${({ bg }) => bg ? colorPicker(bg) : "transparent" };
    color: ${({color}) => color? 
      colorPicker(color) : 
      colorPicker("text.dynamic.whiteDynamic.100")
    }
  }
`;

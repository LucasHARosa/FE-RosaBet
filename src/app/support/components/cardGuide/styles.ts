import styled from "styled-components";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background-color: ${(props) => (props.selected ? props.theme.brand.secondary[24] : props.theme.background.dynamic.whiteDynamic[8])};
  border-radius: 12px;
  cursor: pointer;
`;

interface ContainerProps {
  selected: boolean;
}

import styled from "styled-components";

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  justify-content: right;
`;

export const SubRule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Detail = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  text-align: justify;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 60vh;
  overflow-y: scroll;
`;

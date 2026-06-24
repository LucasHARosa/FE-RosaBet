import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px;
`;

export const BoxCurrency = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Money = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex: 3;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 12px 16px;
  border-radius: 8px;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
`;

export const Options = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;



export const Amount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;

export const GroupDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 4px;

  @media (max-width: 768px) {
    & > button:not(:first-of-type) {
      display: none;
    }
  }
`;

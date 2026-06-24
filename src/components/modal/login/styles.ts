import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  text-align: center;
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Register = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: 4px;
  border-top: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  padding: 12px;
  margin-bottom: 78px;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

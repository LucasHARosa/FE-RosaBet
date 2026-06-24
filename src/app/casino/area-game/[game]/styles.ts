import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
  padding: 24px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoLeft = styled.div`
  display: flex;
  gap: 6px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 10px 14px;
  gap: 6px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
`;

export const Iframe = styled.iframe`
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
  border-radius: 16px;
  min-height: 80vh;
`;

export const LoadingFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
  height: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
  border-radius: 16px;
  min-height: 80vh;
`;

export const Recommended = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

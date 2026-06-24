import styled from "styled-components";

export const HeaderBox = styled.header<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ isMobile }) => (isMobile ? "8px 16px" : "20px 24px")};
  justify-content: space-between;
  height: ${({ isMobile }) => (isMobile ? "60px" : "80px")};
  background: ${({theme}) => theme.misc.blackDynamic[40]};
  backdrop-filter: blur(10px);
  width: 100%;
  border-bottom: 1px solid ${({theme}) => theme.border.whiteDynamic[8]};
  position: fixed;
  top: 0;
  gap: ${({ isMobile }) => (isMobile ? "8px" : "16px")};
  z-index: 9999;
`;

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
`;

export const Menu = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ isMobile }) => (isMobile ? "4px" : "16px")};

  > svg {
    background-color: transparent;
  }

  > a {
    ${({ isMobile }) => isMobile && "padding: 4px;"}
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LogoText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  .brand-name {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
    letter-spacing: -0.3px;
  }

  .brand-sub {
    font-size: 11px;
    font-weight: 400;
    color: ${({ theme }) => theme.text.dynamic.whiteDynamic[60]};
    letter-spacing: 2px;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
`;
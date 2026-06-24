import styled from "styled-components";

export const Box = styled.div<{ isMobile: boolean }>`
  padding: 0 4px;
  width: ${(props) => (props.isMobile ? "314px" : "410px")};
  cursor: pointer;
`;

export const Item = styled.div<{ img: string; isSport?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 12px;
  height: 100%;
  min-height: 164px;
  justify-content: space-between;
  gap: 8px;
  background: ${(props) =>
    props.isSport
      ? `linear-gradient(90deg, ${props.theme.misc.modal} 0%, transparent 100%), url(${props.img})`
      : `url(${props.img})`};
  background-size: cover;
  background-position: center;
`;

export const InfoTeam = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const GroupOdds = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const OddItem = styled.div`
  border: 1.5px solid ${({ theme }) => theme.border.whiteDynamic[16]};
  background: ${({ theme }) => theme.misc.blackDynamic[40]};
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 6px;
  width: 100%;
  justify-content: center;
  text-align: center;

`;

import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  padding: 8px 12px;
  gap: 8px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InfoTeam = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
export const Team = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const DetailOdds = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 40px;
`;

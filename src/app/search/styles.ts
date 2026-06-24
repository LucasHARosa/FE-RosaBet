import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background:
    linear-gradient(rgba(17, 17, 17, 0.75), rgba(17, 17, 17, 0.75)),
    url("/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Main = styled.main`
  padding: 16px 24px;
`;

export const CoatOfArms = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const Group = styled.div`
  display: flex;
  gap: 4.8px;
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const InfoFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const GroupCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 8px;
  padding: 8px 16px;
`;

export const Paper = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 16px;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  justify-content: space-between;

  &:hover {
    opacity: 0.8;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

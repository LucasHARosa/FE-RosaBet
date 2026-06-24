"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.8)),
    /* Gradiente */ url("/background.png");
  background-size: cover;
  background-position: center;
  padding: 24px;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
`;

export const InfoLeft = styled.div`
  display: flex;
  gap: 6px;
`;

export const Back = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.background.absolute.whiteAbsolute[8]};
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  border-radius: 12px;
  color: ${({ theme }) => theme.text.absolute.whiteAbsolute[100]};
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  height: 48px;
  padding: 0 16px;
  gap: 6px;
  background-color: ${({ theme }) => theme.background.absolute.whiteAbsolute[8]};
`;

export const Collection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(162px, 1fr));
  grid-auto-rows: 1fr;
  padding: 0 26px;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

"use client";
import { typography } from "@/assets/themes/typograph";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 18px;

  @media (max-width: 768px) {
    padding: 12px 8px;
  }
`;

export const GroupHome = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

export const Card = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 24px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  position: relative;

  img {
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;

    img {
      right: 0;
      width: 80px;
      height: 80px;
    }
  }
`;

export const Redirect = styled.div`
  background-color: ${({ theme }) => theme.brand.primary[100]}; 
  padding: 12px 16px;
  border-radius: 12px;
  gap: 8px;
  ${() => typography["label/button/m/bold"]};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  .carousel-item-mt {
    margin: 0 4px;
  }
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 8px;
`;

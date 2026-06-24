"use client";
import Link from "next/link";
import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export const Hero = styled.div`
  background:
    linear-gradient(rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)),
    url("/background.png");
  background-size: cover;
  background-position: center;
  padding: 32px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  /* .carousel-item-mt {
    margin: 0 4px;
  } */
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardImage = styled.img`
  border-radius: 8px;
  border: 1px solid ${({theme})=> theme.border.whiteDynamic[8]};
  min-height: 142px;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const ViewAll = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${({theme})=> theme.background.dynamic.whiteDynamic[8]};
  border-radius: 8px;
  padding: 12px;
  width: fit-content;
  white-space: nowrap;
  filter: grayscale(100%);

  &:hover {
    filter: none;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;

  &::-webkit-scrollbar{
    height:5px;
    color: ${({theme})=> theme.text.dynamic.whiteDynamic[40]};
  }
`;

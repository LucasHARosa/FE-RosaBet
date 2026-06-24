"use client"
import styled, { keyframes } from "styled-components";
export default function Loading() {
  return (
    <ContainerLoading>
      <Spinner />
    </ContainerLoading>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.brand.secondary[24]};
  border-top: 4px solid ${({ theme }) => theme.brand.primary[100]};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;
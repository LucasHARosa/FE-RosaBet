"use client";
import { useRef } from "react";

export default function useHeader() {
  const modalLoginRef = useRef<any>();

  const handleLogin = () => {
    modalLoginRef?.current.openModal();
  };

  return { handleLogin, modalLoginRef };
}

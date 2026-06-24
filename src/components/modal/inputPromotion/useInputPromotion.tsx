"use client";

import { UserContext } from "@/contexts/UserContext";
import { CodePromotion } from "@/interfaces/promotion";
import { activatePromotionCode } from "@/service/promotion";
import { useContext, useImperativeHandle, useRef, useState } from "react";

export interface ModalInputProps {
  title: string;
  inputName: string;
  refreshPromotions: () => void;
}

export default function useInputPromotion(ref: any, { refreshPromotions }: ModalInputProps) {
  const modalSuccessCodeRef = useRef<any>();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const { isAuthenticaded, openLogin } = useContext(UserContext);
  const [codeError, setCodeError] = useState<number | null>(null);
  const [codeSuccess, setCodeSuccess] = useState<number | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => {
        setOpen(false);
      },
    }),
    [],
  );

  const closeModal = () => {
    setOpen(false);
    handleClear();
  };

  const handleClear = () => {
    setInputValue("");
    setCodeError(null);
    setCodeSuccess(null);
  };

  const buttonDisabled = () => {
    return inputValue.length < 1;
  };

  const onSubmitCode = async () => {
    setCodeError(null);
    if (!isAuthenticaded) {
      openLogin();
      closeModal();
      return;
    }
    const code = { code: inputValue.toLocaleUpperCase() } as CodePromotion;
    try {
      await activatePromotionCode(code);
      closeModal();
      modalSuccessCodeRef.current?.openModal();
      refreshPromotions();
    } catch (err: any) {
      //console.log("error on submit code",err);
      const code = err.code;
      setCodeError(code);
    } finally {
      setInputValue("");
    }
  };

  return {
    open,
    closeModal,
    inputValue,
    setInputValue,
    handleClear,
    codeError,
    onSubmitCode,
    codeSuccess,
    modalSuccessCodeRef,
    buttonDisabled,
  };
}

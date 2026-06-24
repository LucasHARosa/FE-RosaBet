"use client";
import { UserContext } from "@/contexts/UserContext";
import { useWindow } from "@/hooks/window";
import { login } from "@/service/auth";
import { FormEvent, useContext, useImperativeHandle, useRef, useState } from "react";

export default function useLogin(ref: any) {
  const [dataLogin, setDataLogin] = useState<any>({ username: "demo@rosabet.com", password: "demo123" });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const { handleUser, openRegister, openRecoverPassword } = useContext(UserContext);
  const { isMobile } = useWindow();
  const modal2FA = useRef<any>();

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => {
        setOpen(false);
        setCodeError(null);
      },
    }),
    [],
  );

  const closeModal = () => {
    setOpen(false);
    setCodeError(null);
    setDataLogin({ username: "demo@rosabet.com", password: "demo123" });
  };

  const onSubmit = async (event: FormEvent, authCode?: string) => {
    event.preventDefault();
    setCodeError(null);
    setIsLoading(true);

    const data: any = { ...dataLogin };
    if (authCode) {
      data.auth_code = authCode;
    }

    try {
      const response = await login(data);
      handleUser(response);
      closeModal();
    } catch (err: any) {
      const code = err.code;
      setCodeError(code);
      if (code === 1135) {
        modal2FA.current.openModal();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    closeModal();
    openRegister();
  };

  const handleRecoverPassword = () => {
    closeModal();
    openRecoverPassword();
  };

  return {
    open,
    isLoading,
    onSubmit,
    dataLogin,
    setDataLogin,
    codeError,
    closeModal,
    handleRegister,
    handleRecoverPassword,
    isMobile,
    modal2FA,
  };
}

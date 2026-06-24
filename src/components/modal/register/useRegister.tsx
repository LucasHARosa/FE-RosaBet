"use client";
import { UserContext } from "@/contexts/UserContext";
import { RegisterProps } from "@/interfaces/user";
import { checkStatusEmail, resendCode } from "@/service/auth";
import { useContext, useEffect, useImperativeHandle, useState } from "react";

export default function useRegister(ref: any) {
  const { isAuthenticaded } = useContext(UserContext);
  const [tokenCapctha, setTokenCapctha] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [dataRegister, setDataRegister] = useState<RegisterProps>({} as RegisterProps);
  const [open, setOpen] = useState(false);
  const [isHandleClose, setIsHandleClose] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [codeError, setCodeError] = useState<number | null>(null);
  const [] = useState<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        setOpen(true);
      },
      closeModal: () => {
        setOpen(false);
        setCodeError(null);
      },
      step: (value: number) => {
        setStep(value);
      },
      disableClose: () => {
        setIsHandleClose(true);
      },
    }),
    [],
  );

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const closeModal = () => {
    setOpen(false);
    setCodeError(null);
    setDataRegister({} as RegisterProps);
    setStep(0);
    // router.push('/');
  };

  const verifyEmail = async () => {
    try {
      const response = await checkStatusEmail();
      if (response?.is_confirmed === false) {
        setStep(2);
        setIsHandleClose(true);
        await resendCode();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuthenticaded && verifyEmail();
  }, [isAuthenticaded]);

  return {
    open,
    isLoading,
    codeError,
    closeModal,
    tokenCapctha,
    setTokenCapctha,
    step,
    setStep,
    nextStep,
    previousStep,
    dataRegister,
    setDataRegister,
    isHandleClose,
  };
}

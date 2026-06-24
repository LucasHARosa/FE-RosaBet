"use client";

import { forgotPassword } from "@/service/auth";

import { useCallback, useImperativeHandle, useRef, useState } from "react";

export default function useRecoverPassword(ref: any) {
  const modalSuccessRef = useRef<any>();
  const [step, setStep] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState<string>("");
  const [codeErrorDocument, setCodeErrorDocument] = useState<number | null>(null);
  const [loadingDocument, setLoadingDocument] = useState<boolean>(false);
  const [recover, setRecover] = useState<string>("");

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        setOpen(true);
      },
      closeModal: () => {
        setOpen(false);
      },
      step: (value: number) => {
        setStep(value);
      },
    }),
    [],
  );

  const handleSubmitDocument = async () => {
    const cpf = document.split(".").join("").split("-").join("");
    if (cpf.length < 11) {
      setCodeErrorDocument(8251);
      return;
    }
    try {
      setLoadingDocument(true);
      const response = await forgotPassword({ cpf: cpf, isWeb: true });
      console.log("response", response);
      setRecover(response[0].description);
      nextStep();
    } catch (error: any) {
      console.log("error", error);
      setCodeErrorDocument(error.code);
    } finally {
      setLoadingDocument(false);
    }
  };

  const handleHasCode = () => {
    const cpf = document.split(".").join("").split("-").join("");
    if (cpf.length === 0) {
      setCodeErrorDocument(1501);
      return;
    }
    if (cpf.length < 11) {
      setCodeErrorDocument(8251);
      return;
    }
    setStep(2);
    setCodeErrorDocument(null);
  };

  const handleOpenRecover = () => {
    if (!recover) {
      window.open("http://gmail.com/#search/rosabet", "_blank");
    }
    const emailDomain = recover.split("@")[1];
    let mailUrl;
    switch (emailDomain) {
      case "gmail.com":
        mailUrl = "http://gmail.com/#search/rosabet";
        break;
      case "yahoo.com":
        mailUrl = "https://mail.yahoo.com/";
        break;
      case "outlook.com":
        mailUrl = "https://outlook.live.com/mail/inbox";
        break;
      case "hotmail.com":
        mailUrl = "https://outlook.live.com/mail/inbox";
        break;
      case "aol.com":
        mailUrl = "https://mail.aol.com/";
        break;
      case "zoho.com":
        mailUrl = "https://mail.zoho.com/";
        break;
      case "protonmail.com":
        mailUrl = "https://mail.protonmail.com/inbox";
        break;
      case "icloud.com":
        mailUrl = "https://www.icloud.com/mail";
        break;
      default:
        mailUrl = "http://gmail.com/#search/rosabet";
        return;
    }
    window.open(mailUrl, "_blank");
  };

  const handleSucess = () => {
    setDocument("");
    closeModal();
    modalSuccessRef.current?.openModal();
  };

  const handleThirdStep = () => {
    setStep(2);
  };

  const nextStep = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const closeModal = () => {
    setOpen(false);
    setStep(0);
    setDocument("");
  };

  return {
    open,
    closeModal,
    step,
    modalSuccessRef,
    handleThirdStep,
    handleHasCode,
    handleOpenRecover,
    document,
    setDocument,
    handleSubmitDocument,
    loadingDocument,
    codeErrorDocument,
    recover,
    handleSucess,
  };
}

"use client";

import { passwordReset } from "@/service/auth";
import { useEffect, useState } from "react";

export interface ThirdStepProps {
  recover: string;
  document: string;
  handleSubmitDocument: () => void;
  handleSucess: () => void;
}

export default function useThirdStep({
  document,
  handleSubmitDocument,
  handleSucess,
}: ThirdStepProps) {
  const [codeErrorPassword, setCodeErrorPassword] = useState<number | undefined>(undefined);
  const [codeErrorCode, setCodeErrorCode] = useState<number | undefined>(undefined);
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [seconds, setSeconds] = useState(360);

  const sendCode = (code: string) => {
    setCode(code);
    setCodeErrorCode(undefined);
  };

  const clear = () => {
    setCode("");
    setPassword("");
    setConfirmPassword("");
    setCodeErrorPassword(undefined);
    setCodeErrorCode(undefined);
  };

  const handleSubmitPassword = async () => {
    if (password.length < 6) {
      setCodeErrorPassword(1502);
      return;
    }
    if (password !== confirmPassword) {
      setCodeErrorPassword(1500);
      return;
    }

    try {
      setLoadingPassword(true);
      const data = {
        code: code,
        password: password,
        cpf: document.split(".").join("").split("-").join(""),
        isWeb: true,
      };
      const response = await passwordReset(data);
      clear();
      handleSucess();
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
      setCodeErrorCode(error.code);
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleResendCode = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      setSeconds(360);
    }
    handleSubmitDocument();
  };

  const disableButton = () => {
    return password === "" || confirmPassword === "" || code === "";
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          setTimerRunning(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, timerRunning]);

  useEffect(() => {
    setCodeErrorPassword(undefined);
  }, [password, confirmPassword]);

  return {
    sendCode,
    handleSubmitPassword,
    handleResendCode,
    codeErrorPassword,
    codeErrorCode,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    disableButton,
    loadingPassword,
    timerRunning,
    seconds,
    setCodeErrorPassword,
  };
}

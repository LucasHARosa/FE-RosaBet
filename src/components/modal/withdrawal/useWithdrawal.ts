"use client";

import { checkWithdrawal, confirmWithdrawal } from "@/service/transactions";
import notifyPopup from "@/utils/toast";
import { useImperativeHandle, useState } from "react";

export default function useWithdrawal(ref: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const closeModal = () => {
    setOpen(false);
    setStep(0);
    setValue(0);
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => closeModal(),
    }),
    [],
  );

  const withdrawalValidation = async () => {
    try {
      const response = await checkWithdrawal(value);
      console.log("response", response);
      setStep(1);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const cashout = async (password: string) => {
    try {
      await confirmWithdrawal({
        cashout_type: "PIX",
        password,
        type: "WITHDRAWALS",
        value,
      });
      notifyPopup("Saque realizado com sucesso", "success");
      closeModal();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const previous = () => {
    setStep(step - 1);
  };

  return {
    closeModal,
    open,
    withdrawalValidation,
    step,
    value,
    setValue,
    previous,
    cashout,
  };
}

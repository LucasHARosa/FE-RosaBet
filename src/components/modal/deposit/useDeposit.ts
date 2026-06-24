"use client";

import { UserContext } from "@/contexts/UserContext";
import { DepositProps, DepositI } from "@/interfaces/deposit";
import { TransactionsI } from "@/interfaces/transactions";
import { deposit } from "@/service/deposit";
import { useContext, useImperativeHandle, useMemo, useState } from "react";

export default function useDeposit(ref: any, stepSelect: number) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DepositProps>({} as DepositProps);
  const [depositConfirmed, setDepositConfirmed] = useState<boolean>(false);
  const [dataReceveid, setDataReceveid] = useState<DepositI>({} as DepositI);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [allTransactions, setAllTransactions] = useState<TransactionsI[]>([]);
  const [step, setStep] = useState<number>(stepSelect);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setOpen(false);
    if(stepSelect){
      setStep(stepSelect);
    }
    setData({} as DepositProps);
    setDataReceveid({} as DepositI);
    setDepositConfirmed(false);
  };
  const { getUser } = useContext(UserContext);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => closeModal(),
    }),
    [allTransactions],
  );

  const isDepositConfirmed = useMemo(() => {
    if (!depositConfirmed) return false;
    return true;
  }, [depositConfirmed]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await deposit(data);
      setDataReceveid(response);
      console.log("response", response);
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    closeModal,
    handleSubmit,
    loading,
    step,
    setStep,
    getUser,
    setData,
    dataReceveid,
    isDepositConfirmed,
  };
}

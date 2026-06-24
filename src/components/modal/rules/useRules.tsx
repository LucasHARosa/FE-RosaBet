"use client";

import { useImperativeHandle, useState } from "react";
import { viewRule } from "@/service/rules";
import { RulesDetailI } from "@/interfaces/rules";

export default function useRules(ref: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<RulesDetailI>({} as RulesDetailI);

  const closeModal = () => {
    setOpen(false);
    setData({} as RulesDetailI);
  };

  const detailRule = async (id: string) => {
    setLoading(true);
    try {
      const response = await viewRule(id);
      setData(response);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: (id: string) => {
        detailRule(id);
        setOpen(true);
      },
      closeModal: () => {
        setOpen(false);
        setData({} as RulesDetailI);
      },
    }),
    [],
  );

  return { open, closeModal, loading, password, setPassword, data };
}

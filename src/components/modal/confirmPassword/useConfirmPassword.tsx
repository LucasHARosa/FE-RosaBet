"use client";

import { useImperativeHandle, useState, FormEvent } from "react";

export default function useConfirmPassword(ref: any, onSubmit: (password: string) => void) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState<string>("");

  const closeModal = () => {
    setOpen(false);
  };

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    await onSubmit(password);
    setOpen(false);
    setLoading(false);
    setPassword("");
  };

  return { open, closeModal, handleSubmit, loading, password, setPassword };
}

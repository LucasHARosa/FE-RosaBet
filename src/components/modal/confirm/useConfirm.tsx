"use client";

import { useImperativeHandle, useState } from "react";

export default function useConfirm(ref: any, onSubmit: () => void) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setOpen(false);
    setLoading(false);
  };

  return { open, closeModal, handleSubmit, loading };
}

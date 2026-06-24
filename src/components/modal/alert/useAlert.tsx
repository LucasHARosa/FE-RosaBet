"use client";
import { useImperativeHandle, useState } from "react";

export default function useAlert(ref: any) {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
    }),
    [],
  );

  return { open, closeModal };
}

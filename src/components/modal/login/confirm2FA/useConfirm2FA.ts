import { useImperativeHandle, useState } from "react";

export default function useConfirm2FA(ref: any, onSubmit: any) {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const sendCode = async (value: string) => {
    console.log("enviou isso", value);
    setOpen(false);
    await onSubmit(new Event("submit"), value);
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

  return { open, closeModal, sendCode };
}

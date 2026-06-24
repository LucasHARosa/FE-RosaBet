import { UserContext } from "@/contexts/UserContext";
import { useContext, useImperativeHandle, useState } from "react";

export default function useQRCode(ref: any) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string>("");
  const { getUser } = useContext(UserContext);

  const closeModal = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: (image: string) => {
        setImage(image);
        setOpen(true);
      },
      closeModal: () => setOpen(false),
    }),
    [],
  );

  return { open, closeModal, image, getUser };
}

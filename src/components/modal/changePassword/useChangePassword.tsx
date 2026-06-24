import { UserContext } from "@/contexts/UserContext";
import { handlePassword } from "@/service/client";
import notifyPopup from "@/utils/toast";
import { FormEvent, useContext, useEffect, useImperativeHandle, useState } from "react";
import { useTheme } from "styled-components";

export default function useChangePassword(ref: any) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [codeError, setCodeError] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme()

  const { logout } = useContext(UserContext);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        setOpen(true);
      },
      closeModal: () => {
        setOpen(false);
      },
    }),
    [],
  );

  const closeModal = () => {
    setOpen(false);
  };

  const validatePassword = () => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (newPassword.length < minLength) {
      setMessageError("A sua senha deve ter pelo menos 8 caracteres");
    } else if (!hasLetter) {
      setMessageError("A sua senha deve incluir uma letra");
    } else if (!hasNumber) {
      setMessageError("A sua senha deve incluir um número");
    } else if (!hasSymbol) {
      setMessageError("A sua senha deve incluir um símbolo");
    } else if (newPassword !== confirmPassword) {
      setMessageError("As senhas não correspondem");
    } else {
      setMessageError("");
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCodeError(undefined);
    setLoading(true);

    try {
      await handlePassword({ new: newPassword, old: currentPassword });
      notifyPopup("Senha alterada com sucesso", "success");
      logout();
      closeModal();
    } catch (err: any) {
      console.log(err);
      setCodeError(err.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!newPassword || !!confirmPassword) validatePassword();
    else setMessageError("");
  }, [newPassword, confirmPassword]);

  return {
    closeModal,
    open,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    validatePassword,
    messageError,
    onSubmit,
    codeError,
    loading,
    theme,
  };
}

import { UserContext } from "@/contexts/UserContext";
import { active2FA, disable2FA } from "@/service/client";
import { FormEvent, useContext, useImperativeHandle, useMemo, useRef, useState } from "react";

export default function useHandle2FA(ref: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeError, setCodeError] = useState();
  const [password, setPassword] = useState("");
  const { getUser, refreshUser } = useContext(UserContext);
  const modal2FA = useRef<any>();

  const closeModal = () => {
    setOpen(false);
    setPassword("");
    setCodeError(undefined);
  };

  const handle2FA = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCodeError(undefined);

    try {
      if (!is2FAEnabled) await disable2FA(password);
      else {
        const image = await active2FA(password);
        modal2FA.current?.openModal(image.qr_code);
      }
      refreshUser();
      closeModal();
    } catch (err: any) {
      console.log(err);
      setCodeError(err.code);
    } finally {
      setLoading(false);
    }
  };

  const is2FAEnabled = useMemo(() => {
    return !getUser.two_factor_auth?.app_2fa_enabled || false;
  }, [getUser.two_factor_auth?.app_2fa_enabled]);

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

  return {
    closeModal,
    open,
    is2FAEnabled,
    password,
    setPassword,
    handle2FA,
    loading,
    codeError,
    modal2FA,
  };
}

// context/UserContext.js
"use client";
import ModalLogin from "@/components/modal/login";
import ModalRecoverPassword from "@/components/modal/recoverPassword";
import ModalRegister from "@/components/modal/register";
import { UserI } from "@/interfaces/user";
import { me } from "@/service/auth";
import { notifications } from "@/service/notification";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { StorageContext } from "./StorageContext";

export interface UserContextType {
  getUser: UserI;
  handleUser: (data: UserI) => void;
  handleToken: (token: string) => void;
  refreshUser: () => void;
  isAuthenticaded: boolean;
  logout: () => void;
  loading: boolean;
  openLogin: () => void;
  openRegister: () => void;
  openRecoverPassword: () => void;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserI>({} as UserI);
  const modalLoginRef = useRef<any>();
  const modalRegisterRef = useRef<any>();
  const modalRecoverPassword = useRef<any>();
  const router = useRouter();
  const pathname = usePathname();

  const { getStorage, setStorage, removeStorage } = useContext(StorageContext);

  const handleUser = (data: UserI) => {
    setUser(data);
    if (data.token) handleToken(data.token);
    setStorage("user", JSON.stringify(data));
    verifyEmail(data);
  };

  const openLogin = () => {
    modalLoginRef.current?.openModal();
  };

  const openRegister = () => {
    modalRegisterRef.current?.openModal();
  };

  const openRecoverPassword = () => {
    modalRecoverPassword.current?.openModal();
  };

  const refreshUser = async () => {
    try {
      const response = await me();
      const messages = await notifications();
      handleUser({
        ...response,
        messagesUnread: Array.isArray(messages)
          ? messages.filter((i) => i.status === "UNREAD").length
          : 0,
      });
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (user: any) => {
    if (user && user.email_confirmation && !user.email_confirmation.is_confirmed) {
      openRegister();
    }
  };

  const handleToken = (token: string) => {
    setStorage("token", JSON.stringify(token));
  };

  const isAuthenticaded = useMemo(() => {
    return !!user.cpf;
  }, [user]);

  const getUser = useMemo(() => {
    return user;
  }, [user]);

  const logout = () => {
    setUser({} as UserI);
    removeStorage("user");
    removeStorage("token");
    router.push("/");
  };

  useEffect(() => {
    const storageUser = getStorage("user");
    if (storageUser) refreshUser();
    else setLoading(false);

    if(pathname === "/login") {
      openLogin();
      router.push("/");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUser,
        handleUser,
        handleToken,
        isAuthenticaded,
        logout,
        loading,
        refreshUser,
        openLogin,
        openRegister,
        openRecoverPassword,
      }}
    >
      {children}

      <ModalLogin ref={modalLoginRef} />
      <ModalRegister ref={modalRegisterRef} />
      <ModalRecoverPassword ref={modalRecoverPassword} />
    </UserContext.Provider>
  );
};

"use client";

import { useImperativeHandle, useState, useContext, useEffect } from "react";

import { UserContext } from "@/contexts/UserContext";
import { updateMe } from "@/service/auth";

export default function usePermission(ref: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    sms: false,
    email: false,
  });
  const { getUser } = useContext(UserContext);

  const closeModal = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    setNotification({
      sms: getUser.notification?.sms || false,
      email: getUser.notification?.email || false,
    });
  }, [getUser]);

  const handleSettings = async (newSettings: any) => {
    setLoading(true);
    setNotification(newSettings);

    try {
      await updateMe({ notification: newSettings });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { open, closeModal, loading, notification, handleSettings };
}

"use client";

import { MessageDetailsProps, MessagesProps } from "@/interfaces/messages";
import { deleteNotification } from "@/service/client";
import { notifications, openMessage } from "@/service/notification";
import { dateConverter } from "@/utils/data-converter";
import notifyPopup from "@/utils/toast";
import { useEffect, useRef, useState } from "react";

export default function useNotifications() {
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [messageDetail, setMessageDetail] = useState<MessageDetailsProps>(
    {} as MessageDetailsProps,
  );
  const modalAlertRef = useRef<any>();
  const modalPermissionRef = useRef<any>();

  const getAllNotifications = async () => {
    setLoading(true);

    try {
      const response = await notifications();
      setMessages(
        response.map((message: MessagesProps) => ({
          ...message,
          date: dateConverter(message.date),
        })),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openNotification = async (id: string) => {
    setMessages(
      messages.map((message) => {
        if (message._id === id) {
          return { ...message, status: "READ" };
        }

        return message;
      }),
    );

    modalAlertRef.current.openModal();

    try {
      const response = await openMessage(id);
      setMessageDetail(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openSettings = () => {
    modalPermissionRef.current.openModal();
  };

  const removeNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      notifyPopup("Mensagem deletada com sucesso", "success");
      setMessages(messages.filter((message) => message._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return {
    messages,
    openNotification,
    messageDetail,
    modalAlertRef,
    modalPermissionRef,
    openSettings,
    loading,
    removeNotification,
  };
}

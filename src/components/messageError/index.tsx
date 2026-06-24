import { IoMdAlert } from "react-icons/io";
import { AlertMessage, ErrorMessage } from "./styles";
import React from "react";
import { messagesErrors } from "./messageErro";
import { colorPicker } from "@/utils/colorPicker";

export default function MessageError({ code, type, message }: MessageErrorProps) {
  const typeColor: { [key in Type]: { color: string; bg: string } } = {
    ALERT: {
      color: colorPicker("brand.secondary.accent.textYellow"),
      bg: colorPicker("brand.secondary.accent.bgYellow"),
    },
    ERROR: {
      color: colorPicker("brand.primary.100"),
      bg: colorPicker("brand.secondary.24"),
    },
    SUCCESS: {
      color: colorPicker("brand.secondary.accent.green.100"),
      bg: colorPicker("brand.secondary.accent.green.8"),
    },
  };

  return (
    <>
      {type ? (
        <AlertMessage bg={typeColor[type].bg} color={typeColor[type].color}>
          <IoMdAlert size={18} color={typeColor[type].color} />
          {message || (code && messagesErrors[code] || "Error")}
        </AlertMessage>
      ) : (
        code && <ErrorMessage>{messagesErrors[code] || "Error"}</ErrorMessage>
      )}
    </>
  );
}

interface MessageErrorProps {
  code?: number;
  type?: Type;
  message?: string;
}

type Type = "ALERT" | "ERROR" | "SUCCESS";

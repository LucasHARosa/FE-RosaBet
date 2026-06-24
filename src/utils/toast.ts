import { Slide, toast } from "react-toastify";

const notifyPopup = (message: string, type: NotifyPopupType) => {
  (toast as any)[type as keyof typeof toast](message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};

type NotifyPopupType = "info" | "success" | "warning" | "error";

export default notifyPopup;

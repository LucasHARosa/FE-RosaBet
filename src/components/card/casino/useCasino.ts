import { UserContext } from "@/contexts/UserContext";
import { CasinoI } from "@/interfaces/casino";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function useCasino(game: CasinoI) {
  const [isDragging, setIsDragging] = useState(false);
  const { isAuthenticaded, openLogin } = useContext(UserContext);
  const router = useRouter();

  const handleDragStart = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (isDragging) return;

    if (!isAuthenticaded) {
      openLogin();
    } else {
      router.push(`/casino/area-game/${game.desktop_id}`);
    }
  };

  return { handleDragStart, handleDragEnd, handleClick };
}

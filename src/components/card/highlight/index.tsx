import { DataI } from "@/interfaces/highlights";
import { Box } from "./styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SportHighlight from "./components/sport";
import DefaultHighlight from "./components/default";
import { useWindow } from "@/hooks/window";

export default function CardHighlight({ highlight, settings, position }: CardHighlightProps) {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const { isMobile } = useWindow();

  const handleDragStart = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      if (highlight.type === "SPORT") router.push(`/game/${highlight.enet_code.split(":")[2]}`);
      else router.push(highlight.redirect_link || "");
    }
  };

  return (
    <Box
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
      isMobile={isMobile}
    >
      {highlight.type !== "SPORT" && (
        <DefaultHighlight highlight={highlight} settings={settings} position={position} />
      )}
      {highlight.type === "SPORT" && (
        <SportHighlight highlight={highlight} settings={settings} position={position} />
      )}
    </Box>
  );
}

interface CardHighlightProps {
  position: number;
  highlight: DataI;
  settings: {
    [key: string]: string[];
  };
}

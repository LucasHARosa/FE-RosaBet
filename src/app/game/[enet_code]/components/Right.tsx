import { useWindow } from "@/hooks/window";
import { Right } from "./styles";

export default function RightAside() {
  const { isMobile } = useWindow();

  return (
    <Right isMobile={isMobile}>
      <div id="sr-widget-1" className="sr-widget-1"></div>
    </Right>
  )
}
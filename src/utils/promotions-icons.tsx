import { FaGift } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { PiTennisBallFill } from "react-icons/pi";

export default function getIconPromotion(icon: string, size: number, color: string) {
  switch (icon) {
    case "target":
      return <FiTarget size={size} color={color} />;
    case "sport":
      return <PiTennisBallFill size={size} color={color} />;
    default:
      return <FaGift size={size} color={color} />;
  }
}

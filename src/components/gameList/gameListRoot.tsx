import { ReactNode } from "react";
import { Container } from "./styles";

interface GameListRootProps {
  children: ReactNode;
}

export default function GameListRoot({ children }: GameListRootProps) {
  return <Container>{children}</Container>;
}

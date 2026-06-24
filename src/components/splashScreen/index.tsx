import Image from "next/image";
import logoFull from "../../../public/logo.png";
import { Container } from "./styles";

export default function SplashScreen() {
  return (
    <Container>
      <Image src={logoFull} width={283} height={60} priority alt="logo" />
    </Container>
  );
}

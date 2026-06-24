import { Button } from "@/components/common/button";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GroupButton } from "./styles";

export default function NotAuthenticaded() {
  const { openLogin, openRegister } = useContext(UserContext);

  return (
    <GroupButton>
      <Button.Root onClick={openRegister} orientation="h" bg="brand.primary.100" p={14}>
        <Button.Text htmlTag="h1" font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
          Criar Conta
        </Button.Text>
        <Button.Icon icon={FaUser} size={16} color="text.absolute.whiteAbsolute.100" />
      </Button.Root>
      <Button.Root onClick={openLogin} orientation="h" bg="background.absolute.whiteAbsolute.8" p={14}>
        <Button.Text htmlTag="h1" font="label/button/m/bold" color="brand.secondary.100">
          Entrar
        </Button.Text>
        <Button.Icon icon={BsArrowRight} size={16} color="brand.secondary.100" />
      </Button.Root>
    </GroupButton>
  )
}
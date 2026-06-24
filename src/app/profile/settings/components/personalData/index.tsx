import Input from "@/components/common/input";
import { Content, GroupButton, InfoPerson } from "../../styles";
import { dateConverter } from "@/utils/data-converter";
import { Button } from "@/components/common/button";
import { BiKey } from "react-icons/bi";
import { MdLockPerson } from "react-icons/md";
import { useContext, useRef } from "react";
import ModalHandle2FA from "@/components/modal/handle2FA";
import ModalChangePassword from "@/components/modal/changePassword";
import { UserContext } from "@/contexts/UserContext";

export default function PersonalData() {
  const modalRef2FA = useRef<any>();
  const modalRefChangePassword = useRef<any>();
  const { getUser } = useContext(UserContext);

  const open2FA = () => {
    modalRef2FA.current.openModal();
  };

  const openChangePassword = () => {
    modalRefChangePassword.current.openModal();
  };

  return (
    <Content>
      <InfoPerson>
        <Input name="name" placeholder="NOME COMPLETO" value={getUser.name} disabled />
        <Input
          name="birthdate"
          placeholder="DATA DE NASCIMENTO"
          value={dateConverter(getUser.birth_date)}
          maskType="BIRTHDATE"
          disabled
        />
        <Input name="cpf" placeholder="CPF" value={getUser.cpf} maskType="CPF" disabled />
        <Input name="email" placeholder="EMAIL" value={getUser.email} disabled />
        <Input name="phone" placeholder="TELEFONE" value={getUser.phone} disabled />
      </InfoPerson>

      <GroupButton>
        <Button.Root
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          w="full"
          justifycontent="center"
          onClick={openChangePassword}
        >
          <Button.Text color="brand.secondary.accent.textYellow" font="label/button/m/bold">
            Alterar senha
          </Button.Text>
          <Button.Icon icon={BiKey} color="brand.secondary.accent.textYellow" size={16} />
        </Button.Root>
        <Button.Root
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          w="full"
          justifycontent="center"
          onClick={open2FA}
        >
          <Button.Text color="brand.secondary.accent.textYellow" font="label/button/m/bold">
            {!getUser.two_factor_auth?.app_2fa_enabled ? "Habilitar" : "Desativar"} 2FA
          </Button.Text>
          <Button.Icon icon={MdLockPerson} color="brand.secondary.accent.textYellow" size={16} />
        </Button.Root>
      </GroupButton>

      <ModalHandle2FA ref={modalRef2FA} />
      <ModalChangePassword ref={modalRefChangePassword} />
    </Content>
  );
}

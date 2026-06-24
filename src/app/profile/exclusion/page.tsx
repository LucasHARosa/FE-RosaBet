"use client";
import { useState, useRef, useContext } from "react";
import { Box, Content, Header } from "./styles";
import { UserContext } from "@/contexts/UserContext";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import { FaLock } from "react-icons/fa6";
import ModalConfirmPassword from "../../../components/modal/confirmPassword";
import { exclusionAccount } from "@/service/auth";
import MessageError from "@/components/messageError";

export default function Exclusion() {
  const [loading, setLoading] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<number | undefined>();
  const { logout } = useContext(UserContext);
  const refModalPassword = useRef<any>();

  const openModal = () => refModalPassword.current.openModal();

  const submit = async (password: string) => {
    setCodeError(undefined);

    setLoading(true);
    try {
      await exclusionAccount({ password });
      logout();
    } catch (err: any) {
      setCodeError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          Exclusão de Conta
        </Text>
      </Header>
      <Content>
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
          Solicite a exclusão permanente da sua conta. Ao optar por excluir sua conta, todos os seus
          dados e histórico de apostas serão removidos de forma irreversível. Certifique-se de sacar
          qualquer saldo restante antes de prosseguir com a exclusão.
        </Text>

        <MessageError code={codeError} />

        <Button.Root
          w="full"
          bg={loading ? "text.dynamic.whiteDynamic.40" : "brand.primary.100"}
          orientation="h"
          justifycontent="center"
          disabled={loading}
          onClick={openModal}
        >
          {loading ? (
            <Button.Text htmlTag="h2" font="label/button/m/bold">
              Carregando...
            </Button.Text>
          ) : (
            <>
              <Button.Text htmlTag="h2" font="label/button/m/bold">
                Realizar Exclusão de conta
              </Button.Text>
              <Button.Icon icon={FaLock} size={14} />
            </>
          )}
        </Button.Root>
      </Content>

      <ModalConfirmPassword ref={refModalPassword} onSubmit={() => submit} />
    </Box>
  );
}

"use client";
import { useState, useRef, useContext } from "react";
import { Box, Content, Header } from "./styles";
import { UserContext } from "@/contexts/UserContext";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import { FaLock } from "react-icons/fa6";
import Select from "../../../components/common/select";
import ModalConfirmPassword from "../../../components/modal/confirmPassword";
import { breakPeriod } from "@/service/auth";
import MessageError from "@/components/messageError";
import { dateAndHourConverter } from "../../../utils/data-converter";

type BreakPeriodTypes = "24_HOURS" | "48_HOURS" | "7_DAYS" | "30_DAYS";

export default function Break() {
  const [period, setPeriod] = useState<BreakPeriodTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<number | undefined>();
  const { getUser, refreshUser } = useContext(UserContext);
  const refModalPassword = useRef<any>();

  const openModal = () => refModalPassword.current.openModal();

  const submit = async (password: string) => {
    setCodeError(undefined);

    setLoading(true);
    try {
      await breakPeriod({ password, period });
      refreshUser();
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
          Período de Pausa
        </Text>
      </Header>
      <Content>
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
          Configure um período de pausa para restringir temporariamente o acesso à sua conta de
          apostas. Durante este período, você não poderá fazer novas apostas ou depósitos. Esta é
          uma ferramenta útil para ajudar a gerenciar seu tempo e comportamento de apostas de forma
          saudável.
        </Text>

        <MessageError code={codeError} />
        {getUser.break_period?.start_date && (
          <MessageError
            type="ALERT"
            message={`Sua conta está no período de pausa entre ${dateAndHourConverter(getUser.break_period.start_date)} até ${dateAndHourConverter(getUser.break_period?.end_date)}`}
          />
        )}

        <Select
          options={[
            { label: "24 Horas", value: "24_HOURS" },
            { label: "48 Horas", value: "48_HOURS" },
            { label: "7 Dias", value: "7_DAYS" },
            { label: "30 Dias", value: "30_DAYS" },
          ]}
          onChange={(value) => setPeriod(value as BreakPeriodTypes)}
          disabled={loading}
        />

        <Button.Root
          w="full"
          bg={!period ? "text.dynamic.whiteDynamic.40" : "brand.primary.100"}
          orientation="h"
          justifycontent="center"
          disabled={!period || loading}
          onClick={openModal}
          p={16}
        >
          {loading ? (
            <Button.Text htmlTag="h2" font="label/button/m/bold">
              Carregando...
            </Button.Text>
          ) : (
            <>
              <Button.Text htmlTag="h2" font="label/button/m/bold">
                Requisitar Período de Pausa
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

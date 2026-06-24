import { TransactionsI } from "@/interfaces/transactions";
import TrayDown from "@/assets/tray-down.svg";
import TrayUp from "@/assets/tray-up.svg";
import Image from "next/image";
import { BoxImage, Card, Info, Pendent, Top } from "./styles";
import { useEffect, useMemo, useRef, useState } from "react";
import Text from "@/components/common/text";
import { GoClock } from "react-icons/go";
import ModalAlert from "@/components/modal/alert";
import ModalDeposit from "@/components/modal/deposit";
import { DepositI } from "@/interfaces/deposit";
import { Button } from "@/components/common/button";
import { PiQrCodeFill } from "react-icons/pi";


export default function CardTransaction({ data }: CardTransactionProps) {
  const [transaction, setTransaction] = useState<TransactionsI>(data);
  const [depositPending, setDepositPending] = useState<DepositI>({} as DepositI);
  const modalRefDeposit = useRef<any>();
  const modalConfirmAlertRef = useRef<any>(null);
  const isWithdrawal = useMemo(() => data.type === "PIX", [data]);
  
  const typeData = useMemo(() => {
    switch (data.status) {
      case "PAID":
        return {
          title: "Pago",
          icon: TrayDown,
          color: "brand.secondary.accent.green.100",
          bg: "brand.secondary.accent.green.8",
        };
      case "PROCESSING":
        return {
          title: "Processando",
          icon: TrayUp,
          color: "text.dynamic.whiteDynamic.100",
          bg: "background.dynamic.whiteDynamic.8",
        };
      case "PENDING":
        return {
          title: "Pendente",
          icon: TrayUp,
          color: "brand.secondary.accent.textYellow",
          bg: "brand.secondary.accent.bgYellow",
        };
      case "REFUSED":
        return {
          title: "Recusado",
          icon: TrayUp,
          color: "brand.primary.100",
          bg: "brand.secondary.24",
        };
      default:
        return {
          title: "Recusado",
          icon: TrayUp,
          color: "brand.primary.100",
          bg: "brand.secondary.24",
        };
    }
  }, [data.status]);

  useEffect(() => {
    if (transaction.status === "PENDING") {
      setDepositPending({
        id: transaction._id,
        company: transaction.company,
        credits_type: transaction.type,
        expiration_date: transaction.expiration_date,
        qr_code: transaction.qr_code,
        qr_code_image: transaction.qr_code_image,
        value: transaction.value,
      });
    }
  }, [data]);

  useEffect(() => {
    if (
      transaction.status === "PENDING" &&
      data.status === "PAID" &&
      data._id === transaction._id
    ) {
      modalConfirmAlertRef.current.openModal();
    }
    setTransaction(data);
  }, [data]);

  return (
    <Card>
      <BoxImage isWithdrawal={isWithdrawal}>
        <Image src={isWithdrawal ? TrayDown : TrayUp} alt="transaction" width={24} height={19} />
      </BoxImage>

      <Info>
        <Top>
          <Text htmlTag="strong" font="paragraph/m/bold">
            {isWithdrawal ? "Valor Depositado" : "Valor Sacado"}
          </Text>
          <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
            {transaction.type}
          </Text>
        </Top>
        <Text htmlTag="strong" font="label/body/s/bold">
          R$ {transaction.value.toFixed(2)}
        </Text>
      </Info>


      {data.status !== "PAID" && (
        <Pendent bg={typeData.bg} color={typeData.color}>
          <GoClock />
          <Text htmlTag="small" font="label/body/s/regular">
            {typeData.title}
          </Text>
        </Pendent>
      )}
      {data.status === "PENDING" &&
        <Button.Root onClick={() => modalRefDeposit.current.openModal()} bg="brand.secondary.accent.bgYellow" orientation="h" p={8} gaph={8} >
          <Button.Icon icon={PiQrCodeFill} size={14} color="brand.secondary.accent.textYellow" />
          <Button.Text font="label/body/xs/semiBold" htmlTag="small" color="brand.secondary.accent.textYellow">
            Ver QrCode
          </Button.Text>
        </Button.Root>
      }
      <ModalDeposit ref={modalRefDeposit} stepSelect={2} infoQRCode={depositPending}  />
      <ModalAlert
        ref={modalConfirmAlertRef}
        title="Depósito Confirmado"
        message={`Depósito de R$ ${transaction.value} confirmado com sucesso!`}
        type="success"
      />
    </Card>
  );
}

interface CardTransactionProps {
  data: TransactionsI;
}

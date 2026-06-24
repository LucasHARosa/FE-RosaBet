"use client";
import Text from "@/components/common/text";
import {
  Amount,
  Body,
  Box,
  BoxCurrency,
  Group,
  GroupButton,
  GroupDate,
  Header,
  List,
  Money,
  Options,
} from "./styles";
import { Button } from "@/components/common/button";
import { BiSupport } from "react-icons/bi";
import { FaPix } from "react-icons/fa6";
import Image from "next/image";
import Brazil from "@/assets/brazil.svg";
import useTransactions from "./useTransactions";
import CardTransaction from "@/components/card/transaction";
import ModalWithdrawal from "@/components/modal/withdrawal";
import ModalDeposit from "@/components/modal/deposit";
import ModalCalendar from "@/components/modal/calendar";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiInboxArrowDown, HiInbox } from "react-icons/hi2";
import { PiBoxArrowUpFill } from "react-icons/pi";

export default function Transactions() {
  const {
    getUser,
    filterType,
    filterTransactions,
    transactionsFiltered,
    modalRefWithdrawal,
    modalRefDeposit,
    modalRefCalendar,
    selectionRange,
    setSelectionRange,
  } = useTransactions();

  // const canUseDOM = () => {
  //   if (
  //     typeof window === "undefined" ||
  //     !window.document ||
  //     !window.document.createElement
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  // const openChat = () => {
  //   if (canUseDOM() && window.zE) {
  //     window.zE('webWidget', 'open');
  //   } else {
  //     console.warn("Zendesk is not initialized yet");
  //   }
  // };

  return (
    <Box>
      <Header>
        <Group>
          <Text htmlTag="h1" font="heading/m/bold">
            Depósito e Saque
          </Text>
          <Button.Root bg="background.dynamic.whiteDynamic.8" justifycontent="center">
            <Button.Icon icon={BiSupport} size={18} />
          </Button.Root>
        </Group>
        <BoxCurrency>
          <Money>
            <Image src={Brazil} alt="country" width={24} height={24} />
            <Amount>
              <Text font="heading/m/bold">R$ {getUser.credits?.toFixed(2)}</Text>
              {getUser.sports_bonus > 0 && (
                <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                  + R$ {getUser.sports_bonus} de bônus
                </Text>
              )}
            </Amount>
          </Money>
          <Options>
            <Button.Root
              onClick={() => modalRefDeposit.current?.openModal()}
              bg="brand.secondary.accent.bgYellow"
              justifycontent="center"
              orientation="h"
              w="full"
            >
              <Button.Text font="label/button/m/bold" htmlTag="small" color="brand.secondary.accent.textYellow">
                DEPOSITAR
              </Button.Text>
              <Button.Icon icon={FaPix} size={24} color="brand.secondary.accent.textYellow" />
            </Button.Root>
            <Button.Root
              onClick={() => modalRefWithdrawal.current?.openModal()}
              bg="brand.secondary.accent.bgYellow"
              justifycontent="center"
              orientation="h"
              w="full"
            >
              <Button.Text font="label/button/m/bold" htmlTag="small" color="brand.secondary.accent.textYellow">
                SACAR
              </Button.Text>
              <Button.Icon icon={PiBoxArrowUpFill} size={24} color="brand.secondary.accent.textYellow" />
            </Button.Root>
          </Options>
        </BoxCurrency>
      </Header>

      <Body>
        <GroupButton>
          <Text htmlTag="small" font="label/body/s/semiBold" color="text.dynamic.whiteDynamic.64">
            Filtrar por:
          </Text>
          <Button.Root
            onClick={() => modalRefCalendar.current.openModal()}
            bg="background.dynamic.whiteDynamic.4"
            orientation="h"
          >
            <Button.Text htmlTag="small" font="label/body/xs/regular">
              {selectionRange.startDate?.toLocaleDateString()} -{" "}
              {selectionRange.endDate?.toLocaleDateString()}
            </Button.Text>
            <Button.Icon icon={MdOutlineKeyboardArrowDown} size={18} />
          </Button.Root>
          <Button.Root
            onClick={() => filterTransactions("withdrawals")}
            bg="background.dynamic.whiteDynamic.4"
            orientation="h"
          >
            <Button.Icon icon={HiInbox} size={24} color={filterType === "withdrawals" ? "brand.secondary.100" : "text.dynamic.whiteDynamic.64"} />

            <Button.Text
              htmlTag="small"
              font="label/body/xs/regular"
              color={filterType === "withdrawals" ? "brand.secondary.100"  : "text.dynamic.whiteDynamic.64"}
            >
              SAQUE
            </Button.Text>
          </Button.Root>
          <Button.Root
            onClick={() => filterTransactions("pix")}
            bg="background.dynamic.whiteDynamic.4"
            orientation="h"
          >
            <Button.Icon icon={HiInboxArrowDown} size={24} color={filterType === "pix" ? "brand.secondary.100" : "text.dynamic.whiteDynamic.64"} />
            <Button.Text
              htmlTag="small"
              font="label/body/xs/regular"
              color={filterType === "pix" ? "brand.secondary.100" : "text.dynamic.whiteDynamic.64"}
            >
              DEPÓSITO
            </Button.Text>
          </Button.Root>
        </GroupButton>

        <List>
          {Object.entries(transactionsFiltered).map(([key, value], index) => (
            <GroupDate key={`date-${index}`}>
              <Text font="label/body/m/semiBold" color="text.dynamic.whiteDynamic.64">
                {key}
              </Text>
              {value.map((transaction, index) => (
                <CardTransaction key={`value-${index}`} data={transaction} />
              ))}
            </GroupDate>
          ))}
        </List>
      </Body>

      <ModalDeposit ref={modalRefDeposit} />
      <ModalWithdrawal ref={modalRefWithdrawal} />
      <ModalCalendar
        ref={modalRefCalendar}
        ranges={selectionRange}
        handleSelect={setSelectionRange}
      />
    </Box>
  );
}

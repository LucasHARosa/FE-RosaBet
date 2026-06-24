"use client";
import { CuponsContext } from "@/contexts/CuponsContext";
import { UserContext } from "@/contexts/UserContext";
import { useWindow } from "@/hooks/window";
import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";

export default function useModalCupom() {
  const { cupons, changeValueCupom, onSubmit, valueDisplay, clearCupons } = useContext(CuponsContext);
  const { isMobile } = useWindow();
  const modalErrRef = useRef<any>();
  const modalSuccessRef = useRef<any>();

  const { isAuthenticaded, getUser, openLogin } = useContext(UserContext);
  const [viewSelectOption, setViewSelectOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>();
  const [acceptAllOdds, setAcceptAllOdds] = useState(false);

  const numericValue = parseFloat(valueDisplay.replace(/\./g, "").replace(",", "."));

  const empty = _.isEmpty(cupons);
  const possibleValues = [5, 10, 20];

  const handleChangeAcceptAllOdds = () => {
    setAcceptAllOdds(!acceptAllOdds);
  };

  const oddMultiple = _.reduce(
    cupons,
    (acc, sport) => {
      const odd = _.get(sport, "market.odd");
      const available = _.get(sport, "available");
      if (available === false || !available) {
        return acc;
      }
      return acc * odd;
    },
    1,
  );

  const numberEvents = _.reduce(
    cupons,
    (acc, sport) => {
      const available = _.get(sport, "available");
      if (available === false || !available) {
        return acc;
      }
      return acc + 1;
    },
    0,
  );

  const toggleOpen = () => setOpen(!open);

  const changeValue = (value: string) => {
    if (value === "") {
      changeValueCupom("0");
      return;
    }
    const valueNumber = value.replace(/\D/g, "");
    const cents = valueNumber.length > 2 ? valueNumber.slice(-2) : valueNumber.padStart(2, "0");
    const units = valueNumber.slice(0, -2) || "0";
    const formattedValue = `${parseInt(units, 10).toLocaleString("pt-BR")},${cents}`;
    changeValueCupom(formattedValue);
  };

  const addValue = (value: number) => {
    let numericValue = parseFloat(valueDisplay.replace(/\./g, "").replace(",", "."));
    numericValue += value;
    const newValue = numericValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    changeValueCupom(newValue);
  };

  const possibleReturn = () => {
    if (empty || !numericValue) {
      return 0;
    }
    return (numericValue * oddMultiple).toFixed(2);
  };

  const buttonDisabled = () => {
    if (
      !numericValue ||
      empty ||
      numberEvents === 0
    ) {
      return true;
    }
    return false;
  };

  const submitCoupon = async () => {
    if (empty || !numericValue || !isAuthenticaded) {
      setOpen(false);
      openLogin();
      return;
    }

    setLoading(true);
    setCodeError(undefined);
    try {
      await onSubmit(getUser?.name,acceptAllOdds);
      modalSuccessRef.current.openModal();
    } catch (error: any) {
      if (error.message === "INSUFFICIENT_CREDIT_TO_BET") {
        modalErrRef.current.openModal();
        setOpen(false);
      }
      else{
        setCodeError(error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  // const userLogged = () => {
  //   if (isAuthenticaded) {
  //     return true;
  //   }
  //   return false;
  // };

  useEffect(() => {
    if (cupons.length === 0 && codeError){
      setCodeError(undefined);
    }
  }, [cupons]);
  return {
    cupons,
    open,
    empty,
    oddMultiple,
    numberEvents,
    toggleOpen,
    changeValue,
    possibleReturn,
    possibleValues,
    addValue,
    isAuthenticaded,
    submitCoupon,
    buttonDisabled,
    modalSuccessRef,
    loading,
    valueDisplay,
    isMobile,
    modalErrRef,
    codeError,
    viewSelectOption,
    setViewSelectOption,
    clearCupons,
    handleChangeAcceptAllOdds,
    acceptAllOdds
  };
}

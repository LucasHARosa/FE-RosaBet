/* eslint-disable react/display-name */
"use client";
import { forwardRef } from "react";
import Modal from "..";
import StepOne from "./components/stepOne";
import StepTwo from "./components/stepTwo";
import StepThree from "./components/stepThree";
import useDeposit from "./useDeposit";
import { DepositI } from "@/interfaces/deposit";

const ModalDeposit = forwardRef(({infoQRCode,stepSelect=0}:ModalDepositProps, ref) => {
  const { closeModal, open, handleSubmit, step, setStep, getUser, setData, dataReceveid } =
    useDeposit(ref, stepSelect);
  return (
    <Modal title={"Novo Depósito"} onCancel={closeModal} visible={open}>
      {step === 0 && <StepOne handlePage={setStep} user={getUser} handleData={setData} />}
      {step === 1 && <StepTwo handlePage={setStep} handleSubmit={handleSubmit} handleData={setData} />}
      {step === 2 && <StepThree closeModal={closeModal} infoQRCode={infoQRCode?infoQRCode:dataReceveid} />}
    </Modal>
  );
});

interface ModalDepositProps {
  infoQRCode?: DepositI;
  stepSelect?: number;
}

export default ModalDeposit;

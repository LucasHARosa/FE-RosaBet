/* eslint-disable react/display-name */
"use client";
import { forwardRef } from "react";
import Modal from "..";
import StepOne from "./components/stepOne";
import StepTwo from "./components/stepTwo";
import useWithdrawal from "./useWithdrawal";

const ModalWithdrawal = forwardRef((_, ref) => {
  const { closeModal, open, withdrawalValidation, step, value, setValue, previous, cashout } =
    useWithdrawal(ref);

  return (
    <Modal title={"Novo Saque"} onCancel={closeModal} visible={open}>
      {step === 0 && (
        <StepOne withdrawalValidation={withdrawalValidation} value={value} handleValue={setValue} />
      )}
      {step === 1 && <StepTwo previous={previous} value={value} onConfirm={cashout} />}
    </Modal>
  );
});

export default ModalWithdrawal;

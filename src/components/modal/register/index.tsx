import { forwardRef } from "react";
import Modal from "..";
import FirstStep from "./components/firstStep";
import FourthStep from "./components/fourthStep";
import SecondStep from "./components/secondStep";
import ThreeStep from "./components/threeStep";
import useRegister from "./useRegister";

const ModalRegister = forwardRef((props, ref) => {
  const {
    closeModal,
    open,
    step,
    nextStep,
    previousStep,
    dataRegister,
    setDataRegister,
    isHandleClose,
  } = useRegister(ref);

  return (
    <Modal
      minHeight={640}
      title="Crie sua conta"
      onCancel={closeModal}
      visible={open}
      isHandleClose={isHandleClose}
    >
      {step === 0 && (
        <FirstStep nextStep={nextStep} data={dataRegister} handleData={setDataRegister} />
      )}
      {step === 1 && (
        <SecondStep
          nextStep={nextStep}
          previousStep={previousStep}
          data={dataRegister}
          handleData={setDataRegister}
        />
      )}
      {step === 2 && <ThreeStep nextStep={nextStep} data={dataRegister} closeModal={closeModal} />}
      {step === 3 && <FourthStep previousStep={previousStep} handleData={setDataRegister} />}
    </Modal>
  );
});

ModalRegister.displayName = "ModalRegister";

export default ModalRegister;

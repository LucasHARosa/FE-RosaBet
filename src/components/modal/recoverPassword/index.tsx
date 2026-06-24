import { forwardRef } from "react";
import Modal from "..";
import useRecoverPassword from "./useRecoverPassword";
import FirstStep from "./components/firstStep";
import SecondStep from "./components/secondStep";
import ThirdStep from "./components/thirdStep";
import ModalAlert from "../alert";

const ModalRecoverPassword = forwardRef((props, ref) => {
  const {
    open,
    closeModal,
    step,
    modalSuccessRef,
    handleThirdStep,
    handleHasCode,
    handleOpenRecover,
    document,
    setDocument,
    handleSubmitDocument,
    loadingDocument,
    codeErrorDocument,
    recover,
    handleSucess,
  } = useRecoverPassword(ref);

  return (
    <>
      <Modal minHeight={600} title="Recupere sua senha" onCancel={closeModal} visible={open}>
        {step === 0 && (
          <FirstStep
            document={document}
            setDocument={setDocument}
            handleSubmitDocument={handleSubmitDocument}
            loadingDocument={loadingDocument}
            codeErrorDocument={codeErrorDocument}
            handleHasCode={handleHasCode}
          />
        )}
        {step === 1 && (
          <SecondStep
            recover={recover}
            nextStep={handleThirdStep}
            handleOpenRecover={handleOpenRecover}
          />
        )}
        {step === 2 && (
          <ThirdStep
            recover={recover}
            document={document}
            handleSubmitDocument={handleSubmitDocument}
            handleSucess={handleSucess}
          />
        )}
      </Modal>
      <ModalAlert
        ref={modalSuccessRef}
        title="Senha alterada com sucesso!"
        message="Sua senha foi alterada com sucesso!, faça login para continuar."
        type="success"
      />
    </>
  );
});

ModalRecoverPassword.displayName = "ModalRecoverPassword";
export default ModalRecoverPassword;

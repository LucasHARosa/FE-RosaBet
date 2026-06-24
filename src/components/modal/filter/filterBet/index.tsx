import { forwardRef } from "react";
import Modal from "../..";
import useFilterBet from "./useFilterBet";
import DateFilter from "./components/date";
import ResultSwitch from "./components/switch";
import { GroupButton, GroupFilters } from "./styles";
import { Button } from "@/components/common/button";

const ModalFilterBet = forwardRef(({ onSubmit }: any, ref) => {
  const {
    open,
    closeModal,
    rangeStatus,
    rangeResult,
    rangeState,
    modalRefCalendar,
    selectionRange,
    setSelectionRange,
    filter,
    clearFilter,
    handleSubmit,
  } = useFilterBet(ref, onSubmit);

  return (
    <Modal title="Filtrar por" onCancel={closeModal} visible={open}>
      <GroupFilters>
        <ResultSwitch
          title={"status"}
          switchFilter={rangeState}
          defaultChecked={filter.filter((i) => i.rangeType === "state")[0]?.value}
        />
        <ResultSwitch
          title={"aposta"}
          switchFilter={rangeStatus}
          defaultChecked={filter.filter((i) => i.rangeType === "status")[0]?.value}
        />
        <ResultSwitch
          title={"resultado"}
          switchFilter={rangeResult}
          defaultChecked={filter.filter((i) => i.rangeType === "result")[0]?.value}
        />
        <DateFilter
          modalRefCalendar={modalRefCalendar}
          ranges={selectionRange}
          handleSelect={setSelectionRange}
        />
      </GroupFilters>

      {/* {JSON.stringify(filter)} */}
      <GroupButton>
        <Button.Root bg="background.dynamic.whiteDynamic.8" onClick={clearFilter}>
          <Button.Text htmlTag="h2" font="label/button/m/bold">
            Limpar
          </Button.Text>
        </Button.Root>
        <Button.Root bg="brand.primary.100" w="full" onClick={handleSubmit}>
          <Button.Text htmlTag="h2" font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
            Aplicar Filtros
          </Button.Text>
        </Button.Root>
      </GroupButton>
    </Modal>
  );
});

ModalFilterBet.displayName = "ModalFilterBet";
export default ModalFilterBet;

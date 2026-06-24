import { forwardRef } from "react";
import Modal from "..";
import useCalendar from "./useModalCalendar";
import { DataContainer, Container, StyledDateRangePicker, GroupButton } from "./styles";

import { Button } from "@/components/common/button";
import { Range } from "react-date-range";

interface ModalCalendarProps {
  ranges: Range;
  handleSelect: (ranges: Range) => void;
}

const ModalCalendar = forwardRef(({ ranges, handleSelect }: ModalCalendarProps, ref) => {
  const { open, selectionRange, setSelectionRange, onSubmit, close, clearPickup } = useCalendar(
    ref,
    ranges,
    handleSelect,
  );

  return (
    <Modal title="Escolha as datas" onCancel={close} visible={open} minHeight={550} >
      <Container>
        <DataContainer>
          <StyledDateRangePicker
            ranges={[selectionRange]}
            onChange={(e) => setSelectionRange(e.selection)}
            dateDisplayFormat="dd/MM/yyyy"
            maxDate={new Date('2099-12-31')}
            // locale={ptBR}
          />
        </DataContainer>

        <GroupButton>
          <Button.Root onClick={clearPickup} bg="background.absolute.whiteAbsolute.4" border>
            <Button.Text htmlTag="h2" font="label/button/m/bold">
              Limpar
            </Button.Text>
          </Button.Root>

          <Button.Root onClick={onSubmit} bg="brand.primary.100" w="full">
            <Button.Text htmlTag="h2" font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
              Confirmar
            </Button.Text>
          </Button.Root>
        </GroupButton>
      </Container>
    </Modal>
  );
});

ModalCalendar.displayName = "ModalCalendar";
export default ModalCalendar;

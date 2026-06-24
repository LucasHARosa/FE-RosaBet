import Text from "@/components/common/text";
import { ContainerLabel } from "./styles";
import useCalendar, { CalendarProps } from "./useCalendar";
import ModalCalendar from "../modal/calendar";

export default function Calendar({ handleSetDate, ranges }: CalendarProps) {
  const { startDateFormated, endDateFormated, modalCalendar, handleOpenModal } = useCalendar({
    handleSetDate,
    ranges,
  });
  return (
    <>
      <ContainerLabel onClick={handleOpenModal}>
        {startDateFormated && endDateFormated ? (
          <>
            <Text htmlTag="h1" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
              Data
            </Text>
            <Text htmlTag="h1" font="label/body/m/regular" >
              {startDateFormated} até {endDateFormated}
            </Text>
          </>
        ) : (
          <Text htmlTag="h1" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
            Selecione a data
          </Text>
        )}
      </ContainerLabel>
      <ModalCalendar ranges={ranges} handleSelect={handleSetDate} ref={modalCalendar} />
    </>
  );
}

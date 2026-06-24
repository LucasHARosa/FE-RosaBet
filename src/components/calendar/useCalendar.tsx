import { useRef } from "react";
import { Range } from "react-date-range";

export interface CalendarProps {
  handleSetDate: (range: Range) => void;
  ranges: Range;
}

export default function useCalendar({ ranges }: CalendarProps) {
  const modalCalendar = useRef<any>();
  const startDateFormated = ranges.startDate?.toLocaleDateString("pt-BR");
  const endDateFormated = ranges.endDate?.toLocaleDateString("pt-BR");

  const handleOpenModal = () => {
    modalCalendar.current.openModal();
  };

  return {
    modalCalendar,
    startDateFormated,
    endDateFormated,
    handleOpenModal,
  };
}

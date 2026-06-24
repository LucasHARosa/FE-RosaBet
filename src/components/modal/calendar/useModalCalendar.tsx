import { useEffect, useImperativeHandle, useState } from "react";
import { Range } from "react-date-range";

export default function useModalCalendar(
  ref: any,
  ranges: Range,
  handleSelect: (ranges: Range) => void,
) {
  const rangeDefault = {
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  };

  const [open, setOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range>(rangeDefault);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => close(),
    }),
    [],
  );

  const onSubmit = () => {
    handleSelect(selectionRange);
    close();
  };

  const close = () => {
    setSelectionRange(rangeDefault);
    setOpen(false);
  };

  const clearPickup = () => {
    setSelectionRange(rangeDefault);
  };

  useEffect(() => {
    if (ranges.startDate !== undefined) {
      setSelectionRange(ranges);
    } else {
      setSelectionRange(rangeDefault);
    }
  }, [open]);

  return {
    open,
    selectionRange,
    setSelectionRange,
    onSubmit,
    close,
    clearPickup,
  };
}

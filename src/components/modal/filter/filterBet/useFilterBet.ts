import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Range } from "react-date-range";

export default function useFilterBet(ref: any, onSubmit: any) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterProps[]>([]);
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const modalRefCalendar = useRef<any>();

  const parseDate = (dateString?: string) => {
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  useImperativeHandle(
    ref,
    () => ({
      openModal: (filterDefault: FilterProps[]) => {
        setFilter(filterDefault);
        const initialDate = filterDefault.find((filter) => filter.rangeType === "startDate")?.value;
        const finalDate = filterDefault.find((filter) => filter.rangeType === "endDate")?.value;
        setSelectionRange({
          startDate: parseDate(initialDate),
          endDate: parseDate(finalDate),
          key: "selection",
        });
        setOpen(true);
      },
      closeModal: () => setOpen(false),
    }),
    [],
  );

  const handleFilter = (rangeType: string, value: string) => {
    setFilter((prevFilters) => {
      const existingIndex = prevFilters.findIndex((filter) => filter.rangeType === rangeType);
      if (existingIndex !== -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingIndex] = { rangeType, value };
        return updatedFilters;
      } else {
        return [...prevFilters, { rangeType, value }];
      }
    });
  };

  const removeFilter = (rangeType: string) => {
    setFilter((prevFilters) => prevFilters.filter((filter) => filter.rangeType !== rangeType));
  };

  const rangeStatus: SwitchFilterI[] = [
    { id: 0, name: "Todos", value: "all", onClick: () => removeFilter("status") },
    { id: 1, name: "Em Aberto", value: "active", onClick: () => handleFilter("status", "active") },
    { id: 2, name: "Finalizada", value: "finish", onClick: () => handleFilter("status", "finish") },
  ];

  const rangeResult: SwitchFilterI[] = [
    { id: 0, name: "Todos", value: "all", onClick: () => removeFilter("result") },
    {
      id: 1,
      name: "Positivo",
      value: "positive",
      onClick: () => handleFilter("result", "positive"),
    },
    { id: 2, name: "Neutro", value: "neutral", onClick: () => handleFilter("result", "neutral") },
    {
      id: 3,
      name: "Negativo",
      value: "negative",
      onClick: () => handleFilter("result", "negative"),
    },
  ];

  const rangeState: SwitchFilterI[] = [
    { id: 0, name: "Todos", value: "all", onClick: () => removeFilter("state") },
    { id: 1, name: "Ao vivo", value: "live", onClick: () => handleFilter("state", "live") },
    {
      id: 2,
      name: "Encerrado",
      value: "prematch",
      onClick: () => handleFilter("state", "prematch"),
    },
  ];

  const clearFilter = () => {
    onSubmit([]);
    setFilter([]);
    setSelectionRange({ startDate: undefined, endDate: undefined, key: "selection" });
  };

  const closeModal = () => {
    setOpen(false);
    setFilter([]);
    setSelectionRange({ startDate: undefined, endDate: undefined, key: "selection" });
  };

  const handleSubmit = () => {
    onSubmit(filter);
    closeModal();
  };

  useEffect(() => {
    if (!selectionRange.startDate || !selectionRange.endDate) {
      removeFilter("startDate");
      removeFilter("endDate");
      return;
    }

    handleFilter("startDate", selectionRange.startDate.toString());
    handleFilter("endDate", selectionRange.endDate.toString());
  }, [selectionRange]);

  return {
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
  };
}

export interface SwitchFilterI {
  id: number;
  name: string;
  value: string;
  onClick: () => void;
}

export interface FilterProps {
  rangeType: string;
  value: string;
}

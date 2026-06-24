"use client";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { FilterCriteria, GameFilterProps } from "@/interfaces/filters";

export default function useFilter({ events, handleFilter }: GameFilterProps) {
  const modalFilterGameRef = useRef<any>();
  const [typeEvent, setTypeEvent] = useState<string>("");
  const [optionsTypes, setOptionsTypes] = useState<string[]>([]);
  const [numberFilters, setNumberFilters] = useState<number>(0);

  const extractFilterTypes = () => {
    setOptionsTypes(_.uniq(_.map(events, (event) => event.__t)));
  };

  const handleSelectType = (type: string) => {
    setNumberFilters(0);
    if (type === typeEvent) {
      setTypeEvent("");
      handleFilter({});
      return;
    }
    setTypeEvent(type);
    handleFilter({ __t: type } as FilterCriteria);
  };

  const typeSelected = (type: string) => {
    return type === typeEvent;
  };

  const handleOpenFilter = () => {
    modalFilterGameRef?.current.openModal();
  };

  const handleFilterModal = (criteria: FilterCriteria) => {
    if (criteria.__t) {
      setTypeEvent(criteria.__t);
    } else {
      setTypeEvent("");
    }
    const numberFilters = Object.values(criteria).filter(
      (value) => value !== "" && value != undefined && value != "all",
    ).length;
    setNumberFilters(numberFilters);
    handleFilter(criteria);
  };

  useEffect(() => {
    extractFilterTypes();
  }, [events]);

  return {
    optionsTypes,
    handleSelectType,
    typeSelected,
    handleOpenFilter,
    modalFilterGameRef,
    handleFilterModal,
    numberFilters,
  };
}

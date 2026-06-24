import { Button } from "@/components/common/button";

import useFilter from "./useFilter";
import { GroupFilter } from "./styles";

import getImageSport from "@/utils/sports-icons";
import ModalFilterGame from "@/components/modal/filter/filterGame";
import { GameFilterProps } from "@/interfaces/filters";
import { IoFilter } from "react-icons/io5";

export default function GameFilter({ events, handleFilter }: GameFilterProps) {
  const {
    optionsTypes,
    handleSelectType,
    typeSelected,
    modalFilterGameRef,
    handleOpenFilter,
    handleFilterModal,
    numberFilters,
  } = useFilter({ events, handleFilter });
  return (
    <GroupFilter>
      <Button.Root
        orientation="h"
        bg="background.dynamic.whiteDynamic.8"
        onClick={handleOpenFilter}
        borderRadius={8}
        gaph={8}
      >
        <Button.Icon icon={IoFilter} size={16} color="brand.secondary.100" />
        <Button.Text htmlTag="h2" font="label/button/m/bold" color="brand.secondary.100">
          Filtros {numberFilters ? `(${numberFilters})` : ""}
        </Button.Text>
      </Button.Root>
      {optionsTypes &&
        optionsTypes.map((item, id) => (
          <Button.Root
            key={id}
            orientation="h"
            bg={typeSelected(item) ? "brand.secondary.24" : "background.dynamic.whiteDynamic.8"}
            onClick={() => handleSelectType(item)}
            borderRadius={8}
            gaph={8}
          >
            <Button.Icon
              icon={getImageSport(item)}
              size={16}
              color={typeSelected(item) ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
            />
            <Button.Text
              htmlTag="h2"
              font="label/button/m/bold"
              color={typeSelected(item) ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
            >
              {item}
            </Button.Text>
          </Button.Root>
        ))}
      <ModalFilterGame ref={modalFilterGameRef} events={events} handleFilter={handleFilterModal} />
    </GroupFilter>
  );
}

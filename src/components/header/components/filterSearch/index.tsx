import React, { useState } from "react";
import { Container, Overlay, Search } from "./styles";
import FilterSummary from "./components/summary";
import FilterExpanded from "./components/expanded";
import { useWindow } from "@/hooks/window";
import Icon from "@/utils/icon";

export default function FilterSearch({ isFocused, setIsFocused }: FilterSearchProps) {
  const [search, setSearch] = useState("");
  const { isMobile } = useWindow();

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Container isFull={isFocused || !isMobile}>
      <Search isMobile={isMobile} onClick={() => setIsFocused(true)}>
        <Icon name="search" color="text.dynamic.whiteDynamic.64" size={20}  />
        {(!isMobile || isFocused) && (
          <input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            // onBlur={handleBlur}
            placeholder="Pesquisar"
            autoFocus={isFocused}
            onFocus={() => setIsFocused(true)}
          />
        )}
      </Search>

      {isFocused &&
        (!search ? (
          <FilterSummary handleSearch={setSearch} />
        ) : (
          <FilterExpanded valueSearch={search} onClose={handleBlur} />
        ))}

      <Overlay viewitem={isFocused} onClick={() => setIsFocused(false)} />
    </Container>
  );
}

interface FilterSearchProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, GroupInput, Item, Overlay, SelectDrop, SelectOption } from "./styles";
import Icon from "@/utils/icon";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, disabled, defaultValue, value }) => {
  const defaultOption = {
    label: options.filter((option) => option.value === defaultValue)[0]?.label || "",
    value: defaultValue || "",
  };

  const [selectedOption, setSelectedOption] = useState<any>(defaultOption);
  const [open, setOpen] = useState(false);

  const handleChange = (option: any) => {
    if (selectedOption.value === option.value) {
      clearSelected();
    } else {
      setSelectedOption(option);
      onChange(option.value);
      setOpen(false);
    }
  };

  const clearSelected = () => {
    setSelectedOption({ label: "", value: "" });
    onChange("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(options.filter((option) => option.value === value)[0]);
    } else {
      setSelectedOption(defaultOption);
    }
  }, [value]);

  return (
    <GroupInput>
      <SelectDrop onClick={handleOpen} disabled={disabled}>
        {!selectedOption.label ? "Selecionar" : selectedOption.label}
        {open ? (
          <Icon name="arrowUpIos" size={20} color="brand.secondary.100" />
        ) : (
          <Icon name="arrowDownIos" size={20} color="brand.secondary.100" />
        )}
      </SelectDrop>
      <Dropdown viewitem={open} defaultValue={defaultValue}>
        <SelectOption>Selecione uma opção</SelectOption>
        {options.map((option, id) => (
          <Item key={`option-${id}`} onClick={() => handleChange(option)}>
            {selectedOption.value === option.value && (
              <Icon name="check" color="brand.secondary.accent.green.100" size={14} />
            )}
            {option.label}
          </Item>
        ))}
      </Dropdown>

      <Overlay viewitem={open} onClick={() => setOpen(false)} />
    </GroupInput>
  );
};

export default Select;

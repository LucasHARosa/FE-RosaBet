import { useTheme } from "styled-components";

export const colorPicker = (colorKey: string): string => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme()
  
  const keys = colorKey.split(".");
  
  let selectedColor = theme as any;

  for (const key of keys) {
    selectedColor = selectedColor[key];

    if (selectedColor === undefined) {
      return "transparent";
    }
  }

  // Retorna o valor encontrado no tema
  return typeof selectedColor === "string" ? selectedColor : "transparent";
};
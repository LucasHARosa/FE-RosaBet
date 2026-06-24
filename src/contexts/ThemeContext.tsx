"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { StorageContext } from "./StorageContext";

type Theme = "light" | "dark";

interface ThemeStorage{
  theme: Theme;
} 

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const { getStorage, setStorage } = useContext(StorageContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const themeSelected = prevTheme === "light" ? "dark" : "light";
      const storageTheme: ThemeStorage = { theme: themeSelected };
      setStorage("theme", JSON.stringify(storageTheme));
      return themeSelected;
    });
  };

   useEffect(() => {
     const storageTheme = getStorage("theme");
     if (storageTheme) {
       setTheme(storageTheme.theme);
     }
   }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

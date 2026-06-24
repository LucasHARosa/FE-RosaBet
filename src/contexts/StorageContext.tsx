"use client";
import { createContext } from "react";

export const StorageContext = createContext({} as StorageContextData);

export const StorageProvider = ({ children }: any) => {
  const setStorage = (key: TypesStorage, value: string) => {
    localStorage.setItem(key, value);
  };

  const getStorage = (key: string) => {
    const storage = localStorage.getItem(key);
    if (!storage) return null;

    return JSON.parse(storage || "");
  };

  const removeStorage = (key: TypesStorage) => {
    localStorage.removeItem(key);
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <StorageContext.Provider
      value={{
        setStorage,
        getStorage,
        removeStorage,
        clearStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export type TypesStorage = "user" | "filters" | "cupons" | "token" | "isOpenSideBar" | "theme";

interface StorageContextData {
  setStorage: (key: TypesStorage, value: string) => void;
  getStorage: (key: TypesStorage) => any;
  removeStorage: (key: TypesStorage) => void;
  clearStorage: () => void;
}

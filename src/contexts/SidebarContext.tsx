"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
interface SidebarContextType {
  openSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
}

const MenuContext = createContext<SidebarContextType>({} as SidebarContextType);

export const SidebarProvider = ({ children }: any) => {
  const [openSideBar, set] = useState(false);

  const setOpenSideBar = (open: boolean) => {
    set(open);
    global?.localStorage?.setItem("isOpenSideBar", open.toString());
  };

  useEffect(() => {
    const a = global?.localStorage?.getItem("isOpenSideBar");
    set(a === "true");
  }, []);

  return (
    <MenuContext.Provider value={{ openSideBar, setOpenSideBar }}>{children}</MenuContext.Provider>
  );
};

export const useMenuBar = () => {
  return useContext(MenuContext);
};

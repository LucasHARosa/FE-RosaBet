"use client";

import { useMenuBar } from "@/contexts/SidebarContext";
import { Button } from "./styles";
import Icon from "@/utils/icon";

export default function ToogleSidebar({ disabled }: ToogleSidebarProps) {
  const { openSideBar, setOpenSideBar } = useMenuBar();

  return (
    <Button onClick={() => setOpenSideBar(!openSideBar)} disabled={disabled}>
      <Icon name="menu" size={20} color={openSideBar ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"} />
    </Button>
  );
}

interface ToogleSidebarProps {
  disabled: boolean;
}

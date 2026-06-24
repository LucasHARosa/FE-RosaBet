"use client";
import SidebarMobile from "./mobile";
import useSidebar from "./useSidebar";
import SidebarWeb from "./web";


export default function SideBar() {
  const {isMobile} = useSidebar();
  return (
    <>
      {isMobile ? <SidebarMobile /> : <SidebarWeb />}
    </>
  );
}

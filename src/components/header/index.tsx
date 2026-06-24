"use client";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import logoIcon from "../../../public/logo.png";
import { Link } from "../common/button";
import ToogleSidebar from "./components/toogleSidebar";
import Loading from "./loading";
import { Container, HeaderBox, Left, LogoText, LogoWrapper, Menu } from "./styles";
import { UserContext } from "@/contexts/UserContext";
import Authenticaded from "./components/authenticaded";
import FilterSearch from "./components/filterSearch";
import { useWindow } from "@/hooks/window";
import { useMenuBar } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";
import NotAuthenticaded from "./components/notAuthenticaded";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const { isAuthenticaded, logout, loading } = useContext(UserContext);
  const { isMobile } = useWindow();
  const currentPath = usePathname();
  const isGameDetail = currentPath.split("/")[1] === "game";
  const { openSideBar } = useMenuBar();

  // const handleConfirmationEmail = () => {
  //   modalRegisterRef?.current.openModal();
  //   modalRegisterRef?.current.disableClose();
  //   modalRegisterRef?.current.step(2);
  // };

  const isViewMenu = useMemo(() => {
    if(isGameDetail) {
      return isMobile;
    } else return true;
  }, [isGameDetail, isMobile]);

  return (
    <HeaderBox isMobile={isMobile}>
      <Container>
        <Menu isMobile={isMobile}>
          {isViewMenu && <ToogleSidebar disabled={loading} />}
          {(!isFocused || !isMobile) && (
            <Link.Root href="/" orientation="h" >
              {(isMobile && !openSideBar) ? (
                <Image src={logoIcon} width={32} height={32} priority alt="logo" />
              ) : (
                <LogoWrapper>
                  <Image src={logoIcon} width={36} height={36} priority alt="logo" />
                  <LogoText>
                    <span className="brand-name">ROSA</span>
                    <span className="brand-sub">BET</span>
                  </LogoText>
                </LogoWrapper>
              )
              }
            </Link.Root>
          )}
        </Menu>
        <Left>
          {(openSideBar || !isMobile) && <FilterSearch isFocused={isFocused} setIsFocused={setIsFocused} />}
          {!(isMobile && openSideBar) && (
            <>
              {(!isFocused || !isMobile) &&
                (loading ? (
                  <Loading />
                ) : isAuthenticaded ? (
                  <Authenticaded logout={logout} />
                ) : (
                  <NotAuthenticaded />
                ))}
            </>
          )}
        </Left>
      </Container>
    </HeaderBox>
  );
}

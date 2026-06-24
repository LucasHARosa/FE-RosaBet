"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  BadgePhoto,
  Container,
  Detail,
  Group,
  GroupCard,
  Left,
  Profile,
  Right,
  Row,
  ThemeGroup,
} from "./settings/styles";
import Text from "@/components/common/text";
import { usePathname, useRouter } from "next/navigation";
import { useWindow } from "@/hooks/window";
import { Button } from "@/components/common/button";
import { useTheme as useCustomTheme } from "@/contexts/ThemeContext";
import { UserContext } from "@/contexts/UserContext";
import { RxExit } from "react-icons/rx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { IoIosArrowBack} from "react-icons/io";

import { useTheme } from "styled-components";
import { Card } from "@/components/card";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [openTab, setOpenTab] = useState<boolean>(false);
  const pathname = usePathname();
  const { isMobile } = useWindow();
  const { theme: themeName, toggleTheme } = useCustomTheme();
  const theme = useTheme()
  const router = useRouter();
  const { getUser, logout, loading } = useContext(UserContext);

  useEffect(() => {
    if (!getUser._id && !loading) router.push("/");
  }, [loading]);

  // useEffect(() => {
  //   const path = pathname.split("/profile/")[1];
  //   setTabActive(path);
  //   setOpenTab(true);
  // }, [pathname]);

  const isOpen = useMemo(() => {
    if (!isMobile) return true;
    return openTab;
  }, [isMobile, openTab]);

  const handleTab = (redirect: string) => {
    //const path = pathname.split("/profile/")[1];
    setOpenTab(true);
    router.push(redirect);
  };

  const tabActiveMemo = useMemo(() => {
    if (!isMobile && pathname === "/profile") {
      router.push("/profile/settings");
    }
    if (pathname !== "/profile" && isMobile) {
      setOpenTab(true);
    } else if (pathname === "/profile" && isMobile) {
      setOpenTab(false);
    }

    if (pathname === "/profile") return "";
    return pathname.split("/profile/")[1];
  }, [pathname, isMobile]);

  const toBack = () => {
    setOpenTab(false);
    router.back();
  };

  return (
    <Container>
      <Left isMobile={isMobile && openTab}>
        <Profile>
          {loading ? (
            <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
              <Detail>
                <Skeleton circle={true} height={40} width={40} />
                <div style={{ width: "100%" }}>
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={15} width="20%" />
                </div>
              </Detail>
            </SkeletonTheme>
          ) : (
            <Detail>
              <Row>
                <BadgePhoto>
                  <Text htmlTag="small" font="heading/s/bold">
                    {getUser.name?.slice(0, 1)}
                  </Text>
                </BadgePhoto>
                <div>
                  <Text htmlTag="small" font="heading/s/bold">
                    {getUser.name}
                  </Text>
                  <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
                    {getUser.cpf}
                  </Text>
                </div>
              </Row>
              <Button.Root onClick={() => logout()}>
                <Button.Icon icon={RxExit} size={20} color="brand.secondary.100" />
              </Button.Root>
            </Detail>
          )}
          
        </Profile>
        <Group>
          <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            CONTA
          </Text>
          <GroupCard>
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "settings"} iconName="user" route="/profile/settings" title="Meus dados" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "bets"} iconName="ticket" route="/my-bets" title="Minhas apostas" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "notifications"} iconName="notifications" route="/profile/notifications" title="Notificações" />


          </GroupCard>
        </Group>
        <Group>
          <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            FINANCEIRO
          </Text>
          <GroupCard>
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "transactions"} iconName="currencyReal" route="/profile/transactions" title="Depósito e Saque" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "income"} iconName="currencyDollar" route="/profile/income" title="Informe de Rendimentos" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "limits"} iconName="menuUnfold" route="/profile/limits" title="Gerenciamento de Limites" />

          </GroupCard>
        </Group>
        <Group>
          <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            TEMA
          </Text>
          <ThemeGroup>
            <Button.Root
              onClick={toggleTheme}
              bg={themeName === "light" ? "background.dynamic.whiteDynamic.8" : ""}
              w="full"
            >
              <Button.Text htmlTag="small" font="label/body/m/regular">
                Claro
              </Button.Text>
            </Button.Root>
            <Button.Root
              onClick={toggleTheme}
              bg={themeName === "dark" ? "background.dynamic.whiteDynamic.8" : ""}
              w="full"
            >
              <Button.Text htmlTag="small" font="label/body/m/regular">
                Escuro
              </Button.Text>
            </Button.Root>
          </ThemeGroup>
        </Group>
        <Group>
          <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            LEGAL
          </Text>
          <GroupCard>
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "terms"} iconName="security" route="/profile/terms" title="Privacidade & Termos" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "break"} iconName="pause" route="/profile/break" title="Período de Pausa" />
            <Card.Route handleTab={handleTab} activeTab={tabActiveMemo === "exclusion"} iconName="deleteLeft" route="/profile/exclusion" title="Exclusão de Conta" />
          </GroupCard>
        </Group>
        <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64" style={{ margin: "auto" }}>
          V 4.4.24 (18235902)
        </Text>
        <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64" style={{ margin: "auto" }}>
          © RosaBet 2024. All rights reserved
        </Text>
      </Left>
      {isOpen && (
        <Right>
          {isMobile && (
            <Button.Root orientation="h" onClick={toBack}>
              <Button.Icon icon={IoIosArrowBack} size={18} />
              <Button.Text htmlTag="h2" font="label/button/m/regular">
                Voltar
              </Button.Text>
            </Button.Root>
          )}
          {children}
        </Right>
      )}
    </Container>
  );
}

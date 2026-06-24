import Text from "@/components/common/text";
import Image from "next/image";
import { MdPix } from "react-icons/md";
import ImgBrazil from "../../../../../public/brazil.svg";
import { BadgePhoto, Balance, BalanceInfo, Box, PixLink, Refresh } from "./styles";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useMemo, useState } from "react";
import { Button, Link } from "@/components/common/button";
import { Badge } from "@mui/material";
import { IoMdNotifications } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { MdSpaceDashboard } from "react-icons/md";
import { useWindow } from "@/hooks/window";
import Icon from "@/utils/icon";

export default function Authenticaded({ logout }: any) {
  const { getUser, refreshUser } = useContext(UserContext);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { isMobile } = useWindow();

  const refreshCash = async () => {
    setIsAnimating(true);
    await refreshUser();
    setIsAnimating(false);
  };

  const isAdmin = useMemo(() =>{
    if(!getUser || !getUser?.type){
      return false;
    }
    if(getUser?.type?.toLowerCase().includes("master")){
      return true;
    }
  }, [getUser]);

  const redirectBackoffice = () => {
    const externalBackofficeUrl = process.env.NEXT_PUBLIC_EXTERNAL_BACKOFFICE_URL;
    return `${externalBackofficeUrl}/#/redirect/${getUser.token}`;
  };

  return (
    <Box>
      <BalanceInfo>
        <Balance isMobile={isMobile}>
          <Image src={ImgBrazil} width={18} height={18} alt="brazil" />
          <Text htmlTag="h1" font="label/body/s/bold">
            R$ {getUser.credits.toFixed(2)}
          </Text>
        </Balance>
        <Refresh disabled={isAnimating} onClick={refreshCash} isMobile={isMobile}>
          <Icon name="refresh" size={20} />
        </Refresh>
        <PixLink href="/profile/transactions" viewitem={!isAdmin ? "true" : "false"}>
          <Text id="desktop" font="label/body/s/bold" htmlTag="h6" color="text.absolute.whiteAbsolute.100">
            DEPOSITAR
          </Text>
          <MdPix id="mobile" size={20} />
        </PixLink>
      </BalanceInfo>
      {!isMobile && (
        <Link.Root bg="background.dynamic.whiteDynamic.8" href="/profile/notifications">
          <Badge color="error" badgeContent={getUser.messagesUnread || 0}>
            <IoMdNotifications size={22} />
          </Badge>
        </Link.Root>
      )}
      {isAdmin ? (
        <>
          <Link.Root
            bg="background.dynamic.whiteDynamic.4"
            href={redirectBackoffice()}
            target="_blank"
            tooltip="Backoffice"
          >
            <MdSpaceDashboard size={22} />
          </Link.Root>
          <Button.Root bg="background.dynamic.whiteDynamic.4" onClick={logout} tooltip="Sair">
            <RxExit size={22} />
          </Button.Root>
        </>
      ) : (
        <BadgePhoto href="/profile">
          <Text htmlTag="small" font="label/body/s/bold">
            {getUser.name.slice(0, 1)}
          </Text>
        </BadgePhoto>
      )}
    </Box>
  );
}

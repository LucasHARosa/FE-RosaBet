import { DefaultMenu, Details, GroupCountry, Info, Menu, SideBarRoot, Submenu, Summary } from "./styles";

import useSidebar from "../useSidebar";
import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import Image from "next/image";
import CountNumber from "../countNumber";

export default function SidebarWeb() {
  const {
    categorySportsMenu,
    openSideBar,
    setOpenSideBar,
    isGameDetail,
    homeMenu,
    specialMenu,
    typeSportMenu,
    myAccountMenu,
    handleMenu,
    championshipMenu,
    openFilter,
    currentPath,
    isMobile,
  } = useSidebar();
  return (
    <SideBarRoot open={openSideBar} notView={isGameDetail} isMobile={isMobile}>
      <Menu>
        {homeMenu.map((menu, id) => (
          <Button.Root
            key={id}
            orientation="h"
            w="full"
            bg={currentPath !== menu.redirect ? "background.dynamic.whiteDynamic.8" : "brand.primary.100"}
            onClick={() => handleMenu(menu.redirect)}
          >
            <Button.Icon
              icon={menu.icon}
              size={24}
              color={currentPath !== menu.redirect ? "text.dynamic.whiteDynamic.40" : "text.absolute.whiteAbsolute.100"}
            />
            <Button.Text 
              htmlTag="h4" 
              font="label/button/m/regular"
              hidden={!openSideBar} 
              color={currentPath !== menu.redirect ? "text.dynamic.whiteDynamic.100" : "text.absolute.whiteAbsolute.100"}
            >
              {menu.title}
            </Button.Text>
          </Button.Root>
        ))}
      </Menu>

      <DefaultMenu>
        {specialMenu.map((menu, id) => (
          <Button.Root
            key={id}
            orientation="h"
            w="full"
            bg={currentPath !== menu.redirect ? "brand.secondary.accent.bgYellow" : "brand.primary.100"}
            onClick={() => handleMenu(menu.redirect)}
          >
            <Button.Icon icon={menu.icon} size={24} color="brand.secondary.accent.textYellow" />
            <Button.Text
              htmlTag="h4"
              color="brand.secondary.accent.textYellow"
              font="label/button/m/regular"
              hidden={!openSideBar}
            >
              {menu.title}
            </Button.Text>
          </Button.Root>
        ))}
      </DefaultMenu>
       
      <Menu>
        {typeSportMenu.map(
          (menu, id) =>
          menu.isView && 
            <Button.Root
              key={id}
              orientation="h"
              w="full"
              bg={currentPath !== decodeURIComponent(menu.redirect) ? "background.dynamic.whiteDynamic.8" : "brand.primary.100"}
              onClick={() => handleMenu(menu.redirect)}
            >
              <Button.Icon
                icon={menu.icon}
                size={24}
                color={currentPath !== decodeURIComponent(menu.redirect) ? "text.dynamic.whiteDynamic.40" : "text.absolute.whiteAbsolute.100"}
              />
              <Button.Text
                htmlTag="h4"
                font="label/button/m/regular"
                hidden={!openSideBar}
                color={currentPath !== decodeURIComponent(menu.redirect) ? "text.dynamic.whiteDynamic.100" : "text.absolute.whiteAbsolute.100"}
              >
                {menu.title}
              </Button.Text>
            </Button.Root>
        )}
      </Menu>
    
      {categorySportsMenu.length > 0 &&  
      <Menu>
        {categorySportsMenu.map((menu, id) => (
          <Button.Root
            key={id}
            orientation="h"
            w="full"
            bg={currentPath !== menu.redirect ? "background.dynamic.whiteDynamic.8" : "brand.primary.100"}
            onClick={() => handleMenu(menu.redirect)}
          >
            <Button.Icon
              icon={menu.icon}
              size={24}
              color={currentPath !== menu.redirect ? "text.dynamic.whiteDynamic.40" : "text.absolute.whiteAbsolute.100"}
            />
            <Button.Text 
              htmlTag="h4"  
              font="label/button/m/regular"
              hidden={!openSideBar}
              color={currentPath !== menu.redirect ? "text.dynamic.whiteDynamic.100" : "text.absolute.whiteAbsolute.100"}
            >
              {menu.title}
            </Button.Text>
          </Button.Root>
        ))}
      </Menu>
      }


      {championshipMenu.length > 0 && 
      <Menu>
        {championshipMenu.map((menu: any, id) => (
          <Details key={id}>
            <Summary onClick={() => setOpenSideBar(true)}>
              <Image
                src={menu.src}
                alt={menu.country}
                width={24}
                height={18}
              />
              <GroupCountry viewitem={openSideBar}>
                <Text htmlTag="h4" font="label/button/m/regular">
                  {menu.country}
                </Text>
                <Info>
                  <CountNumber live={menu.is_live} count={menu.count} />
                </Info>
              </GroupCountry>
            </Summary>
            {openSideBar &&
              menu.championships.map((championship: any, id: any) => (
                <Submenu key={`sub-${id}`} onClick={() => openFilter(championship)}>
                  <GroupCountry viewitem={openSideBar}>
                    <Text htmlTag="small" font="label/body/xs/regular">
                      {championship.championship}
                    </Text>
                    <Info>
                      <CountNumber
                        live={championship.is_live}
                        count={championship.count}
                      />
                    </Info>
                  </GroupCountry>
                </Submenu>
              ))}
          </Details>
        ))}
      </Menu>
      }
      
      <Menu>      
        {myAccountMenu.map(
          (menu, id) => 
          menu.isView && 
            <Button.Root
              orientation="h"
              w="full"
              bg={currentPath.includes(menu.redirect) ?  "brand.primary.100":"background.dynamic.whiteDynamic.8"}
              onClick={() => handleMenu(menu.redirect)}
              key={id}
            >
              <Button.Icon
                icon={menu.icon}
                size={24}
                color={currentPath.includes(menu.redirect) ?  "text.absolute.whiteAbsolute.100": "text.dynamic.whiteDynamic.40" }
              />
              <Button.Text
                htmlTag="h4"
                font="label/button/m/regular"
                hidden={!openSideBar}
                color={!currentPath.includes(menu.redirect)? "text.dynamic.whiteDynamic.100" : "text.absolute.whiteAbsolute.100"}
              >
                {menu.title}
              </Button.Text>
            </Button.Root> 
        )}
          
      </Menu>
    </SideBarRoot>
  )
}
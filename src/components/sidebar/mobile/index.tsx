import { Details, Menu,  Route,  Row, SideBarRoot, Summary, Set, Submenu, GroupCountry} from "./styles";

import useSidebar from "../useSidebar";
//import { Button } from "@/components/common/button";
import CardRoute from "./cardRoute";
import { Button } from "@/components/common/button";
import Image from "next/image";
import Text from "@/components/common/text";
import CountNumber from "../countNumber";

import ImgBrazil from "../../../../public/brazil.svg";
import { FaUser } from "react-icons/fa6";
import Icon from "@/utils/icon";
import { MdPix } from "react-icons/md";


export default function SidebarMobile() {
  const {
    categorySportsMenu,
    openSideBar,
    homeMenu,
    specialMenu,
    typeSportMenu,
    myAccountMenu,
    handleMenu,
    championshipMenu,
    openFilter,
    currentPath,
    getUser,
    isAuthenticaded,
    loading,
    openLogin,
    openTransactions
  } = useSidebar();
  return (
    <SideBarRoot open={openSideBar}>
      {!loading && 
      <Menu>
        {isAuthenticaded ? (
          <Row>
            <Button.Root p={10} onClick={openTransactions} borderRadius={8} border orientation="h"  w="full" justifycontent="center" >
              <Image src={ImgBrazil} width={18} height={18} alt="brazil" />
              <Button.Text htmlTag="h1" font="label/body/m/bold">
                R$ {getUser.credits.toFixed(2)}
              </Button.Text>
            </Button.Root>
            <Button.Root p={10} onClick={openTransactions} borderRadius={8} orientation="h" bg="brand.primary.100" w="full" justifycontent="center">
              <Button.Icon icon={MdPix} size={24} color="text.absolute.whiteAbsolute.100" />
              <Button.Text htmlTag="h1" font="label/body/m/bold" color="text.absolute.whiteAbsolute.100">
                DEPOSITAR
              </Button.Text>
            </Button.Root>
          </Row>
        ):(
          <Button.Root onClick={openLogin} borderRadius={8} orientation="h" bg="brand.primary.100" w="full" justifycontent="center">
            <Button.Icon icon={FaUser} size={24} color="text.absolute.whiteAbsolute.100" />
            <Button.Text htmlTag="h1" font="label/body/m/bold" color="text.absolute.whiteAbsolute.100">
              ENTRAR
            </Button.Text>
          </Button.Root>
        )}
      </Menu>
      }

      <Menu>
        <CardRoute
          router={homeMenu[0]}
          borderType="12"
          br={16}
        />
        <Row>
          <CardRoute
            router={homeMenu[1]}
            borderType="4"
            br={16}
          />
          <CardRoute
            router={homeMenu[2]}
            borderType="3"
            br={16}
          />
        </Row>
      </Menu>

      <Menu>
        {specialMenu.map((menu, id) => (
          <Button.Root
            key={id}
            orientation="h"
            w="full"
            justifycontent="center"
            bg={currentPath !== menu.redirect ? "brand.secondary.accent.bgYellow" : "brand.primary.100"}
            onClick={() => handleMenu(menu.redirect)}
          >
            <Button.Icon icon={menu.icon} size={24} color="brand.secondary.accent.textYellow" />
            <Button.Text
              htmlTag="h4"
              color="brand.secondary.accent.textYellow"
              font="label/button/xs/bold"
              hidden={!openSideBar}
            >
              {menu.title.toUpperCase()}
            </Button.Text>
          </Button.Root>
        ))}
      </Menu>

      <Menu>
        <CardRoute
          router={typeSportMenu[0]}
          borderType="12"
          br={16}
        />
        <Row>
          <CardRoute
            router={typeSportMenu[1]}
            borderType={typeSportMenu[0].isView ? "4" : "14"}
            br={16}
          />
          <CardRoute
            router={typeSportMenu[2]}
            borderType={typeSportMenu[0].isView ? "3" : "23"}
            br={16}
          />
        </Row>
      </Menu>
      
      <Menu>
        {categorySportsMenu.map((category, id) => (
          <CardRoute
            key={id}
            router={category}
            borderType={
              categorySportsMenu.length === 1 ? "1234" :
              id === 0 ? "12" : 
              id === categorySportsMenu.length - 1 ? "34" : 
              "0"
            }
          />
        ))}   
      </Menu>
      
      <Menu>
        {championshipMenu.map((menu:any, id) => (
          <Details key={id}>
            <Summary>
              <Route
                borderType={
                  championshipMenu.length === 1 ? "1234" :
                  id === 0 ? "12" : 
                  id === championshipMenu.length - 1 ? "34" : "0"}
              >
                <Set>
                  <Image
                    src={menu.src}
                    alt={menu.country}
                    width={24}
                    height={18}
                  />
                  <Text htmlTag="h4" font="label/button/m/regular">
                    {menu.country}
                  </Text>
                </Set>
                <Set>
                  <CountNumber select={false} live={menu.is_live} count={menu.count}/>
                  <Icon name="arrowDownIos" size={18} color='text.dynamic.whiteDynamic.40'/>
                </Set>
              </Route>
            </Summary>
            {menu.championships.map((championship: any, id: number) => (
              <Submenu key={id}  onClick={() => openFilter(championship)}>
                <GroupCountry>
                  <Text htmlTag="small" font="label/button/s/regular">
                    {championship.championship}
                  </Text>
                  <Set>
                    <CountNumber select={false} live={championship.is_live} count={championship.count}/>
                    <Icon name="arrowRightIos" size={18} color='text.dynamic.whiteDynamic.40'/>
                  </Set>
                </GroupCountry>
              </Submenu>
            ))}
          </Details>
        ))}
      </Menu>
    

      <Menu>
        {myAccountMenu.map((menu, id) => 
          <CardRoute
            key={id}
            router={menu}
            borderType={
              !getUser._id  ? "1234" :
              id === 0 ? "12" : 
              id === myAccountMenu.length - 1 ? "34" : "0"
            }
          />
        )}
      </Menu>


    </SideBarRoot>
  )
}
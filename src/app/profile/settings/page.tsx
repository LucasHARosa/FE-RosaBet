"use client";
import Text from "@/components/common/text";
import { FaUserCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { useState } from "react";
import { Box, Header, Tab, Tabs } from "./styles";
import PersonalData from "./components/personalData";
import Address from "./components/address";
import BankData from "./components/bankData";

export default function Settings() {
  const [tabActive, setTabActive] = useState(0);

  return (
    <Box>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          Meus Dados
        </Text>
        <Tabs>
          <Tab isSelected={tabActive === 0} onClick={() => setTabActive(0)}>
            <FaUserCircle size={18} />
            <Text htmlTag="small" font="label/button/m/bold" color={tabActive ===0?"brand.secondary.100":"text.dynamic.whiteDynamic.100"}>
              DADOS PESSOAIS
            </Text>
          </Tab>
          <Tab isSelected={tabActive === 1} onClick={() => setTabActive(1)}>
            <MdLocationOn size={18} />
            <Text htmlTag="small" font="label/button/m/bold" color={tabActive ===1?"brand.secondary.100":"text.dynamic.whiteDynamic.100"}>
              ENDEREÇO
            </Text>
          </Tab>
          <Tab isSelected={tabActive === 2} onClick={() => setTabActive(2)}>
            <IoCard size={18} />
            <Text htmlTag="small" font="label/button/m/bold" color={tabActive ===2?"brand.secondary.100":"text.dynamic.whiteDynamic.100"}>
              DADOS BANCÁRIOS
            </Text>
          </Tab>
        </Tabs>
      </Header>
      {tabActive === 0 && <PersonalData />}
      {tabActive === 1 && <Address />}
      {tabActive === 2 && <BankData />}
    </Box>
  );
}

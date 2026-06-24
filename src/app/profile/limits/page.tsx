"use client";
import { Box, Content, Header } from "./styles";
import Text from "@/components/common/text";
import Input from "@/components/common/input";
import useLimits from "./useLimits";

export default function Limits() {
  const { limits, handleInputChange } = useLimits();

  return (
    <Box>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          Limites
        </Text>
      </Header>
      <Content>
        <Input
          name="24h"
          type="number"
          placeholder="EM 24H"
          value={limits._1_day}
          handleValue={(value) => handleInputChange({ ...limits, _1_day: Number(value) })}
        />
        <Input
          name="7days"
          type="number"
          placeholder="EM 7 DIAS"
          value={limits._7_days}
          handleValue={(value) => handleInputChange({ ...limits, _7_days: Number(value) })}
        />
        <Input
          name="30days"
          type="number"
          placeholder="EM 30 DIAS"
          value={limits._30_days}
          handleValue={(value) => handleInputChange({ ...limits, _30_days: Number(value) })}
        />
      </Content>
    </Box>
  );
}

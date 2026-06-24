import { Button } from "../../common/button";
import { Container,  GlowEffect } from "../line/styles";
import useOddButton, { ButtonOddProps } from "../useOddButton";
import Icon from "@/utils/icon";

export default function ButtonOddGrid({ market, game }: ButtonOddProps) {
  const { OddAvailable, handleAddCupon, OddSelected, glowUp, glowDown, glowFixed } = useOddButton({
    market,
    game,
  });

  return (
    <Container>
      <Button.Root
        orientation="v"
        bg={OddSelected ? "brand.secondary.24" : "background.dynamic.whiteDynamic.4"}
        w="full"
        onClick={handleAddCupon}
        p={8}
        h={40}
        justifycontent="center"
      >
        {!OddAvailable ? (
          <Icon name="lock" size={18} color="text.dynamic.whiteDynamic.40" />
        ) : (
          <Button.Text
            htmlTag="h6"
            font="label/body/m/bold"
            color={OddSelected ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
          >
            {market.odd}
          </Button.Text>
        )}
      </Button.Root>
      {OddAvailable && (
        <>
          {glowUp && <GlowEffect type="up" />}
          {glowDown && <GlowEffect type="down" />}
          {glowFixed && <GlowEffect type={glowFixed} fixed />}
        </>
      )}
    </Container>
  );
}

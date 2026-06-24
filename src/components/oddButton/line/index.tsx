import Icon from "@/utils/icon";
import useOddButton, { ButtonOddProps } from "../useOddButton";
import { Container, GlowEffect } from "./styles";
import { Button } from "@/components/common/button";

export default function ButtonOddLine({ market, game, title, id }: ButtonOddProps) {
  const { OddAvailable, handleAddCupon, OddSelected, glowUp, glowDown, glowFixed } = useOddButton({
    market,
    game,
  });

  return (
    <Container id={id}>
      <Button.Root
        bg={OddSelected ? "brand.secondary.24" : "background.dynamic.whiteDynamic.4"}
        w="full"
        onClick={handleAddCupon}
        justifycontent="center"
        p={8}
      >
        <Button.Text
          htmlTag="small"
          font="label/body/s/regular"
          color={OddSelected ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
          style={{ width: "100%", justifyContent: "right" }}
        >
          {title}
        </Button.Text>
        {!OddAvailable ? (
          <Icon name="lock" size={18} color="text.dynamic.whiteDynamic.40" />
        ) : (
          <Button.Text
            htmlTag="h6"
            font="label/body/m/bold"
            color={OddSelected ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
            style={{ width: "100%", justifyContent: "right" }}
          >
            {market.odd}
          </Button.Text>
        )}
        {glowUp && OddAvailable && <GlowEffect type="up" />}
        {glowDown && OddAvailable && <GlowEffect type="down" />}
        {glowFixed && OddAvailable && <GlowEffect type={glowFixed} fixed />}
      </Button.Root>
    </Container>
  );
}

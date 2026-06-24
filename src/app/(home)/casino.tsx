import Text from "@/components/common/text";
import { Box, IconTitle, Line, Title } from "./styles";
import Carousel from "@/components/carousel";
import CardCasino from "@/components/card/casino";
import { filterByType } from "../casino/api";
import { Link } from "@/components/common/button";
import { FaArrowRight } from "react-icons/fa6";
import Icon from "@/utils/icon";


export default async function SectionCasino() {
  const data = await filterByType("HIGHLIGHTS");

  return (
    <Box>
      <Line>
        <Title>
          <IconTitle>
            <Icon name="play" size={24} color="brand.secondary.100" />
          </IconTitle>
          <Text font="heading/s/bold">Cassino</Text>
        </Title>
        <Link.Root orientation="h" w="fit" bg="background.dynamic.whiteDynamic.8" href={`/casino/HIGHLIGHTS`}>
          <Link.Text htmlTag="small" font="label/button/m/bold">
            Ver todos
          </Link.Text>
          <Link.Icon icon={FaArrowRight} size={16} />
        </Link.Root>
      </Line>

      <Carousel infinite autoPlay>
        {data.map((game, id: number) => (
          <CardCasino key={`detail-${id}`} game={game} type="g" />
        ))}
      </Carousel>
    </Box>
  );
}

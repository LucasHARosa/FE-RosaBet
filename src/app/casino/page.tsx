import { Metadata } from "next";
import { getHighlight } from "./api";
import { Box, CardImage, Container, GroupFilter, Hero, Line, Title, ViewAll } from "./styles";
import Carousel from "@/components/carousel";
import Text from "@/components/common/text";
import CardCasino from "@/components/card/casino";
import CarouselBanner from "@/components/carousel/highlights";
import { useSetupImage } from "@/hooks/useSetupImage";
import { mappers } from "@/utils/mapped-casino";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "@/components/common/button";

export const metadata: Metadata = {
  title: "Cassino",
  description: "Apostas esportivas online, cassino e muito mais!",
};

export default async function Casino() {
  const data = await getHighlight();
  const { getAdvertisements } = useSetupImage();

  return (
    <Container>
      <Hero>
        <Text font="heading/m/bold">Cassino</Text>
        <Text font="paragraph/l/regular" color="text.dynamic.whiteDynamic.64">
          Slots, roleta, ao vivo e muito mais — Copa do Mundo 2026
        </Text>
      </Hero>
      <CarouselBanner>
        {getAdvertisements().then((response) =>
          response.map((item) => (
            <CardImage
              key={item._id}
              src={item.img}
              width={"100%"}
              height="auto"
              alt={`image_banner_${item._id}`}
              draggable={false}
            />
          )),
        )}
      </CarouselBanner>

      <GroupFilter>
        {Object.keys(mappers).map((key, id: number) => (
          <ViewAll key={id} href={`/casino/${key}`}>
            {mappers[key]?.icon}
            <Text htmlTag="small" font="label/button/m/bold">
              {mappers[key]?.name}
            </Text>
          </ViewAll>
        ))}
      </GroupFilter>

      {data.map((item, id: number) => (
        <Box key={`home-${id}`}>
          <Line>
            <Title>
              {mappers[item.label.toLowerCase()]?.icon}
              <Text font="heading/s/bold">{mappers[item.label.toLowerCase()]?.name}</Text>
            </Title>

            <Link.Root orientation="h" w="fit" bg="background.dynamic.whiteDynamic.8" href={`/casino/${item.label.toLowerCase()}`}>
              <Link.Text htmlTag="small" font="label/button/m/bold">
                Ver Todos
              </Link.Text>
              <Link.Icon icon={FaArrowRight} size={16} />
            </Link.Root>
          </Line>

          <Carousel infinite autoPlay>
            {item.data.map((game, id: number) => (
              <CardCasino key={`detail-${id}`} game={game} type="p" />
            ))}
          </Carousel>
        </Box>
      ))}
    </Container>
  );
}

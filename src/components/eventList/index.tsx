import React from "react";
import { Link } from "../common/button";
import Text from "../common/text";
import Events from "./components/events";
import GameFilter from "./components/filter";
import { BoxHeader, CardTitle, Container, Detail, Group, IconButton, IconTitle, Title } from "./styles";
import UseEventList, { EventListProps } from "./useEventList";
import { FaArrowRight} from "react-icons/fa6";
import Icon from "../../utils/icon";

export default function EventList({
  href,
  text,
  games,
  viewButtonMore = false,
  limit = 0,
  filter = false,
  view,
  isViewTemplate = true,
  loading = false,
  refNumPagScroll,
  marginBottom,
  loadingElem: LoadingElement,
}: EventListProps) {
  const { users, setModeView, modeView, handleFilter, ref, numberEvents } = UseEventList({
    text,
    games,
    view,
    loadingElem: LoadingElement,
    refNumPagScroll,
  });

  return (
    <>
      <Container marginBottom={marginBottom}>
        <BoxHeader>
          <Detail>
            <Title>
              <IconTitle>
                <Icon name="play" size={24} color="brand.secondary.100" />
              </IconTitle>
              <Text font="heading/s/bold">
                {text}
              </Text>
            </Title>
            {numberEvents > 0 && 
              <CardTitle>
                {numberEvents}
              </CardTitle>
            }
          </Detail>
          <Detail>
            <Group viewitem={isViewTemplate}>
              <IconButton onClick={() => setModeView("column")}>
                {modeView === "column" ? (
                  <Icon name="line" size={23} color="brand.secondary.100" />
                ) : (
                  <Icon name="lineLight" size={23} color="text.dynamic.whiteDynamic.40" />
                )}
              </IconButton>
              <IconButton onClick={() => setModeView("grid")}>
                {modeView === "grid" ? (
                  <Icon name="grid" size={19} color="brand.secondary.100" />
                ) : (
                  <Icon name="gridOutline" size={19} color="text.dynamic.whiteDynamic.40" />
                )}
              </IconButton>
            </Group>
            {href && (
              <Link.Root orientation="h" w="fit" bg="background.dynamic.whiteDynamic.8" href={href}>
                <Link.Text htmlTag="small" font="label/button/m/bold">
                  Ver todos
                </Link.Text>
                <Link.Icon icon={FaArrowRight} size={16} />
              </Link.Root>
            )}
          </Detail>
        </BoxHeader>
        {filter && 
          <GameFilter events={games} handleFilter={handleFilter} />
        }
        {loading ? (
          LoadingElement
        ) : (
          <Events games={users} limit={limit} viewButtonMore={viewButtonMore} modeView={modeView} />
        )}
      </Container>

      <div ref={ref} />
    </>
  );
}

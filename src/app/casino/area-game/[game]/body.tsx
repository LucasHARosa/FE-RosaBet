/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { gameUrl } from "@/service/casino";
import React, { useEffect, useState } from "react";
import { Container, Detail, Header, Iframe, InfoLeft, LoadingFrame, Recommended } from "./styles";
import { InfoGame } from "@/interfaces/casino";
import MessageError from "@/components/messageError";
import { Button } from "@/components/common/button";
import { IoIosArrowBack } from "react-icons/io";
import Text from "@/components/common/text";
import { BiSupport } from "react-icons/bi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { CasinoI } from "@/interfaces/casino";
import Carousel from "@/components/carousel";
import CardCasino from "@/components/card/casino";
import { useTheme } from "styled-components";

export default function BodyCasinoArea({ data, title }: BodyCasinoAreaProps) {
  const theme = useTheme();
  const [detailGame, setDetailGame] = useState<InfoGame>({} as InfoGame);
  const [codeError, setCodeError] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [errorIntern, setErrorIntern] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await gameUrl(title);
        if (response.error) {
          setErrorIntern(true);
          throw response.error;
        }
        setDetailGame(response);
      } catch (err: any) {
        console.error(err);
        setCodeError(err.status);
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  const onBack = () => {
    router.back();
  }

  return (
    <Container>
      <MessageError code={codeError} />
      <Header>
        <InfoLeft>
          <Button.Root onClick={onBack} bg="background.dynamic.whiteDynamic.8" justifycontent="center">
            <Button.Icon icon={IoIosArrowBack} size={18} />
          </Button.Root>
          {loading ? (
            <Detail>
              <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
                <Skeleton width={80} height={16} />
                <Skeleton width={120} height={16} />
              </SkeletonTheme>
            </Detail>
          ) : (
            detailGame.type && (
              <Detail>
                <Text font="label/button/m/regular" color="text.dynamic.whiteDynamic.64">
                  {detailGame.type}
                </Text>
                <Text font="label/button/m/bold">{detailGame.name}</Text>
              </Detail>
            )
          )}
        </InfoLeft>
        <Button.Root bg="background.dynamic.whiteDynamic.8" justifycontent="center">
          <Button.Icon icon={BiSupport} size={18} />
        </Button.Root>
      </Header>
      {loading || errorIntern ? (
        <LoadingFrame>
          {/* {!errorIntern && (
            <div style={{ width: '160px'}}>
              <Player src={animation} loop autoplay />
            </div>
          )} */}
          <Text font="heading/s/bold">
            {errorIntern
              ? "Não foi possível conectar à provedora no momento. Por favor, informe este erro."
              : "Aguarde, estamos iniciando o jogo..."}
          </Text>
          {errorIntern && (
            <Button.Root
              onClick={() => router.refresh()}
              bg="background.dynamic.whiteDynamic.8"
              justifycontent="center"
              orientation="h"
            >
              <Button.Icon icon={BiSupport} size={18} />
              <Button.Text font="heading/s/bold">Reportar</Button.Text>
            </Button.Root>
          )}
        </LoadingFrame>
      ) : (
        <Iframe src={detailGame.gameURL} width="100%" height="100%" />
      )}
      <Recommended>
        <Text font="heading/s/bold">Recomendados</Text>
        <Carousel infinite autoPlay>
          {data.map((game, id: number) => (
            <CardCasino key={`detail-${id}`} game={game} type="p" />
          ))}
        </Carousel>
      </Recommended>
    </Container>
  );
}

interface BodyCasinoAreaProps {
  data: CasinoI[];
  title: string;
}

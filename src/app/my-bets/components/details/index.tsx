import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import ModalConfirm from "@/components/modal/confirm";
import { Bet, BetSettings } from "@/interfaces/bet";
import { dateConverter } from "@/utils/data-converter";
import { BiSupport } from "react-icons/bi";

import { IoIosClose } from "react-icons/io";
import {
  Anchor,
  Badge,
  GroupButton,
  GroupButtons,
  GroupInfo,
  InfoSection,
  InfoTop,
  Return,
  ReturnValue,
  Section,
} from "../../styles";
import CardGame from "../cardGame";
import Loading from "../loading";
import useDetails from "./useDetails";
import Icon from "@/utils/icon";

export default function DetailsBet(props: DetailsBetProps) {
  const { details, setIsViewDetail, cashoutBet, loading, betSettings } = props;
  const { openModalConfirm, infoBet, filteredSports, tabActive, setTabActive, refModalConfirm, t } =
    useDetails(details, betSettings);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Section>
          <InfoSection>
            <InfoTop>
              <Text htmlTag="small" font="paragraph/m/regular" color="text.dynamic.whiteDynamic.64">
                Minhas Apostas/Cupons
              </Text>
              <Text htmlTag="h3" font="heading/m/bold">
                #{details.code}
              </Text>
            </InfoTop>
            <GroupButtons>
              <Button.Root orientation="h" bg="background.dynamic.whiteDynamic.8">
                <Button.Icon icon={BiSupport} size={19} />
              </Button.Root>
              <Button.Root onClick={() => setIsViewDetail(false)}>
                <Button.Icon icon={IoIosClose} size={28} />
              </Button.Root>
              {details.cashoutable && (
                <Button.Root orientation="h" bg="background.dynamic.whiteDynamic.8" onClick={openModalConfirm}>
                  <Button.Text htmlTag="small" font="label/button/m/bold" color="brand.secondary.accent.textYellow">
                    Concluir Aposta
                  </Button.Text>
                  <Icon name="flagCheckered" size={16} color="brand.secondary.accent.textYellow" />
                </Button.Root>
              )}
            </GroupButtons>
          </InfoSection>
          <Return>
            {details.cashoutable && (
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                Retorno ({(((details.cashout_value || 0) / details.return_value) * 100).toFixed(2)}
                %)
              </Text>
            )}
            <Text color={infoBet.color} font="heading/m/bold">
              R$ {details.cashout_value || details.return_value.toFixed(2)}
            </Text>
            {details.cashoutable && (
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                Ganho máximo <ReturnValue>R$ {details.return_value.toFixed(2)}</ReturnValue>
              </Text>
            )}
            <Text htmlTag="small" font="label/body/xs/regular" color={infoBet.color}>
              {infoBet.message}
            </Text>
          </Return>
          <GroupInfo>
            <Return>
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                Investido
              </Text>
              <Text htmlTag="h2" font="label/button/m/bold">
                R$ {details.value.toFixed(2)}
              </Text>
            </Return>
            <Return>
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                Criado
              </Text>
              <Text htmlTag="h2" font="label/button/m/bold">
                {dateConverter(details.date)}
              </Text>
            </Return>
            <Return>
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                Status
              </Text>
              <Text htmlTag="h2" font="label/button/m/bold" color={infoBet.color}>
                {t(details.status)}
              </Text>
            </Return>
          </GroupInfo>

          <GroupButton>
            <Anchor onClick={() => setTabActive("now")} selected={tabActive === "now"}>
              Agora <Badge>{filteredSports.now.length}</Badge>
            </Anchor>
            <Anchor onClick={() => setTabActive("shortly")} selected={tabActive === "shortly"}>
              Em breve <Badge>{filteredSports.shortly.length}</Badge>
            </Anchor>
            <Anchor onClick={() => setTabActive("finalized")} selected={tabActive === "finalized"}>
              Finalizados <Badge>{filteredSports.finalized.length}</Badge>
            </Anchor>
          </GroupButton>

          {tabActive === "now" &&
            filteredSports.now.map((sport, index) => (
              <CardGame key={index} sport={sport} betSettings={betSettings} />
            ))}

          {tabActive === "shortly" &&
            filteredSports.shortly.map((sport, index) => (
              <CardGame key={index} sport={sport} betSettings={betSettings} />
            ))}

          {tabActive === "finalized" &&
            filteredSports.finalized.map((sport, index) => (
              <CardGame key={index} sport={sport} betSettings={betSettings} />
            ))}

          <ModalConfirm
            ref={refModalConfirm}
            title="Concluir aposta"
            message="Deseja realmente encerrar sua aposta?"
            onSubmit={() => cashoutBet(details._id, details.cashout_value || 0)}
          />
        </Section>
      )}
    </>
  );
}

interface DetailsBetProps {
  loading: boolean;
  details: Bet;
  setIsViewDetail: (value: boolean) => void;
  cashoutBet: (id: string, cashout_value: number) => void;
  betSettings: (status: string) => BetSettings;
}

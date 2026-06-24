import Text from "@/components/common/text";
import { Bet, BetSettings, MyBetsAll } from "@/interfaces/bet";
import CardBet from "../cardBet";
import { GroupCard } from "../../styles";

export default function SectionBet({
  title,
  loading,
  bets,
  viewDetails,
  betDetails,
  betSettings,
  isMobile,
}: SectionBetProps) {
  return (
    <>
      <Text htmlTag="h6" font="label/button/l/bold">
        {title}
      </Text>
      {loading ? (
        <p>Carregando...</p>
      ) : bets && bets.length > 0 ? (
        <GroupCard isMobile={isMobile}>
          {bets.map((bet) => (
            <CardBet
              key={bet._id}
              bet={bet}
              viewDetails={viewDetails}
              isSelected={betDetails._id === bet._id}
              betSettings={betSettings}
            />
          ))}
        </GroupCard>
      ) : (
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.64">
          Sem resultados para exibir
        </Text>
      )}
    </>
  );
}

interface SectionBetProps {
  title: string;
  loading: boolean;
  bets: MyBetsAll[];
  viewDetails: (id: string) => void;
  betDetails: Bet;
  betSettings: (status: string) => BetSettings;
  isMobile: boolean;
}

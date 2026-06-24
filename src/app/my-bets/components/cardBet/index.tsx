import Text from "@/components/common/text";
import { BetSettings, MyBetsAll } from "@/interfaces/bet";
import { Card, CardLeft, LineInfo } from "../../styles";
import { useMemo } from "react";
import { Avatar, AvatarGroup } from "@mui/material";

export default function CardBet({ bet, viewDetails, isSelected, betSettings }: CardBetProps) {
  const betInfo = useMemo(() => {
    return betSettings(bet.status);
  }, [bet.status]);

  return (
    <Card onClick={() => viewDetails(bet._id)} isSelected={isSelected}>
      <CardLeft>
        <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.40">
          #{bet.code}
        </Text>
        <LineInfo>
          <Text htmlTag="small" font="label/body/xs/regular"  bg="background.dynamic.whiteDynamic.4">
            {bet.extracted_quotation}x
          </Text>
          <Text htmlTag="small" font="label/body/xs/regular" color={betInfo.color} bg={betInfo.bg}>
            R$ {bet.return_value.toFixed(2)}
          </Text>
        </LineInfo>
      </CardLeft>
      <AvatarGroup total={bet.sports.length}>
        {bet.sports.slice(0, 2).map((item, id) => (
          <AvatarGroup key={`avatar-${id}`}>
            <Avatar
              src={item.sport?.home_coats_of_arms_link || "https://i.imgur.com/It3GqUm.png"}
              alt="user"
            />
            <Avatar
              src={item.sport?.out_coats_of_arms_link || "https://i.imgur.com/Qb68lzP.png"}
              alt="user"
            />
          </AvatarGroup>
        ))}
      </AvatarGroup>
    </Card>
  );
}

interface CardBetProps {
  bet: MyBetsAll;
  viewDetails: (id: string) => void;
  isSelected: boolean;
  betSettings: (status: string) => BetSettings;
}

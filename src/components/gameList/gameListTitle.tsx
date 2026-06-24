import { Link } from "../common/button";
import Text from "../common/text";
import { BoxHeader } from "./styles";

interface GameListTitleProps {
  text: string;
  href: string;
}

export default function GameListTitle({ text, href }: GameListTitleProps) {
  return (
    <BoxHeader>
      <Text>{text}</Text>
      <Link.Root orientation="v" w="fit" bg="background.dynamic.blackDynamic.100" href={href}>
        <Link.Text htmlTag="small" font="label/body/m/regular">
          Ver todos
        </Link.Text>
      </Link.Root>
    </BoxHeader>
  );
}

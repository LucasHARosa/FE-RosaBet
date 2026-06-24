import Text from "@/components/common/text";
import { Card, Row } from "./styles";
import Icon from "@/utils/icon";
export default function CardRoute({ handleTab, activeTab, iconName, route, title }: CardRouteProps) {
  return(
    <Card onClick={() => handleTab(route)}>
      <Row>
        <Icon name={iconName} size={16} color={activeTab?"brand.secondary.100":"text.dynamic.whiteDynamic.40"} />
        <Text htmlTag="small" font="label/button/m/bold" color={activeTab?"brand.secondary.100":"text.dynamic.whiteDynamic.100"}>
          {title}
        </Text>
      </Row>
      <Icon name="arrowRightIos" size={16} color={activeTab?"brand.secondary.100":"text.dynamic.whiteDynamic.40"} />  
    </Card>
  )
}

interface CardRouteProps {
  handleTab: (tab: string) => void;
  activeTab: boolean;
  iconName: string;
  route: string;
  title:string
}
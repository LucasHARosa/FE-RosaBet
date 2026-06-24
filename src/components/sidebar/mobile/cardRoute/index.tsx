import {Set, Card} from './styles';
import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import useSidebar from '@/components/sidebar/useSidebar';
import { RouterProps } from '@/interfaces/sideBar';
import CountNumber from '../../countNumber';
import Icon from '@/utils/icon';

export default function CardRoute({router, borderType="1234", br=8}: CardRouteProps) {
  const {currentPath, handleMenu} = useSidebar();
  const select = currentPath === router.redirect;
  const arrow = borderType !== '3' && borderType !== '4' && borderType !== '14' && borderType !== '23';
  const isView = router.isView !== undefined ? router.isView : true;
  const count = router.count !== undefined && router.count > 0 ? router.count : undefined;
  
  return (
    <Card 
      onClick={()=>handleMenu(router.redirect)} 
      borderType={borderType}
      isView={isView}
      borderRadius={br}
      select={select}
    >
      <Set>
        <Button.Icon icon={router.icon} size={24} color={select? "text.absolute.whiteAbsolute.100": 'text.dynamic.whiteDynamic.40'} />
        <Text htmlTag="h4" font="label/button/m/regular" color={select?"text.absolute.whiteAbsolute.100":"text.dynamic.whiteDynamic.100"} >
          {router.title}
        </Text>
      </Set>
      <Set>
        <CountNumber select={select} live={router.is_live} count={count}/>
        {arrow &&
          <Icon name="arrowRightIos" size={18} color={select? "text.absolute.whiteAbsolute.100":'text.dynamic.whiteDynamic.40'}/>
        }
      </Set>

    </Card>
  );
}

interface CardRouteProps {
  router: RouterProps;
  borderType?: string;
  br?: number;
}
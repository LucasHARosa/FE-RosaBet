import Input from "@/components/common/input";
import { Content, InfoPerson, Pix } from "../../styles";
import Text from "@/components/common/text";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function BankData() {
  const { getUser } = useContext(UserContext);

  return (
    <Content>
      <InfoPerson>
        <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64" style={{ display: "block" }}>
          Atenção: A conta informada deve pertencer a esta chave
          <Pix>PIX CPF: {getUser.pix_key}</Pix>
        </Text>
        <Input name="type" placeholder="TIPO" value={getUser.pix_key_type} disabled />
        <Input name="key" placeholder="CHAVE" value={getUser.pix_key} disabled />
        
      </InfoPerson>
    </Content>
  );
}

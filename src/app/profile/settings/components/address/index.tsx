import Input from "@/components/common/input";
import { Content, InfoPerson } from "../../styles";
import { Button } from "@/components/common/button";
import { startTransition, useContext, useState } from "react";
import { addressByCEP } from "@/service/cep";
import notifyPopup from "@/utils/toast";
import { IBGECEPProps } from "@/interfaces/user";
import { updateMe } from "@/service/auth";
import { UserContext } from "@/contexts/UserContext";

export default function Address() {
  const { getUser, refreshUser } = useContext(UserContext);

  const [cep, setCep] = useState(getUser.address?.zipcode || "");
  const [address, setAddress] = useState<IBGECEPProps>({
    zipcode: getUser.address?.zipcode || "",
    state: getUser.address?.state || "",
    city: getUser.address?.city || "",
    street: getUser.address?.street || "",
  } as IBGECEPProps);
  //const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCEP = (value: string) => {
    setAddress((prev) => ({ ...prev, zipcode: value }));
    setCep(value);

    if (cep.length === 8 && value.length === 9) {
      //setIsDisabled(true);
      startTransition(() => {
        addressByCEP(value).then(async (response) => {
          console.log(response);
          if (!!response.erro) {
            setIsError(true);
            notifyPopup("Endereço não encontrado, preencha-o.", "warning");

            const address = {
              zipcode: value,
            };
            setAddress(address);
          } else {
            setIsError(false);

            const address = {
              zipcode: value,
              state: response.uf,
              city: response.localidade,
              street: response.logradouro,
            };

            if (!response.uf || !response.localidade || !response.logradouro) {
              setIsError(true);
            }

            setAddress(address);
            handleUpdate(address);
            //setIsDisabled(false);
          }
        });
      });
    }
  };

  const handleUpdate = async (address: IBGECEPProps) => {
    await updateMe({ address: address });
    refreshUser();
    notifyPopup("Endereço salvo com sucesso!", "success");
  };

  return (
    <Content>
      <InfoPerson>
        <Input name="country" placeholder="PAÍS" value={getUser.address?.country} disabled />
        <Input name="cep" placeholder="CEP" value={cep} handleValue={handleCEP} maskType="CEP" />
        {(address.state || isError) && (
          <>
            <Input
              name="state"
              placeholder="ESTADO"
              value={address.state || ""}
              handleValue={(value) => setAddress((prev) => ({ ...prev, state: value }))}
              disabled={!isError}
            />
            <Input
              name="city"
              placeholder="CIDADE"
              value={address.city || ""}
              handleValue={(value) => setAddress((prev) => ({ ...prev, city: value }))}
              disabled={!isError}
            />
            <Input
              name="road"
              placeholder="RUA"
              value={address.street || ""}
              handleValue={(value) => setAddress((prev) => ({ ...prev, street: value }))}
              disabled={!isError}
            />
          </>
        )}
        {isError && (
          <Button.Root onClick={() => handleUpdate(address)} w="full" bg="background.dynamic.whiteDynamic.8">
            Salvar
          </Button.Root>
        )}
      </InfoPerson>
    </Content>
  );
}
